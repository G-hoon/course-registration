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

export interface Course {
  id: number;
  title: string;
  description?: string;
  instructorName: string;
  maxStudents: number;
  currentStudents: number;
  availableSeats: number;
  isFull: boolean;
  price: number;
  createdAt: string;
}

export interface CourseListResponse {
  content: Course[];
  pageable: {
    pageNumber: number;
    pageSize: number;
  };
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

export interface EnrollmentResult {
  success: {
    enrollmentId: number;
    courseId: number;
    courseTitle: string;
  }[];
  failed: {
    courseId: number;
    reason: string;
  }[];
}

export interface ApiError {
  code: string;
  message: string;
}
