import * as React from 'react';
import { Textarea } from '../ui/textarea'; // Adjust path as necessary
import { Label } from '../ui/label';

type TextareaFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  autoFocus?: boolean;
  error?: string;
};

export default function TextareaField({
  id,
  label,
  value,
  onChange,
  placeholder = '',
  disabled = false,
  required = false,
  maxLength,
  minLength,
  autoFocus = false,
  error,
  ...rest
}: TextareaFieldProps) {
  return (
    <div className="flex flex-col gap-2.5">
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-red-500"> *</span>}
      </Label>
      <div>
        <Textarea
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          maxLength={maxLength}
          minLength={minLength}
          autoFocus={autoFocus}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className="h-24 w-full text-sm font-normal text-gray-800 placeholder:font-light placeholder:text-gray-300"
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
