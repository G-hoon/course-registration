import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types";

interface AuthStore {
  user: User | null;
  token: string | null;
  setUser: (token: string, user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      setUser: (token, user) => {
        // API 문서 가이드에 만료 기한에 대한 내용이 없어, 임의로 7일 동안 유지로 세팅했습니다.
        document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24 * 7}`;
        set({ token, user });
      },

      logout: () => {
        document.cookie = "token=; path=/; max-age=0";
        set({ token: null, user: null });
      },
    }),
    { name: "auth" },
  ),
);
