import { useApp } from '@/context/AppContext';
import { Badge, judgementTone } from '@/components/ui/Badge';
import { ROLE_CONFIG } from '@/data/seed';
import { comprehensiveScores, strongestAxis, weakestAxis, ROLE_KEYS } from '@/lib/selectors';
import { OVERALL_BADGE } from '@/data/seed';
import { judgeFromAverage } from '@/lib/utils';

/**
 * 종합평가 결과 요약 (v8/v9):
 *  - 종합 참여 판단 / 가장 강한 평가축 / 보완 필요 평가축 / 역할별 평균 / 우선 보완 대상
 * SummaryPage와 결과보고서에서 공용.
 */
export function SummaryInsights() {
  const { averages } = useApp();
  const scores = comprehensiveScores();
  const strong = strongestAxis(scores);
  const weak = weakestAxis(scores);

  const rows = [
    {
      label: '종합 참여 판단',
      value: <Badge tone="amber">{OVERALL_BADGE}</Badge>,
    },
    {
      label: '가장 강한 평가축',
      value: (
        <span className="font-bold text-green">
          {strong.axis} <span className="tabular-nums">({strong.score.toFixed(1)})</span>
        </span>
      ),
    },
    {
      label: '보완이 필요한 평가축',
      value: (
        <span className="font-bold text-red">
          {weak.axis} <span className="tabular-nums">({weak.score.toFixed(1)})</span>
        </span>
      ),
    },
    {
      label: '우선 보완 대상',
      value: <span className="font-bold text-ink">참여기관 7개 역할분담 · 정산관리 명확화</span>,
    },
  ];

  return (
    <div className="space-y-4">
      <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {rows.map((r) => (
          <div
            key={r.label}
            className="flex items-center justify-between gap-3 rounded-2xl border border-line bg-canvas/50 px-4 py-3.5"
          >
            <dt className="text-sm font-semibold text-muted">{r.label}</dt>
            <dd className="text-base">{r.value}</dd>
          </div>
        ))}
      </dl>

      {/* 역할별 평균점수 요약 */}
      <div>
        <p className="mb-2 text-sm font-semibold text-muted">역할별 평균점수 요약</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {ROLE_KEYS.map((key) => {
            const cfg = ROLE_CONFIG[key];
            const avg = averages[key];
            const j = judgeFromAverage(avg);
            return (
              <div
                key={key}
                className="rounded-2xl border border-line bg-white p-4"
                style={{ borderTopColor: cfg.color, borderTopWidth: 3 }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-navy">{cfg.label.replace(' 판단', '')}</span>
                  <Badge tone={judgementTone(j)}>{j}</Badge>
                </div>
                <p className="mt-1.5 text-2xl font-extrabold tabular-nums" style={{ color: cfg.color }}>
                  {avg.toFixed(2)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
