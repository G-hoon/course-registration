'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { getAuthApi } from '@/lib/api';
import { Button } from '@/components';
import type { ModalComponentProps } from '@/types/modal';
import type { CreateCourseRequest, Course } from '@/types';

interface Props {
  data: CreateCourseRequest;
  token: string;
}

export default function CreateCourseConfirmModal({
  data,
  token,
  onClose,
}: ModalComponentProps<Props>) {
  const router = useRouter();
  const [error, setError] = useState('');

  const createMutation = useMutation({
    mutationFn: () => {
      const authApi = getAuthApi(token);
      return authApi.post('courses', { json: data }).json<Course>();
    },
    onSuccess: () => {
      toast.success('강의가 성공적으로 개설되었습니다.');
      router.push('/courses');
    },
    onError: async (err: unknown) => {
      const e = err as { response?: Response };
      if (e.response) {
        const body = await e.response.json();
        setError(body.message || '강의 개설에 실패했습니다.');
      } else {
        setError('서버에 연결할 수 없습니다.');
      }
    },
  });

  return (
    <div className="bg-white rounded-2xl w-full max-w-[360px] p-6">
      <h2 className="text-lg font-bold mb-4">강의 개설 확인</h2>

      <div className="flex flex-col gap-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">강의 제목</span>
          <span className="font-medium text-right max-w-[200px] truncate">{data.title}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">강사명</span>
          <span className="font-medium">{data.instructorName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">최대 수강 인원</span>
          <span className="font-medium">{data.maxStudents.toLocaleString()}명</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">가격</span>
          <span className="font-medium">{data.price.toLocaleString()}원</span>
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-xs text-center mt-4">{error}</p>
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
          <Button onClick={() => createMutation.mutate()} loading={createMutation.isPending}>
            개설하기
          </Button>
        </div>
      </div>
    </div>
  );
}
