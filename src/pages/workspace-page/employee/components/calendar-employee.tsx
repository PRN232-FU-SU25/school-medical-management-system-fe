import * as React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { DayPicker } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  initialFocusDate?: Date;
  yearLimit?: number;
  limitType?: 'above' | 'below' | 'both';
};

function EmployeeCalendar({
  className,
  classNames,
  showOutsideDays = true,
  initialFocusDate = new Date(),
  yearLimit = 10,
  limitType = 'both',
  ...props
}: CalendarProps) {
  const initialMonth = initialFocusDate.getMonth();
  const initialYear = initialFocusDate.getFullYear();

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 51 }, (_, i) => currentYear - 50 + i);

  const months = Array.from({ length: 12 }, (_, i) =>
    new Intl.DateTimeFormat('vi-VN', { month: 'long' }).format(new Date(0, i))
  );

  const [selectedMonth, setSelectedMonth] = React.useState(initialMonth);
  const [selectedYear, setSelectedYear] = React.useState(initialYear);

  const updateMonthYear = () => {
    props.onMonthChange?.(new Date(selectedYear, selectedMonth));
  };

  React.useEffect(() => {
    updateMonthYear();
  }, [selectedMonth, selectedYear]);

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell:
          'text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2',
        cell: cn(
          'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
            : '[&:has([aria-selected])]:rounded-md'
        ),
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-8 w-8 p-0 font-normal aria-selected:opacity-100'
        ),
        day_range_start: 'day-range-start',
        day_range_end: 'day-range-end',
        day_selected:
          'bg-primary text-white hover:bg-primary hover:text-white focus:bg-primary focus:text-primary-foreground',
        day_today: 'bg-accent text-accent-foreground',
        day_outside:
          'day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeftIcon className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRightIcon className="h-4 w-4" />,
        Caption: () => (
          <div className="flex items-center space-x-2">
            <div className="w-3/5">
              <Select
                onValueChange={(value) =>
                  setSelectedMonth(months.indexOf(value))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder={months[selectedMonth]} />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month, index) => (
                    <SelectItem key={index} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-2/5">
              <Select
                onValueChange={(value) => setSelectedYear(parseInt(value, 10))}
              >
                <SelectTrigger>
                  <SelectValue placeholder={selectedYear.toString()} />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )
      }}
      {...props}
      month={new Date(selectedYear, selectedMonth)}
      onMonthChange={(date) => {
        setSelectedMonth(date.getMonth());
        setSelectedYear(date.getFullYear());
      }}
    />
  );
}
EmployeeCalendar.displayName = 'EmployeeCalendar';

export { EmployeeCalendar };
