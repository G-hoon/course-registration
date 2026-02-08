'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getAuthApi } from '@/lib/api';
import { Button } from '@/components';
import type { ModalComponentProps } from '@/types/modal';
import type { Course, EnrollmentResult } from '@/types';

interface Props {
  courses: Course[];
  token: string;
  onSuccess: () => void;
}

export default function EnrollConfirmModal({
  courses,
  token,
  onSuccess,
  onClose,
}: ModalComponentProps<Props>) {
  const [error, setError] = useState('');
  const [failedResults, setFailedResults] = useState<EnrollmentResult['failed']>([]);

  const enrollMutation = useMutation({
    mutationFn: () => {
      const authApi = getAuthApi(token);
      const courseIds = courses.map((c) => c.id);
      return authApi
        .post('enrollments/batch', { json: { courseIds } })
        .json<EnrollmentResult>();
    },
    onSuccess: (result) => {
      if (result.failed.length > 0) {
        setFailedResults(result.failed);
        if (result.success.length > 0) {
          onSuccess();
        }
        return;
      }
      onClose?.();
      toast.success('수강 신청이 완료되었습니다.');
      onSuccess();
    },
    onError: async (err: unknown) => {
      const e = err as { response?: Response };
      if (e.response) {
        const body = await e.response.json();
        setError(body.message || '수강 신청에 실패했습니다.');
      } else {
        setError('서버에 연결할 수 없습니다.');
      }
    },
  });

  return (
    <div className="bg-white rounded-2xl w-full max-w-[360px] p-6">
      <h2 className="text-lg font-bold mb-4">수강 신청 확인</h2>

      <ul className="flex flex-col gap-2 text-sm max-h-[240px] overflow-y-auto pr-2">
        {courses.map((course) => (
          <li
            key={course.id}
            className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
          >
            <span className="truncate mr-3">{course.title}</span>
            <span className="text-gray-500 whitespace-nowrap">{course.price.toLocaleString()}원</span>
          </li>
        ))}
      </ul>

      <p className="text-xs text-gray-400 text-right mt-2">
        총 {courses.length}개 강의
      </p>

      {error && (
        <p className="text-red-500 text-xs text-center mt-4">{error}</p>
      )}

      {failedResults.length > 0 && (
        <div className="mt-4 text-xs text-red-500 space-y-1">
          {failedResults.map((f) => (
            <p key={f.courseId}>{f.reason}</p>
          ))}
        </div>
      )}

      <div className="flex gap-3 mt-6">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 py-3 rounded-lg font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          취소
        </button>
        <div className="flex-1">
          <Button onClick={() => enrollMutation.mutate()} loading={enrollMutation.isPending}>
            신청하기
          </Button>
        </div>
      </div>
    </div>
  );
}
