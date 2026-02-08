import api from './client';
import type { Course, CreateCourseRequest } from '@/types';

/**
 * 강의 개설 API (강사 전용)
 * @param data - 강의 제목, 강사명, 최대 수강 인원, 가격
 * @returns 생성된 강의 정보
 */
export function createCourse(data: CreateCourseRequest) {
  return api.post('courses', { json: data }).json<Course>();
}
