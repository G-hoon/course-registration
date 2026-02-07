export default function CourseCardSkeleton() {
  return (
    <div className="flex items-start gap-3 p-4 border border-gray-200 bg-white rounded-lg animate-pulse h-[80px]">
      <div className="w-4 h-4 mt-1 bg-gray-200 rounded" />
      <div className="flex-1">
        <div className="flex justify-between items-start gap-2">
          <div className="h-4 bg-gray-200 rounded w-2/3" />
          <div className="h-4 bg-gray-200 rounded w-16" />
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="h-3 bg-gray-200 rounded w-20" />
          <div className="h-3 bg-gray-200 rounded w-24" />
        </div>
      </div>
    </div>
  );
}
