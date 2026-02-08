'use client';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/stores/authStore';

export default function Header() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  return (
    <header className="flex justify-end items-center gap-2 mb-2">
      <span className="text-xs text-gray-500">
        {user.name}{user.role === 'INSTRUCTOR' ? ' 강사님' : '님'}
      </span>
      <button
        onClick={() => {
          useAuthStore.getState().logout();
          toast.success('로그아웃이 성공했습니다.');
          router.push('/login');
        }}
        className="text-xs text-gray-400 hover:text-gray-600"
      >
        로그아웃
      </button>
    </header>
  );
}
