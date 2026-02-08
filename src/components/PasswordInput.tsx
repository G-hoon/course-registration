'use client';

import { ChangeEvent, InputHTMLAttributes, KeyboardEvent, forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { convertHangulToQwerty } from 'es-hangul';
import Input from './Input';

interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ onChange, onKeyDown, onBlur, ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    const [capsLock, setCapsLock] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const converted = convertHangulToQwerty(e.target.value);
      if (converted !== e.target.value) {
        e.target.value = converted;
      }
      onChange?.(e);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      setCapsLock(e.getModifierState('CapsLock'));
      onKeyDown?.(e);
    };

    return (
      <div className="relative">
        <Input
          ref={ref}
          type={visible ? 'text' : 'password'}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={(e) => {
            setCapsLock(false);
            onBlur?.(e);
          }}
          suffix={
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setVisible((v) => !v)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              {visible ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          }
          {...props}
        />
        {capsLock && (
          <p className="text-xs text-amber-600 mt-1">Caps Lock이 켜져 있습니다</p>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
