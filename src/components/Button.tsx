import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Loading = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
    </div>
  );
};

export default function Button({ loading, children, disabled, ...props }: ButtonProps) {
  return (
    <button
      disabled={loading || disabled}
      className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-hover disabled:opacity-50 transition-colors"
      {...props}
    >
      {loading ? <Loading /> : children}
    </button>
  );
}
