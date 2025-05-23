import { useState } from 'react';
import { TZDate } from 'react-day-picker';
import { ErrorOption } from 'react-hook-form';
import { useMaskito } from '@maskito/react';
import { CalendarIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Calendar, timeZone } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { formatDate } from '@/lib/date';
import { cn } from '@/lib/utils';

type DateInputProps = {
  onSelect: (date: Date) => void;
  setError: (
    name: 'birthday',
    error: ErrorOption,
    options?: {
      shouldFocus: boolean;
    }
  ) => void;
  clearError: (name: 'birthday') => void;
};

export function DateInput({ onSelect, setError, clearError }: DateInputProps) {
  const tForm = useTranslations('form.birthday');
  const [stringDate, setStringDate] = useState<string>('');
  const [date, setDate] = useState<Date>();
  const maskedInputRef = useMaskito({
    options: {
      mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
    },
  });

  function getParsedDate(day: string, month: string, year: string) {
    const isValidDay = day.length === 2 && parseInt(day) <= 31;
    const isValidMonth = month.length === 2 && parseInt(month) <= 12;
    const isValidYear = year.length === 4 && parseInt(year) >= 1900;

    if (!isValidDay || !isValidMonth || !isValidYear) {
      onSelect(new TZDate('Invalid Date'));
      throw new Error('Invalid Date');
    }

    const parsedDate = new TZDate(`${year}-${month}-${day}`);

    if (parsedDate.toString() === 'Invalid Date') {
      onSelect(new TZDate('Invalid Date'));
      throw new Error('Invalid Date');
    }

    return parsedDate;
  }

  return (
    <Popover>
      <div className="relative">
        <Input
          type="string"
          width="100%"
          placeholder={tForm('placeholder')}
          ref={maskedInputRef}
          value={stringDate}
          onInput={(e) => {
            setStringDate(e.currentTarget.value);
            try {
              const [day, month, year] = e.currentTarget.value.split('/');
              const parsedDate = getParsedDate(day, month, year);

              onSelect(parsedDate);
              setDate(parsedDate);
              clearError('birthday');
            } catch {
              setError(
                'birthday',
                {
                  message: tForm('invalidMessage'),
                },
                {
                  shouldFocus: true,
                }
              );
              setDate(undefined);
            }
          }}
        />
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'absolute top-[50%] right-0 translate-y-[-50%] rounded-l-none bg-transparent font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate) => {
            if (!selectedDate) return;
            setDate(new TZDate(selectedDate, timeZone));
            onSelect(new TZDate(selectedDate, timeZone));
            setStringDate(formatDate(selectedDate));
          }}
          disabled={(date) =>
            date > new TZDate(new Date(), timeZone) ||
            date < new TZDate('1900-01-01', timeZone)
          }
          autoFocus
          endMonth={new TZDate(new Date(), timeZone)}
          defaultMonth={date}
        />
      </PopoverContent>
    </Popover>
  );
}
