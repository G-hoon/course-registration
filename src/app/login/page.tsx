'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { login } from '@/lib/api';
import { useAuthStore } from '@/stores/authStore';
import { Input, PasswordInput, Button } from '@/components';
import type { LoginRequest } from '@/types';

export default function LoginPage() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const logout = useAuthStore((s) => s.logout);
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('reason') === 'unauthenticated') {
      logout();
      toast.error('로그인 후 이용해주세요.');
      window.history.replaceState(null, '', '/login');
    }
  }, [logout]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();

  const loginMutation = useMutation({
    mutationFn: (data: LoginRequest) => login(data),
    onSuccess: (res) => {
      setUser(res.accessToken, res.user);
      router.replace('/courses');
    },
    onError: async (err: unknown) => {
      const error = err as { response?: Response };
      if (error.response) {
        const body = await error.response.json();
        setServerError(body.message || '로그인에 실패했습니다.');
      } else {
        setServerError('서버에 연결할 수 없습니다.');
      }
    },
  });

  const onSubmit = (data: LoginRequest) => {
    setServerError('');
    loginMutation.mutate(data);
  };

  return (
      <div className="flex-1 flex flex-col justify-center">
        <h1 className="page-title">로그인</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <Input
            id="email"
            label="이메일"
            required
            type="email"
            placeholder="hong@weolbu.com"
            error={errors.email?.message}
            {...register('email', {
              required: '이메일을 입력해주세요.',
            })}
            onBlur={() => setServerError('')}
          />

          <PasswordInput
            id="password"
            label="비밀번호"
            required
            placeholder="비밀번호를 입력하세요"
            error={errors.password?.message}
            {...register('password', {
              required: '비밀번호를 입력해주세요.',
            })}
            onBlur={() => setServerError('')}
          />

          {serverError && (
            <p className="text-red-500 text-sm" role="alert">{serverError}</p>
          )}

          <Button type="submit" loading={loginMutation.isPending}>
            로그인
          </Button>

          <p className="text-center text-sm text-gray-500">
            계정이 없으신가요?{' '}
            <Link href="/signup" className="text-primary hover:underline">
              회원가입
            </Link>
          </p>
        </form>
      </div>
  );
}
