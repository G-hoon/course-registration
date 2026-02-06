import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, ...props }, ref) => {
    return (
      <div>
        <label htmlFor={id} className="text-sm font-medium mb-1">
          {label}
        </label>
        <input
          id={id}
          ref={ref}
          className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none transition-colors
            ${error ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-primary'}`}
          {...props}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
