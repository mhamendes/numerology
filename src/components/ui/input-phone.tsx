'use client';

import 'react-international-phone/style.css';

import React from 'react';
import { PhoneInput as ReactInternationalPhoneInput } from 'react-international-phone';

import { cn } from '@/lib/utils';

const PhoneInput = ({
  className,
  ...props
}: React.ComponentProps<typeof ReactInternationalPhoneInput>) => {
  return (
    <ReactInternationalPhoneInput
      inputClassName={cn(
        'border-input text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border px-3 py-1 text-base font-medium shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className
      )}
      {...props}
    />
  );
};

export { PhoneInput };
