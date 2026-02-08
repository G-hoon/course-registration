'use client';

import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { CircleCheckBig } from 'lucide-react';
import { login } from '@/lib/api';
import { useAuthStore } from '@/stores/authStore';
import {
  getSignupCredentials,
  clearSignupCredentials,
} from '@/lib/signupCredentials';
import { Button } from '@/components';

export default function SignupCompletePage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [credentials] = useState(getSignupCredentials);

  useEffect(() => {
    if (!credentials) {
      router.replace('/signup');
    }
    return () => clearSignupCredentials();
  }, [credentials, router]);

  const loginMutation = useMutation({
    mutationFn: () =>
      login({ email: credentials!.email, password: credentials!.password }),
    onSuccess: (res) => {
      setUser(res.accessToken, res.user);
      router.push('/courses');
    },
  });

  if (!credentials) return null;

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <CircleCheckBig size={64} className="text-primary" strokeWidth={1.5} />

      <h1 className="page-title">회원가입 완료</h1>
      <p className="text-gray-500 text-sm mt-2 text-center">
        가입이 완료되었습니다.
        <br />
        로그인 후 다양한 강의를 확인해보세요.
      </p>

      <div className="flex gap-3 w-full mt-10">
        <Button onClick={() => loginMutation.mutate()} loading={loginMutation.isPending}>
          바로 로그인 하기
        </Button>
        <button
          type="button"
          onClick={() => router.push('/login')}
          className="w-full py-3 rounded-lg font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          로그인 페이지로 가기
        </button>
      </div>
    </div>
  );
}
