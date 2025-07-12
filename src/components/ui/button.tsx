import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 transition-all duration-150',
  {
    variants: {
      variant: {
        default: 'bg-teal-600 text-white shadow hover:bg-teal-700',
        destructive: 'bg-red-600 text-white shadow-sm hover:bg-red-700',
        outline:
          'border border-gray-200 bg-white shadow-sm text-gray-700 hover:bg-gray-50 hover:border-gray-300',
        secondary: 'bg-gray-100 text-gray-900 shadow-sm hover:bg-gray-200',
        ghost: 'hover:bg-gray-100 hover:text-gray-900',
        link: 'text-teal-600 underline-offset-4 hover:underline',
        teal: 'bg-teal-600 text-white shadow hover:bg-teal-700',
        cyan: 'bg-cyan-600 text-white shadow hover:bg-cyan-700',
        emerald: 'bg-emerald-600 text-white shadow hover:bg-emerald-700',
        outlineTeal: 'border border-teal-600 text-teal-600 hover:bg-teal-50',
        outlineCyan: 'border border-cyan-600 text-cyan-600 hover:bg-cyan-50',
        success: 'bg-emerald-600 text-white shadow hover:bg-emerald-700',
        warning: 'bg-amber-500 text-white shadow hover:bg-amber-600',
        info: 'bg-cyan-600 text-white shadow hover:bg-cyan-700'
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        xl: 'h-12 rounded-md px-10 text-base',
        icon: 'h-9 w-9'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
