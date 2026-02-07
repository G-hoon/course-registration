'use client';

import { Suspense, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getAuthApi } from '@/lib/api';
import { useAuthStore } from '@/stores/authStore';
import { Radio, Button, AuthGuard } from '@/components';
import CourseCardSkeleton from './CourseCardSkeleton';
import CourseList from './CourseList';
import type { EnrollmentResult } from '@/types';

type SortType = 'recent' | 'popular' | 'rate';

const SORT_OPTIONS: { value: SortType; label: string }[] = [
  { value: 'recent', label: '최근 등록순' },
  { value: 'popular', label: '신청자 많은순' },
  { value: 'rate', label: '신청률 높은순' },
];

function CourseListSkeleton({ length = 10 }: { length?: number }) {
  return (
    <div className="flex flex-col gap-3 flex-1">
      {Array.from({ length }).map((_, i) => (
        <CourseCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default function CoursesPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, token } = useAuthStore();

  const [sort, setSort] = useState<SortType>('recent');
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [enrollResult, setEnrollResult] = useState<EnrollmentResult | null>(null);

  const enrollMutation = useMutation({
    mutationFn: (courseIds: number[]) => {
      const authApi = getAuthApi(token!);
      return authApi
        .post('enrollments/batch', { json: { courseIds } })
        .json<EnrollmentResult>();
    },
    onSuccess: (result) => {
      setEnrollResult(result);
      setSelectedIds(new Set());
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
    onError: (err: unknown) => {
      const error = err as { response?: Response };
      if (error.response?.status === 401) {
        router.push('/login');
      }
    },
  });

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSortChange = (newSort: SortType) => {
    setSort(newSort);
    setSelectedIds(new Set());
    setEnrollResult(null);
  };

  const handleEnroll = () => {
    if (selectedIds.size === 0) return;
    enrollMutation.mutate(Array.from(selectedIds));
  };

  return (
    <AuthGuard>
      <div className="flex flex-col h-full">
        <h1 className="page-title">강의 목록</h1>

        {/* 정렬 */}
        <div className="flex gap-4 mb-4">
          {SORT_OPTIONS.map((opt) => (
            <Radio
              key={opt.value}
              label={opt.label}
              value={opt.value}
              checked={sort === opt.value}
              onChange={() => handleSortChange(opt.value)}
            />
          ))}
        </div>

        {user?.role === 'INSTRUCTOR' && (
          <button
            className="text-center text-sm text-primary hover:bg-primary-hover hover:text-white transition-colors mb-3 h-[60px] w-full bg-white border rounded-lg"
            onClick={() => router.push('/courses/new')}
          >
            <span className="text-lg font-bold">+ 새 강의 개설</span>
          </button>
        )}

        {enrollResult && (
          <div className={`mb-4 p-3 rounded-lg text-center bg-white border text-sm ${enrollResult.success.length > 0 ? 'text-green-600' : 'text-red-500'}`}>
            {enrollResult.success.length > 0 && (
              <p className="text-green-600 mb-1">
                {enrollResult.success.map((s) => s.courseTitle).join(', ')} 신청 완료
              </p>
            )}
            {enrollResult.failed.length > 0 && (
              <div className="text-red-500">
                {enrollResult.failed.map((f) => (
                  <p key={f.courseId}>{f.reason}</p>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 강의 목록 */}
        <Suspense key={sort} fallback={<CourseListSkeleton length={10} />}>
          <CourseList sort={sort} selectedIds={selectedIds} onToggle={toggleSelect} />
        </Suspense>

        {/* 수강 신청 버튼 */}
        {selectedIds.size > 0 && (
          <div className="sticky bottom-0 pt-3 pb-2 bg-[#f5f5f5]">
            <Button onClick={handleEnroll} loading={enrollMutation.isPending}>
              수강 신청하기 ({selectedIds.size}개)
            </Button>
          </div>
        )}
      </div>
    </AuthGuard>
  );
}
