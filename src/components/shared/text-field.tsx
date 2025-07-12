import * as React from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

type TextFieldProps = {
  id: string;
  label: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  type?: string;
  autoFocus?: boolean;
  error?: string;
  icon?: React.ReactNode;
};

export default function TextField({
  id,
  label,
  value,
  onChange,
  disabled = false,
  placeholder = '',
  required = false,
  maxLength,
  minLength,
  type = 'text',
  autoFocus = false,
  error,
  icon,
  ...rest
}: TextFieldProps) {
  const formattedValue =
    type === 'number' && typeof value === 'number'
      ? value.toLocaleString('vi-VN')
      : value;

  return (
    <div className="flex flex-col gap-2.5">
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-red-500"> *</span>}
      </Label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-2.5 flex size-5 items-center">
            {icon}
          </span>
        )}
        <Input
          id={id}
          type={type === 'number' ? 'text' : type}
          value={formattedValue}
          onChange={(e) => {
            const value =
              type === 'number'
                ? e.target.value.replace(/\D/g, '')
                : e.target.value;
            onChange({
              ...e,
              target: {
                ...e.target,
                value: value
              }
            });
          }}
          disabled={disabled}
          placeholder={placeholder}
          required={required}
          maxLength={maxLength}
          minLength={minLength}
          autoFocus={autoFocus}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`h-10 w-full pl-${icon ? '10' : '3'} pr-3 text-sm font-normal text-gray-800 placeholder:font-light placeholder:text-gray-300`}
          {...rest}
        />
        {error && (
          <span id={`${id}-error`} className="text-xs font-normal text-red-500">
            {error}
          </span>
        )}
      </div>
    </div>
  );
}
