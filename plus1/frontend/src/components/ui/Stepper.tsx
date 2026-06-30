import { cn } from '@/lib/utils';

export interface Step {
  key: string;
  label: string;
  short: string;
}

export function Stepper({
  steps,
  current,
  onSelect,
}: {
  steps: Step[];
  current: number; // 0-based
  onSelect: (index: number) => void;
}) {
  return (
    <nav aria-label="진행 단계" className="w-full">
      {/* 데스크탑/태블릿: 가로 스텝퍼 */}
      <ol className="hidden items-center gap-1 md:flex">
        {steps.map((step, i) => {
          const state = i < current ? 'done' : i === current ? 'active' : 'todo';
          return (
            <li key={step.key} className="flex flex-1 items-center">
              <button
                onClick={() => onSelect(i)}
                aria-current={state === 'active' ? 'step' : undefined}
                className="group flex min-w-0 flex-1 items-center gap-2.5 rounded-2xl px-2.5 py-2 transition-colors hover:bg-white focus-ring"
              >
                <span
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all',
                    state === 'active' && 'bg-gradient-to-br from-navy to-blue text-white shadow-header',
                    state === 'done' && 'bg-green/15 text-green',
                    state === 'todo' && 'bg-white text-muted ring-1 ring-line',
                  )}
                >
                  {state === 'done' ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </span>
                <span
                  className={cn(
                    'min-w-0 truncate text-left text-sm font-semibold transition-colors',
                    state === 'active' ? 'text-navy' : 'text-muted group-hover:text-ink',
                  )}
                >
                  {step.short}
                </span>
              </button>
              {i < steps.length - 1 && (
                <span
                  className={cn(
                    'mx-0.5 h-px w-4 shrink-0 lg:w-6',
                    i < current ? 'bg-green/40' : 'bg-line',
                  )}
                  aria-hidden
                />
              )}
            </li>
          );
        })}
      </ol>

      {/* 모바일: 컴팩트 셀렉트 */}
      <div className="flex items-center gap-3 md:hidden">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-navy to-blue text-sm font-bold text-white">
          {current + 1}
        </span>
        <select
          value={current}
          onChange={(e) => onSelect(Number(e.target.value))}
          className="h-10 w-full rounded-2xl border border-line bg-white px-3 text-base font-semibold text-navy focus-ring"
          aria-label="단계 선택"
        >
          {steps.map((s, i) => (
            <option key={s.key} value={i}>
              {i + 1}. {s.label}
            </option>
          ))}
        </select>
      </div>
    </nav>
  );
}
