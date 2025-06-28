import * as React from 'react';
import { cn } from '@/lib/utils';

export function Logo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 100 100"
      className={cn('text-primary', className)}
      {...props}
    >
      <g transform="translate(50, 50) rotate(15)">
        <polygon
          points="0,-40 34.6,-20 34.6,20 0,40 -34.6,20 -34.6,-20"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="4"
        />
        <text
          x="-1"
          y="10"
          fontFamily="'Inter', sans-serif"
          fontSize="40"
          fontWeight="bold"
          fill="hsl(var(--primary-foreground))"
          textAnchor="middle"
          transform="rotate(-15)"
        >
          D
        </text>
      </g>
    </svg>
  );
}
