/**
 * ScoreSegmented — 0~5 점수를 슬라이더 없이 "딱딱 바로 클릭"으로 고르는 세그먼트 컨트롤.
 * 부서장/행정부/부문장 판단 페이지의 점수 입력에 사용.
 */
interface ScoreSegmentedProps {
  value: number;
  onChange: (next: number) => void;
  color: string;
  label: string;
  max?: number;
}

export function ScoreSegmented({ value, onChange, color, label, max = 5 }: ScoreSegmentedProps) {
  const options = Array.from({ length: max + 1 }, (_, i) => i); // 0..max
  return (
    <div
      role="radiogroup"
      aria-label={`${label} 점수 선택`}
      className="grid gap-1.5"
      style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
    >
      {options.map((n) => {
        const selected = value === n;
        return (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={`${label} ${n}점`}
            onClick={() => onChange(n)}
            className="flex h-11 items-center justify-center rounded-xl border text-base font-bold tabular-nums transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
            style={
              selected
                ? { background: color, borderColor: color, color: '#fff', boxShadow: `0 4px 12px ${color}40` }
                : { background: '#fff', borderColor: '#dbe7f4', color: '#64748b' }
            }
          >
            {n}
          </button>
        );
      })}
    </div>
  );
}
