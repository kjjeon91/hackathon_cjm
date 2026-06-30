import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface TabItem {
  key: string;
  label: ReactNode;
}

export function Tabs({
  items,
  active,
  onChange,
  className,
}: {
  items: TabItem[];
  active: string;
  onChange: (key: string) => void;
  className?: string;
}) {
  return (
    <div
      role="tablist"
      className={cn('inline-flex gap-1 rounded-2xl border border-line bg-white p-1', className)}
    >
      {items.map((it) => {
        const selected = it.key === active;
        return (
          <button
            key={it.key}
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(it.key)}
            className={cn(
              'rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300 ease-ocean focus-ring',
              selected
                ? 'bg-gradient-to-br from-navy to-blue text-white shadow-sm'
                : 'text-muted hover:bg-ice hover:text-navy',
            )}
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
}
