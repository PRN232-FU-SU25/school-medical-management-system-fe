import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem
} from '../ui/select'; // Adjust path as necessary
import { Label } from '../ui/label';
import { cn } from '@/lib/utils';

type SelectFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
};

export default function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  disabled = false,
  required = false,
  error,
  ...rest
}: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-2.5">
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-red-500"> *</span>}
      </Label>
      <div>
        <Select
          value={value}
          onValueChange={onChange}
          disabled={disabled}
          {...rest}
        >
          <SelectTrigger
            id={id}
            className={'h-10 w-full text-sm font-normal text-gray-800'}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
          >
            <div className={cn(!value ? 'font-light text-gray-300' : '')}>
              <SelectValue placeholder={placeholder} />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className="font-normal">
              {options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {error && (
          <span id={`${id}-error`} className="text-xs font-normal text-red-500">
            {error}
          </span>
        )}
      </div>
    </div>
  );
}
