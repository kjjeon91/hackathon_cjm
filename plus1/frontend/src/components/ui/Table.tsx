import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function Table({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('overflow-x-auto rounded-2xl border border-line', className)}>
      <table className="w-full border-collapse text-base">{children}</table>
    </div>
  );
}

export function THead({ children }: { children: ReactNode }) {
  return <thead className="bg-[#eef7ff]">{children}</thead>;
}

export function TBody({ children }: { children: ReactNode }) {
  return <tbody>{children}</tbody>;
}

export function Tr({ children, className }: { children: ReactNode; className?: string }) {
  return <tr className={cn('border-b border-line last:border-0', className)}>{children}</tr>;
}

export function Th({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        'border-r border-line px-3.5 py-3 text-left text-sm font-bold text-navy last:border-r-0',
        className,
      )}
      {...props}
    >
      {children}
    </th>
  );
}

export function Td({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={cn(
        'border-r border-line px-3.5 py-3 align-top text-base leading-relaxed text-ink last:border-r-0',
        className,
      )}
      {...props}
    >
      {children}
    </td>
  );
}

/** 라벨/값 2열 정보 행 (사업개요용) — th는 옅은 파랑 배경 */
export function KeyTh({ children }: { children: ReactNode }) {
  return (
    <th className="w-[18%] whitespace-nowrap border-r border-line bg-[#eef7ff] px-3.5 py-3 text-left text-sm font-bold text-navy">
      {children}
    </th>
  );
}
