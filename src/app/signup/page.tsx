'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signup } from '@/lib/api';
import { setSignupCredentials } from '@/lib/signupCredentials';
import { validatePassword, validateEmail, validatePhone } from '@/lib/validate';
import { formatPhone } from '@/lib/format';
import { Input, PasswordInput, Button, Radio } from '@/components';
import type { SignupRequest } from '@/types';

export default function SignupPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupRequest>({
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      role: 'STUDENT',
    },
  });

  const signupMutation = useMutation({
    mutationFn: (data: SignupRequest) => signup(data),
    onSuccess: (_, data) => {
      setSignupCredentials(data.email, data.password);
      router.push('/signup/complete');
    },
    onError: async (err: unknown) => {
      const error = err as { response?: Response };
      if (error.response) {
        const body = await error.response.json();
        setServerError(body.message || '회원가입에 실패했습니다.');
      } else {
        setServerError('서버에 연결할 수 없습니다.');
      }
    },
  });

  const phoneField = register('phone', {
    validate: (v) => validatePhone(v) || true,
  });

  const onSubmit = (data: SignupRequest) => {
    setServerError('');
    signupMutation.mutate(data);
  };

  return (
    <div className="flex-1 flex flex-col justify-center">
      <h1 className="page-title">회원 가입</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <Input
          id="name"
          label="이름"
          required
          placeholder="홍길동"
          error={errors.name?.message}
          {...register('name', {
            required: '이름을 입력해주세요.',
          })}
        />

        <Input
          id="email"
          label="이메일"
          required
          type="email"
          placeholder="hong@weolbu.com"
          error={errors.email?.message}
          {...register('email', {
            validate: (v) => validateEmail(v) || true,
          })}
        />

        <Input
          id="phone"
          label="휴대폰 번호"
          required
          type="tel"
          placeholder="010-1234-5678"
          error={errors.phone?.message}
          {...phoneField}
          onChange={(e) => {
            e.target.value = formatPhone(e.target.value);
            phoneField.onChange(e);
          }}
        />

        <PasswordInput
          id="password"
          label="비밀번호"
          required
          placeholder="영문, 숫자 조합 6~10자"
          error={errors.password?.message}
          {...register('password', {
            validate: (v) => validatePassword(v) || true,
          })}
        />

        <div className="w-full">
          <p className="text-sm font-medium mb-2">회원 유형</p>
          <div className="flex gap-6">
            <Radio label="수강생" value="STUDENT" {...register('role')} />
            <Radio label="강사" value="INSTRUCTOR" {...register('role')} />
          </div>
        </div>

        {serverError && (
          <p className="text-red-500 text-sm text-center">{serverError}</p>
        )}

        <Button type="submit" loading={signupMutation.isPending}>
          가입하기
        </Button>

        <p className="text-center text-sm text-gray-500">
          이미 계정이 있으신가요?{' '}
          <Link href="/login" className="text-primary hover:underline">
            로그인
          </Link>
        </p>
      </form>
    </div>
  );
}
