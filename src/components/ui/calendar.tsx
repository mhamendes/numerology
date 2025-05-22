'use client';

import * as React from 'react';
import {
  DayPicker,
  labelNext,
  labelPrevious,
  type PropsBase,
  type PropsSingle,
  TZDate,
  useDayPicker,
} from 'react-day-picker';
import { differenceInCalendarDays } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button, buttonVariants } from '@/components/ui/button';
import { CURRENT_YEAR } from '@/lib/constants';
import { cn } from '@/lib/utils';

const timeZone = 'UTC';

export type CalendarProps = PropsBase &
  PropsSingle & {
    /**
     * In the year view, the number of years to display at once.
     * @default 12
     */
    yearRange?: number;

    /**
     * Wether to show the year switcher in the caption.
     * @default true
     */
    showYearSwitcher?: boolean;
  };

type NavView = 'days' | 'years';

/**
 * A custom calendar component built on top of react-day-picker.
 * @param props The props for the calendar.
 * @default yearRange 12
 * @returns
 */
function Calendar({
  className,
  showOutsideDays = true,
  showYearSwitcher = true,
  yearRange = 12,
  numberOfMonths,
  ...props
}: CalendarProps) {
  const [navView, setNavView] = React.useState<NavView>('days');
  const [displayYears, setDisplayYears] = React.useState<{
    from: number;
    to: number;
  }>(
    React.useMemo(() => {
      return {
        from: CURRENT_YEAR - Math.floor(yearRange / 2 - 1),
        to: CURRENT_YEAR + Math.ceil(yearRange / 2),
      };
    }, [yearRange])
  );

  const { onPrevClick, startMonth, endMonth } = props;

  const columnsDisplayed = navView === 'years' ? 1 : numberOfMonths;

  const buttonNavClassName = buttonVariants({
    variant: 'outline',
    className:
      'absolute h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
  });
  const buttonRangeClassName =
    'bg-accent [&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary [&>button]:hover:text-primary-foreground';

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      style={{
        width: 248.8 * (columnsDisplayed ?? 1) + 'px',
      }}
      classNames={{
        months: 'relative flex',
        month_caption: 'relative mx-10 flex h-7 items-center justify-center',
        weekdays: 'flex flex-row',
        weekday: 'text-muted-foreground w-8 text-sm font-normal',
        month: 'w-full',
        caption: 'relative flex items-center justify-center pt-1',
        caption_label: 'truncate text-sm font-medium',
        button_next: cn(buttonNavClassName, 'right-0'),
        button_previous: cn(buttonNavClassName, 'left-0'),
        nav: 'flex items-start',
        month_grid: 'mx-auto mt-4',
        week: 'mt-2 flex w-max items-start',
        day: 'flex size-8 flex-1 items-center justify-center p-0 text-sm',
        day_button: cn(
          buttonVariants({ variant: 'ghost' }),
          'size-8 rounded-md p-0 font-normal transition-none aria-selected:opacity-100'
        ),
        range_start: cn(buttonRangeClassName, 'day-range-start rounded-s-md'),
        range_middle:
          'bg-accent !text-foreground [&>button]:!text-foreground [&>button]:hover:!text-foreground [&>button]:bg-transparent [&>button]:hover:bg-transparent',
        range_end: cn(buttonRangeClassName, 'day-range-end rounded-e-md'),
        selected:
          '[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary [&>button]:hover:text-primary-foreground',
        today: '[&>button]:bg-accent [&>button]:text-accent-foreground',
        outside:
          'day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground opacity-50 aria-selected:opacity-30',
        disabled: 'text-muted-foreground opacity-50',
        hidden: 'invisible flex-1',
      }}
      components={{
        Chevron: ({ orientation }) => {
          const Icon = orientation === 'left' ? ChevronLeft : ChevronRight;
          return <Icon className="h-4 w-4" />;
        },
        Nav: ({ className }) => (
          <Nav
            className={className}
            displayYears={displayYears}
            navView={navView}
            setDisplayYears={setDisplayYears}
            startMonth={startMonth}
            endMonth={endMonth}
            onPrevClick={onPrevClick}
          />
        ),
        CaptionLabel: (props) => (
          <CaptionLabel
            showYearSwitcher={showYearSwitcher}
            navView={navView}
            setNavView={setNavView}
            displayYears={displayYears}
            {...props}
          />
        ),
        MonthGrid: ({ className, children, ...props }) => (
          <MonthGrid
            className={className}
            displayYears={displayYears}
            startMonth={startMonth}
            endMonth={endMonth}
            navView={navView}
            setNavView={setNavView}
            {...props}
          >
            {children}
          </MonthGrid>
        ),
      }}
      numberOfMonths={columnsDisplayed}
      {...props}
      mode="single"
      timeZone={timeZone}
    />
  );
}
Calendar.displayName = 'Calendar';

