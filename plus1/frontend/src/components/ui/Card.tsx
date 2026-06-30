import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function Card({
  className,
  interactive,
  ...props
}: HTMLAttributes<HTMLDivElement> & { interactive?: boolean }) {
  return (
    <div
      className={cn(
        'rounded-3xl border border-line bg-white shadow-card',
        // cord elevation language: every card eases its shadow; clickable cards lift
        interactive
          ? 'hover-lift cursor-pointer hover:border-blue/30'
          : 'transition-shadow duration-300 ease-ocean hover:shadow-soft',
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({
  title,
  desc,
  icon,
  action,
}: {
  title: ReactNode;
  desc?: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-5">
      <div className="flex items-start gap-3">
        {icon && (
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue/10 text-blue">
            {icon}
          </div>
        )}
        <div>
          <h2 className="text-lg font-bold tracking-tight text-navy">{title}</h2>
          {desc && <p className="mt-1 text-sm text-muted">{desc}</p>}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function CardBody({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6', className)} {...props} />;
}
