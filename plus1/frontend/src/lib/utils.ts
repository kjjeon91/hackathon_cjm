/** className 병합 헬퍼 (clsx 대용 — 외부 의존 없이) */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

/** 천단위 콤마 (원화) */
export function formatKRW(value: number): string {
  if (!Number.isFinite(value)) return '0';
  return Math.round(value).toLocaleString('ko-KR');
}

/** 평균 점수 (소수 둘째자리) */
export function average(scores: number[]): number {
  if (scores.length === 0) return 0;
  const sum = scores.reduce((a, b) => a + b, 0);
  return Math.round((sum / scores.length) * 100) / 100;
}

/** 평균 점수 → 참여 판단 */
export function judgeFromAverage(avg: number): '참여' | '조건부' | '보류' {
  if (avg >= 4) return '참여';
  if (avg >= 3) return '조건부';
  return '보류';
}
