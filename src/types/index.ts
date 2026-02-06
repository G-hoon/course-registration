export interface User {
  id: number;
  email: string;
  name: string;
  phone: string;
  role: 'STUDENT' | 'INSTRUCTOR';
}

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
  phone: string;
  role: 'STUDENT' | 'INSTRUCTOR';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  tokenType: string;
  user: User;
}

export interface ApiError {
  code: string;
  message: string;
}
