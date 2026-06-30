import { useMemo } from 'react';

/**
 * RadarChart — plus1.html의 SVG 레이더 차트를 React로 일반화.
 *
 * 기하 규약 (plus1.html 계승):
 *   - viewBox 340 x 320, 중심 (170,150), 반지름 105px, 5단계 격자(21px/단계)
 *   - 6축, 최상단(-90°)부터 시계방향 60° 간격
 *   - 점수 0~5 → 반지름 score/5 * 105
 *   - 축 라벨 폰트 12px (가독성 하한 준수)
 */

const CX = 170;
const CY = 150;
const R = 105;
const RINGS = 5;

interface RadarChartProps {
  axes: string[]; // 라벨 (길이 N, 보통 6)
  scores: number[]; // 0~5 (길이 N)
  color: string; // 폴리곤/점 색
  /** 폴리곤 면 채움 투명도 */
  fillOpacity?: number;
  className?: string;
  /** 애니메이션 키 — 값 변경 시 재생 */
  animate?: boolean;
}

function pointOnAxis(index: number, total: number, radius: number) {
  const angle = -Math.PI / 2 + (index * 2 * Math.PI) / total;
  return {
    x: CX + radius * Math.cos(angle),
    y: CY + radius * Math.sin(angle),
  };
}

export function RadarChart({
  axes,
  scores,
  color,
  fillOpacity = 0.2,
  className,
  animate = true,
}: RadarChartProps) {
  const total = axes.length;

  const rings = useMemo(
    () =>
      Array.from({ length: RINGS }, (_, ringIdx) => {
        const radius = (R * (ringIdx + 1)) / RINGS;
        return Array.from({ length: total }, (_, i) => pointOnAxis(i, total, radius))
          .map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`)
          .join(' ');
      }),
    [total],
  );

  const axisPoints = useMemo(
    () => Array.from({ length: total }, (_, i) => pointOnAxis(i, total, R)),
    [total],
  );

  const labelPoints = useMemo(
    () => Array.from({ length: total }, (_, i) => pointOnAxis(i, total, R + 22)),
    [total],
  );

  const dataPoints = useMemo(
    () =>
      scores.map((s, i) => {
        const clamped = Math.max(0, Math.min(5, s));
        return pointOnAxis(i, total, (R * clamped) / 5);
      }),
    [scores, total],
  );

  const polygon = dataPoints.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');

  return (
    <svg
      viewBox="0 0 340 320"
      className={className}
      role="img"
      aria-label={`레이더 차트: ${axes.map((a, i) => `${a} ${scores[i]}점`).join(', ')}`}
      style={{ width: '100%', height: 'auto' }}
    >
      {/* 격자 폴리곤 */}
      {rings.map((pts, i) => (
        <polygon key={i} points={pts} fill="none" stroke="#dde7ee" strokeWidth={1} />
      ))}

      {/* 축선 + 라벨 */}
      {axisPoints.map((p, i) => {
        const lp = labelPoints[i];
        const anchor = lp.x > CX + 1 ? 'start' : lp.x < CX - 1 ? 'end' : 'middle';
        return (
          <g key={i}>
            <line x1={CX} y1={CY} x2={p.x} y2={p.y} stroke="#c8d8e4" strokeWidth={1} />
            <text
              x={lp.x}
              y={lp.y}
              textAnchor={anchor}
              dominantBaseline="middle"
              fontSize={12}
              fontWeight={700}
              fill="#0b3658"
            >
              {axes[i]}
            </text>
          </g>
        );
      })}

      {/* 데이터 폴리곤 */}
      <polygon
        points={polygon}
        fill={color}
        fillOpacity={fillOpacity}
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
        style={animate ? { transition: 'all .4s cubic-bezier(.16,1,.3,1)' } : undefined}
      />

      {/* 데이터 점 */}
      {dataPoints.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={4}
          fill={color}
          style={animate ? { transition: 'all .4s cubic-bezier(.16,1,.3,1)' } : undefined}
        />
      ))}
    </svg>
  );
}
