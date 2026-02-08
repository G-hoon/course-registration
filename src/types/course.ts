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

export interface CreateCourseRequest {
  title: string;
  instructorName: string;
  maxStudents: number;
  price: number;
}
