import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-teal-100 text-teal-800 shadow',
        secondary: 'border-transparent bg-gray-100 text-gray-800 shadow',
        destructive: 'border-transparent bg-red-100 text-red-800 shadow',
        outline: 'text-foreground',
        success: 'border-transparent bg-teal-100 text-teal-800 shadow',
        warning: 'border-transparent bg-amber-100 text-amber-800 shadow',
        info: 'border-transparent bg-cyan-100 text-cyan-800 shadow',
        purple: 'border-transparent bg-purple-100 text-purple-800 shadow'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
