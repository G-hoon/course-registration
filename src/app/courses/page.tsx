'use client';

import { Suspense, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { useModalStore } from '@/stores/modalStore';
import { Radio, Button, AuthGuard } from '@/components';
import CourseCardSkeleton from './CourseCardSkeleton';
import CourseList from './CourseList';
import EnrollConfirmModal from './EnrollConfirmModal';
import type { InfiniteData } from '@tanstack/react-query';
import type { CourseListResponse } from '@/types';

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
  const showModal = useModalStore((s) => s.showModal);

  const [sort, setSort] = useState<SortType>('recent');
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

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
  };

  const handleEnroll = () => {
    if (selectedIds.size === 0) return;

    const cached = queryClient.getQueryData<InfiniteData<CourseListResponse>>(['courses', sort]);
    const allCourses = cached?.pages.flatMap((p) => p.content) ?? [];
    const selectedCourses = allCourses.filter((c) => selectedIds.has(c.id));

    showModal({
      component: EnrollConfirmModal,
      props: {
        courses: selectedCourses,
        token: token!,
        onSuccess: () => {
          setSelectedIds(new Set());
          queryClient.invalidateQueries({ queryKey: ['courses'] });
        },
      },
    });
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

        {/* 강의 목록 */}
        <Suspense key={sort} fallback={<CourseListSkeleton length={10} />}>
          <CourseList sort={sort} selectedIds={selectedIds} onToggle={toggleSelect} />
        </Suspense>

        {/* 수강 신청 버튼 */}
        {selectedIds.size > 0 && (
          <div className="sticky bottom-0 pt-3 pb-2 bg-[#f5f5f5]">
            <Button onClick={handleEnroll}>
              수강 신청하기 ({selectedIds.size}개)
            </Button>
          </div>
        )}
      </div>
    </AuthGuard>
  );
}
