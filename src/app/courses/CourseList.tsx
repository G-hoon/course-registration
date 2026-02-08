'use client';

import { useCallback } from 'react';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { getCourses } from '@/lib/api';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import CourseCard from './CourseCard';
const PAGE_SIZE = 10;

interface CourseListProps {
  sort: string;
  selectedIds: Set<number>;
  onToggle: (id: number) => void;
}

export default function CourseList({ sort, selectedIds, onToggle }: CourseListProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery({
      queryKey: ['courses', sort],
      queryFn: ({ pageParam = 0 }) =>
        getCourses({ page: pageParam, size: PAGE_SIZE, sort }),
      getNextPageParam: (lastPage) =>
        lastPage.last ? undefined : lastPage.pageable.pageNumber + 1,
      initialPageParam: 0,
    });

  const courses = data.pages.flatMap((p) => p.content).filter(
    (course, i, arr) => arr.findIndex((c) => c.id === course.id) === i
  );

  const loadMoreRef = useIntersectionObserver({
    onIntersect: useCallback(() => {
      fetchNextPage();
    }, [fetchNextPage]),
    enabled: !!hasNextPage && !isFetchingNextPage,
  });

  return (
    <div className="flex flex-col gap-3 flex-1">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          selected={selectedIds.has(course.id)}
          onToggle={onToggle}
        />
      ))}

      {isFetchingNextPage && (
        <p className="text-center text-sm text-gray-400 py-4">불러오는 중...</p>
      )}

      <div ref={loadMoreRef} className="h-1" />
    </div>
  );
}
