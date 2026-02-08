import api from './client';
import type { LoginRequest, LoginResponse } from '@/types';

/**
 * 로그인 API
 * @param data - 이메일, 비밀번호
 * @returns accessToken, tokenType, user 정보
 */
export function login(data: LoginRequest) {
  return api.post('users/login', { json: data }).json<LoginResponse>();
}
