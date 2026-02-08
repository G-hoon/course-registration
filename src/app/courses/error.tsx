'use client';

import { useQueryClient } from '@tanstack/react-query';
import { ErrorFallback } from '@/components';

export default function CoursesError({ reset }: { error: Error; reset: () => void }) {
  const queryClient = useQueryClient();

  const handleRetry = () => {
    queryClient.resetQueries({ queryKey: ['courses'] });
    reset();
  };

  return (
    <div className="flex flex-col h-full">
      <h1 className="page-title">강의 목록</h1>
      <ErrorFallback message="강의 목록을 불러오지 못했습니다." onRetry={handleRetry} />
    </div>
  );
}
