'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

export default function Header() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  return (
    <header className="flex justify-end items-center gap-2 mb-2">
      <span className="text-xs text-gray-500">{user.name}님</span>
      <button
        onClick={() => {
          useAuthStore.getState().logout();
          router.push('/login');
        }}
        className="text-xs text-gray-400 hover:text-gray-600"
      >
        로그아웃
      </button>
    </header>
  );
}
