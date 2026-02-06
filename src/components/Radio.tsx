import { InputHTMLAttributes, forwardRef } from 'react';

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, ...props }, ref) => {
    return (
      <label className="flex items-center gap-1.5 cursor-pointer">
        <input
          type="radio"
          ref={ref}
          className="accent-primary"
          {...props}
        />
        <span className="text-sm">{label}</span>
      </label>
    );
  }
);

Radio.displayName = 'Radio';

export default Radio;
