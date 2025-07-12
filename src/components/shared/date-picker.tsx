import * as React from 'react';
import helper from '@/helpers';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import TextField from '@/components/shared/text-field';
import { Icons } from '@/components/ui/icons';
import { Calendar } from '../ui/calendar';

type DatePickerProps = {
  id: string;
  label: string;
  value: string | undefined;
  onChange: (date: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  yearLimit?: number;
  limitType?: 'above' | 'below' | 'both';
};

export default function DatePicker({
  id,
  label,
  value,
  onChange,
  placeholder = 'Select date',
  disabled = false,
  required = false,
  error,
  yearLimit = 10,
  limitType = 'both',
  ...rest
}: DatePickerProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();
  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString('vi-VN')
    : '';

  React.useEffect(() => {
    setSelectedDate(helper.parseDate(value || '') || undefined);
  }, [value]);

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    date !== undefined && onChange(date.toLocaleDateString('vi-VN'));
  };

  return (
    <div className="flex flex-col gap-2.5">
      <Popover>
        <PopoverTrigger asChild>
          <div>
            <TextField
              id={id}
              label={label}
              type="text"
              value={formattedDate}
              onChange={() => {}}
              disabled={disabled}
              placeholder={placeholder}
              required={required}
              error={error}
              icon={<Icons.calendar className="cursor-pointer" />}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start" sideOffset={4}>
          <Calendar
            mode="single"
            selected={selectedDate}
            initialFocusDate={selectedDate}
            onSelect={handleDateChange}
            disabled={disabled}
            yearLimit={yearLimit}
            limitType={limitType}
            {...rest}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
