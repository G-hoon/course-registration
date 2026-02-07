import { useEffect, useRef } from 'react';

interface UseIntersectionObserverOptions {
  onIntersect: () => void;
  enabled?: boolean;
  threshold?: number;
}

export function useIntersectionObserver({
  onIntersect,
  enabled = true,
  threshold = 0.5,
}: UseIntersectionObserverOptions) {
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target || !enabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onIntersect();
        }
      },
      { threshold }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [onIntersect, enabled, threshold]);

  return targetRef;
}
