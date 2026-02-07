import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  suffix?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, suffix, required, ...props }, ref) => {
    return (
      <div>
        <label htmlFor={id} className="text-sm font-medium mb-1">
          {label}
          {required && <span className="text-orange-500"> *</span>}
        </label>
        <div className="relative">
          <input
            id={id}
            ref={ref}
            className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none transition-colors
              ${suffix ? 'pr-10' : ''}
              ${error ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-primary'}`}
            {...props}
          />
          {suffix && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
              {suffix}
            </span>
          )}
        </div>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
