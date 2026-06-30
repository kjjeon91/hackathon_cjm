import {
  ROLE_CONFIG,
  SUMMARY_AXES,
  SUMMARY_SCORES,
  type RoleConfig,
} from '@/data/seed';

export const ROLE_KEYS: RoleConfig['key'][] = ['dept', 'admin', 'exec'];

/**
 * 종합 평가 점수.
 * v9 데모에서는 plus1.html 종합 폴리곤을 권위값으로 사용한다.
 * (추후: 역할별 점수의 가중 매핑으로 src/db/query.py에서 산정)
 */
export function comprehensiveScores(): number[] {
  return SUMMARY_SCORES;
}

export { SUMMARY_AXES, ROLE_CONFIG };

/** 가장 강한 / 보완 필요 종합 평가축 */
export function strongestAxis(scores: number[]): { axis: string; score: number } {
  let idx = 0;
  scores.forEach((s, i) => {
    if (s > scores[idx]) idx = i;
  });
  return { axis: SUMMARY_AXES[idx], score: scores[idx] };
}

export function weakestAxis(scores: number[]): { axis: string; score: number } {
  let idx = 0;
  scores.forEach((s, i) => {
    if (s < scores[idx]) idx = i;
  });
  return { axis: SUMMARY_AXES[idx], score: scores[idx] };
}
