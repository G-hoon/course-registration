import api from './client';
import type { SignupRequest, SignupResponse } from '@/types';

/**
 * 회원가입 API
 * @param data - 이메일, 비밀번호, 이름, 휴대폰 번호, 역할
 * @returns 생성된 사용자 정보 + 완료 메시지
 */
export function signup(data: SignupRequest) {
  return api.post('users/signup', { json: data }).json<SignupResponse>();
}
