'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import { LoadingSpinner } from './loading-spinner';

const buttonVariants = cva(
  'focus-visible:ring-ring inline-flex cursor-pointer items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary/90 shadow',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm',
        outline:
          'border-input bg-background hover:bg-accent hover:text-accent-foreground border shadow-sm',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: true;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, isLoading, variant, size, asChild = false, onClick, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    const [isClicked, setIsClicked] = React.useState(false);

    React.useEffect(() => {
      if (!isLoading) setIsClicked(false);
    }, [isLoading]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isClicked) return;
      if (isLoading !== undefined) setIsClicked(true);
      onClick?.(e);
    };

    const child = asChild ? (
      props.children
    ) : (
      <div className="relative flex w-full items-center justify-center">
        <div
          className={cn(
            buttonVariants({ variant, className }),
            'absolute hidden w-full items-center justify-center',
            isLoading && 'flex'
          )}
        >
          <LoadingSpinner />
        </div>
        {props.children}
      </div>
    );

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        onClick={handleClick}
        ref={ref}
        {...props}
      >
        {child}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
