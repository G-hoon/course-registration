import ky from 'ky';

const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export function getAuthApi(token: string) {
  return api.extend({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export default api;
