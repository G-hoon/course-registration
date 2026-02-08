import { TriangleAlert } from 'lucide-react';

interface ErrorFallbackProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorFallback({
  message = '데이터를 불러오지 못했습니다.',
  onRetry,
}: ErrorFallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-3 py-12">
      <TriangleAlert size={64} className="text-gray-300" />
      <p className="text-sm text-gray-500">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-sm text-primary hover:underline"
        >
          다시 시도
        </button>
      )}
    </div>
  );
}
