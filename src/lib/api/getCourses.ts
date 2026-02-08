import api from './client';
import type { CourseListResponse } from '@/types';

type GetCoursesParams = {
  page: number;
  size: number;
  sort: string;
};

/**
 * 강의 목록 조회 API (페이지네이션)
 * @param params - page, size, sort(recent | popular | rate)
 * @returns 페이지 단위 강의 목록
 */
export function getCourses(params: GetCoursesParams) {
  return api
    .get('courses', { searchParams: params })
    .json<CourseListResponse>();
}
