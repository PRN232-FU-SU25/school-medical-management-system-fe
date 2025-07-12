import * as React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import TextField from '@/components/shared/text-field';
import { Icons } from '@/components/ui/icons';
import { Calendar } from '@/components/ui/calendar';
import { DateRange } from 'react-day-picker';
import __helpers from '@/helpers';

type RangeDate = {
  from: Date | undefined;
  to: Date | undefined;
};

type DatePickerProps = {
  id: string;
  label: string;
  value: RangeDate | undefined;
  onChange: (rangeDate: RangeDate) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  disabledDates?: (date: Date) => boolean;
};

export default function DatePicker({
  id,
  label,
  value,
  onChange,
  placeholder = 'Select date range',
  disabled = false,
  required = false,
  error,
  disabledDates,
  ...rest
}: DatePickerProps) {
  const [selectedRange, setSelectedRange] = React.useState<RangeDate>({
    from: value?.from,
    to: value?.to
  });

  const formattedDateRange =
    selectedRange.from && selectedRange.to
      ? `${__helpers.convertToDate(selectedRange?.from)} - ${__helpers.convertToDate(selectedRange?.to)}`
      : '';

  const handleRangeChange = (range: DateRange | undefined) => {
    if (range) {
      setSelectedRange({
        from: range.from || undefined,
        to: range.to || undefined
      });
      onChange({
        from: range.from || undefined,
        to: range.to || undefined
      });
    } else {
      setSelectedRange({ from: undefined, to: undefined });
      onChange({ from: undefined, to: undefined });
    }
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
              value={formattedDateRange}
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
            mode="range"
            selected={selectedRange}
            onSelect={handleRangeChange}
            disabled={disabledDates}
            {...rest}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
