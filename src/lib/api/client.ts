import ky from "ky";
import toast from "react-hot-toast";
import { useAuthStore } from "@/stores/authStore";

function getToken() {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)token=([^;]*)/);
  return match ? match[1] : null;
}

const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api",
  hooks: {
    beforeRequest: [
      (request) => {
        const token = getToken();
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
    afterResponse: [
      (_request, _options, response) => {
        if (response.status === 401 && useAuthStore.getState().token) {
          useAuthStore.getState().logout();
          toast.error("로그인이 만료되었습니다. 다시 로그인해주세요.");
          window.location.href = "/login";
        }
      },
    ],
  },
});

export default api;
