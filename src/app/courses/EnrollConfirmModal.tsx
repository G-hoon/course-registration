'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { CircleCheck, CircleX } from 'lucide-react';
import toast from 'react-hot-toast';
import { enrollBatch } from '@/lib/api';
import { Button } from '@/components';
import type { ModalComponentProps } from '@/types/modal';
import type { Course, EnrollmentResult } from '@/types';

interface Props {
  courses: Course[];
  onSuccess: () => void;
}

export default function EnrollConfirmModal({
  courses,
  onSuccess,
  onClose,
}: ModalComponentProps<Props>) {
  const [error, setError] = useState('');
  const [result, setResult] = useState<EnrollmentResult | null>(null);

  const enrollMutation = useMutation({
    mutationFn: () => enrollBatch(courses.map((c) => c.id)),
    onSuccess: (res) => {
      setResult(res);
      if (res.success.length > 0) {
        onSuccess();
      }
      if (res.failed.length === 0) {
        toast.success('수강 신청이 완료되었습니다.');
      }
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

  const successIds = new Set(result?.success.map((s) => s.courseId));
  const failedMap = new Map(result?.failed.map((f) => [f.courseId, f.reason]));

  return (
    <div className="bg-white rounded-2xl w-full max-w-[360px] p-6">
      <h2 className="text-lg font-bold mb-4">
        {result ? '수강 신청 결과' : '수강 신청 확인'}
      </h2>

      <ul className="flex flex-col gap-2 text-sm max-h-[240px] overflow-y-auto pr-2">
        {courses.map((course) => (
          <li key={course.id} className="py-2 border-b border-gray-100 last:border-0">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 min-w-0">
                {result && (
                  successIds.has(course.id)
                    ? <CircleCheck size={16} className="text-green-500 shrink-0" />
                    : <CircleX size={16} className="text-red-500 shrink-0" />
                )}
                <span className="truncate">{course.title}</span>
              </div>
              <span className="text-gray-500 whitespace-nowrap ml-3">
                {course.price.toLocaleString()}원
              </span>
            </div>
            {failedMap.has(course.id) && (
              <p className="text-xs text-red-500 mt-1 ml-6">{failedMap.get(course.id)}</p>
            )}
          </li>
        ))}
      </ul>

      <p className="text-xs text-gray-400 text-right mt-2">
        총 {courses.length}개 강의
      </p>

      {error && (
        <p className="modal-error" role="alert">{error}</p>
      )}

      {result ? (
        <div className="mt-6">
          <Button onClick={onClose}>닫기</Button>
        </div>
      ) : (
        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 rounded-lg font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            취소
          </button>
          <Button onClick={() => enrollMutation.mutate()} loading={enrollMutation.isPending}>
            신청하기
          </Button>
        </div>
      )}
    </div>
  );
}