function Nav({
  className,
  navView,
  startMonth,
  endMonth,
  displayYears,
  setDisplayYears,
  onPrevClick,
  onNextClick,
}: {
  className?: string;
  navView: NavView;
  startMonth?: Date;
  endMonth?: Date;
  displayYears: { from: number; to: number };
  setDisplayYears: React.Dispatch<
    React.SetStateAction<{ from: number; to: number }>
  >;
  onPrevClick?: (date: Date) => void;
  onNextClick?: (date: Date) => void;
}) {
  const { nextMonth, previousMonth, goToMonth } = useDayPicker();

  const isPreviousDisabled = (() => {
    if (navView === 'years') {
      return (
        (startMonth &&
          differenceInCalendarDays(
            new TZDate(displayYears.from - 1, 0, 1, timeZone),
            startMonth
          ) < 0) ||
        (endMonth &&
          differenceInCalendarDays(
            new TZDate(displayYears.from - 1, 0, 1, timeZone),
            endMonth
          ) > 0)
      );
    }
    return !previousMonth;
  })();

  const isNextDisabled = (() => {
    if (navView === 'years') {
      return (
        (startMonth &&
          differenceInCalendarDays(
            new TZDate(displayYears.to + 1, 0, 1, timeZone),
            startMonth
          ) < 0) ||
        (endMonth &&
          differenceInCalendarDays(
            new TZDate(displayYears.to + 1, 0, 1, timeZone),
            endMonth
          ) > 0)
      );
    }
    return !nextMonth;
  })();

  const handlePreviousClick = React.useCallback(() => {
    if (!previousMonth) return;
    if (navView === 'years') {
      setDisplayYears((prev) => ({
        from: prev.from - (prev.to - prev.from + 1),
        to: prev.to - (prev.to - prev.from + 1),
      }));
      onPrevClick?.(
        new TZDate(
          displayYears.from - (displayYears.to - displayYears.from),
          0,
          1,
          timeZone
        )
      );
      return;
    }
    goToMonth(previousMonth);
    onPrevClick?.(previousMonth);
  }, [
    previousMonth,
    goToMonth,
    onPrevClick,
    displayYears,
    navView,
    setDisplayYears,
  ]);

  const handleNextClick = React.useCallback(() => {
    if (!nextMonth) return;
    if (navView === 'years') {
      setDisplayYears((prev) => ({
        from: prev.from + (prev.to - prev.from + 1),
        to: prev.to + (prev.to - prev.from + 1),
      }));
      onNextClick?.(
        new TZDate(
          displayYears.from + (displayYears.to - displayYears.from),
          0,
          1,
          timeZone
        )
      );
      return;
    }
    goToMonth(nextMonth);
    onNextClick?.(nextMonth);
  }, [
    goToMonth,
    nextMonth,
    onNextClick,
    displayYears,
    navView,
    setDisplayYears,
  ]);
  return (
    <nav className={cn('flex items-center', className)}>
      <Button
        variant="outline"
        className="absolute left-0 h-7 w-7 bg-transparent p-0 opacity-80 hover:opacity-100"
        type="button"
        tabIndex={isPreviousDisabled ? undefined : -1}
        disabled={isPreviousDisabled}
        aria-label={
          navView === 'years'
            ? `Go to the previous ${
                displayYears.to - displayYears.from + 1
              } years`
            : labelPrevious(previousMonth)
        }
        onClick={handlePreviousClick}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        className="absolute right-0 h-7 w-7 bg-transparent p-0 opacity-80 hover:opacity-100"
        type="button"
        tabIndex={isNextDisabled ? undefined : -1}
        disabled={isNextDisabled}
        aria-label={
          navView === 'years'
            ? `Go to the next ${displayYears.to - displayYears.from + 1} years`
            : labelNext(nextMonth)
        }
        onClick={handleNextClick}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  );
}

