import api from './client';
import type { EnrollmentResult } from '@/types';

/**
 * 일괄 수강 신청 API
 * @param courseIds - 수강 신청할 강의 ID 배열
 * @returns 성공/실패 결과 (부분 성공 가능)
 */
export function enrollBatch(courseIds: number[]) {
  return api
    .post('enrollments/batch', { json: { courseIds } })
    .json<EnrollmentResult>();
}
