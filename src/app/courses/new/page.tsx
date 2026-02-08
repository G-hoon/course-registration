'use client';

import { useForm } from 'react-hook-form';
import { useAuthStore } from '@/stores/authStore';
import { useModalStore } from '@/stores/modalStore';
import { Input, Button, AuthGuard } from '@/components';
import { formatNumber, parseNumber } from '@/lib/format';
import CreateCourseConfirmModal from './CreateCourseConfirmModal';

interface CourseFormValues {
  title: string;
  maxStudents: string;
  price: string;
}

export default function NewCoursePage() {
  const { user, token } = useAuthStore();
  const showModal = useModalStore((s) => s.showModal);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CourseFormValues>({
    mode: 'onTouched',
    defaultValues: {
      title: '',
      maxStudents: '',
      price: '',
    },
  });

  const onSubmit = (data: CourseFormValues) => {
    showModal({
      component: CreateCourseConfirmModal,
      props: {
        data: {
          title: data.title,
          instructorName: user!.name,
          maxStudents: parseNumber(data.maxStudents),
          price: parseNumber(data.price),
        },
        token: token!,
      },
    });
  };

  const maxStudentsField = register('maxStudents', {
    required: '최대 수강 인원을 입력해주세요.',
    validate: (v) => {
      const n = parseNumber(v);
      if (!Number.isInteger(n) || n < 1) return '1명 이상이어야 합니다.';
      if (n > 10000) return '최대 10,000명까지 가능합니다.';
      return true;
    },
  });

  const priceField = register('price', {
    required: '가격을 입력해주세요.',
    validate: (v) => {
      const n = parseNumber(v);
      if (!Number.isInteger(n) || n < 0) return '0원 이상이어야 합니다.';
      if (n > 10000000) return '최대 10,000,000원까지 가능합니다.';
      return true;
    },
  });

  return (
    <AuthGuard>
      <div>
        <h1 className="page-title">강의 개설</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <Input
            id="title"
            label="강의 제목"
            required
            placeholder="강의 제목을 입력하세요"
            error={errors.title?.message}
            {...register('title', {
              required: '강의 제목을 입력해주세요.',
            })}
          />

          <Input
            id="maxStudents"
            label="최대 수강 인원"
            required
            inputMode="numeric"
            placeholder="최대 수강 인원을 입력하세요"
            suffix="명"
            error={errors.maxStudents?.message}
            {...maxStudentsField}
            onChange={(e) => {
              e.target.value = formatNumber(e.target.value);
              maxStudentsField.onChange(e);
            }}
          />

          <Input
            id="price"
            label="가격"
            required
            inputMode="numeric"
            placeholder="가격을 입력하세요"
            suffix="원"
            error={errors.price?.message}
            {...priceField}
            onChange={(e) => {
              e.target.value = formatNumber(e.target.value);
              priceField.onChange(e);
            }}
          />

          <Button type="submit">
            강의 개설하기
          </Button>
        </form>
      </div>
    </AuthGuard>
  );
}
