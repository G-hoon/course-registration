import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export default function Button({ loading, children, disabled, ...props }: ButtonProps) {
  return (
    <button
      disabled={loading || disabled}
      className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-hover disabled:opacity-50 transition-colors"
      {...props}
    >
      {loading ? '처리 중...' : children}
    </button>
  );
}
