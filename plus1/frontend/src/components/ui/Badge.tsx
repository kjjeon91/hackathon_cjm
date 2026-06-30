import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Tone = 'green' | 'amber' | 'red' | 'blue' | 'neutral';

const tones: Record<Tone, string> = {
  green: 'bg-green/10 text-green ring-green/20',
  amber: 'bg-amber/10 text-[#92400e] ring-amber/30',
  red: 'bg-red/10 text-red ring-red/20',
  blue: 'bg-ice text-blue ring-blue/20',
  neutral: 'bg-ice text-slate ring-line',
};

export function Badge({
  tone = 'neutral',
  children,
  className,
}: {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ring-1 ring-inset',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** 판단값 → 톤 매핑 */
export function judgementTone(j: string): Tone {
  if (j === '참여' || j === '높음' || j === '양호') return 'green';
  if (j === '조건부' || j === '보통') return 'amber';
  if (j === '보류' || j === '보완 필요') return 'red';
  return 'neutral';
}