function CaptionLabel({
  children,
  showYearSwitcher,
  navView,
  setNavView,
  displayYears,
  ...props
}: {
  showYearSwitcher?: boolean;
  navView: NavView;
  setNavView: React.Dispatch<React.SetStateAction<NavView>>;
  displayYears: { from: number; to: number };
} & React.HTMLAttributes<HTMLSpanElement>) {
  if (!showYearSwitcher) return <span {...props}>{children}</span>;
  return (
    <Button
      className="h-7 w-full truncate text-sm font-medium"
      variant="ghost"
      onClick={() => setNavView((prev) => (prev === 'days' ? 'years' : 'days'))}
    >
      {navView === 'days'
        ? children
        : displayYears.from + ' - ' + displayYears.to}
    </Button>
  );
}

function MonthGrid({
  className,
  children,
  displayYears,
  startMonth,
  endMonth,
  navView,
  setNavView,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
  displayYears: { from: number; to: number };
  startMonth?: Date;
  endMonth?: Date;
  navView: NavView;
  setNavView: React.Dispatch<React.SetStateAction<NavView>>;
} & React.TableHTMLAttributes<HTMLTableElement>) {
  if (navView === 'years') {
    return (
      <YearGrid
        displayYears={displayYears}
        startMonth={startMonth}
        endMonth={endMonth}
        setNavView={setNavView}
        navView={navView}
        className={className}
        {...props}
      />
    );
  }
  return (
    <table className={className} {...props}>
      {children}
    </table>
  );
}

function YearGrid({
  className,
  displayYears,
  startMonth,
  endMonth,
  setNavView,
  navView,
  ...props
}: {
  className?: string;
  displayYears: { from: number; to: number };
  startMonth?: Date;
  endMonth?: Date;
  setNavView: React.Dispatch<React.SetStateAction<NavView>>;
  navView: NavView;
} & React.HTMLAttributes<HTMLDivElement>) {
  const { goToMonth, selected } = useDayPicker();

  return (
    <div className={cn('grid grid-cols-4 gap-y-2', className)} {...props}>
      {Array.from(
        { length: displayYears.to - displayYears.from + 1 },
        (_, i) => {
          const isBefore =
            differenceInCalendarDays(
              new TZDate(displayYears.from + i, 11, 31, timeZone),
              startMonth!
            ) < 0;

          const isAfter =
            differenceInCalendarDays(
              new TZDate(displayYears.from + i, 0, 0, timeZone),
              endMonth!
            ) > 0;

          const isDisabled = isBefore || isAfter;
          return (
            <Button
              key={i}
              className={cn(
                'text-foreground h-7 w-full text-sm font-normal',
                displayYears.from + i === CURRENT_YEAR &&
                  'bg-accent text-accent-foreground font-medium'
              )}
              variant="ghost"
              onClick={() => {
                setNavView('days');
                goToMonth(
                  new TZDate(
                    displayYears.from + i,
                    (selected as Date | undefined)?.getMonth() ?? 0,
                    timeZone
                  )
                );
              }}
              disabled={navView === 'years' ? isDisabled : undefined}
            >
              {displayYears.from + i}
            </Button>
          );
        }
      )}
    </div>
  );
}

export { Calendar };
