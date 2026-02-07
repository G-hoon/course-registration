import { Course } from '@/types';

interface CourseCardProps {
  course: Course;
  selected: boolean;
  onToggle: (id: number) => void;
}

export default function CourseCard({ course, selected, onToggle }: CourseCardProps) {
  const formattedPrice = course.price.toLocaleString();

  return (
    <label
      className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors h-[80px]
        ${selected ? 'border-primary bg-blue-50' : 'border-gray-200 bg-white'}`}
    >
      <input
        type="checkbox"
        checked={selected}
        onChange={() => onToggle(course.id)}
        className="mt-1 accent-primary"
      />
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-semibold text-sm truncate">{course.title}</h3>
          <span className="font-bold text-sm whitespace-nowrap">{formattedPrice}원</span>
        </div>
        <div className="flex justify-between items-center mt-1.5 text-xs text-gray-500">
          <span>강사명: {course.instructorName}</span>
          <span>
            수강인원 {course.currentStudents}/{course.maxStudents}
          </span>
        </div>
      </div>
    </label>
  );
}
