import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** 진입 시 staggered fade-up. delay는 인덱스 기반. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={cn('animate-fade-up', className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
