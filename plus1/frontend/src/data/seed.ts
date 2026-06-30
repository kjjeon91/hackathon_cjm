/**
 * RFP Decision Intelligence v9 — 시드 데이터
 *
 * plus1.html (자동 결과보고서 샘플 v9)의 값들을 타입과 함께 자체 완결 데모 시드로 정의한다.
 * NOTE: 추후 백엔드 연동 시 이 시드는 src/db/query.py API 응답으로 교체한다.
 */

export type Judgement = '참여' | '조건부' | '보류';
export type RiskLevel = 'green' | 'amber' | 'red';

/** 역할별 평가 축 상세 (plus1.html factorDefs — 긴 제목 + 설명) */
export interface AxisDef {
  key: string; // 짧은 라벨 (레이더 차트 축)
  title: string; // 긴 제목 (평가항목명)
  desc: string; // 설명문
}

/** 역할별 평가 축 정의 (각 6축, 0~5점) */
export interface RoleConfig {
  key: 'dept' | 'admin' | 'exec';
  label: string;
  reviewer: string;
  color: string; // 레이더 폴리곤 색
  axes: string[]; // 6축 짧은 라벨 (레이더 차트용)
  factors: AxisDef[]; // 6축 상세 (긴 제목 + 설명)
}

export const ROLE_CONFIG: Record<RoleConfig['key'], RoleConfig> = {
  dept: {
    key: 'dept',
    label: '부서장 판단',
    reviewer: '최흥배 부서장',
    color: '#2563eb',
    axes: ['기술', '인력', '데이터', '제안', '통제', '전략'],
    factors: [
      {
        key: '기술',
        title: '핵심기술 적합도',
        desc: '해양영상 AI, 해양데이터, 위성·예측정보, 플랫폼 기술 중 우리 부서 강점과 직접 맞는 정도',
      },
      {
        key: '인력',
        title: '수행 인력 확보 가능성',
        desc: '사업책임자와 실무 인력을 실제 투입할 수 있는지',
      },
      {
        key: '데이터',
        title: '데이터·실증 확보 가능성',
        desc: '영상·센서 데이터, 라벨링, 현장 실증, 기관 연계자료를 확보할 수 있는지',
      },
      {
        key: '제안',
        title: '제안 차별화 가능성',
        desc: '평가위원에게 설득 가능한 차별화 기술, 실적, 데이터, 시나리오를 제시할 수 있는지',
      },
      {
        key: '통제',
        title: '수행범위 통제 가능성',
        desc: '컨소시엄 내 당사 역할, 산출물 책임, 일정·품질을 통제할 수 있는지',
      },
      {
        key: '전략',
        title: '부서 전략 적합성',
        desc: '위성·AI·해양예측·AX 플랫폼 등 부서 중장기 방향과 맞는지',
      },
    ],
  },
  admin: {
    key: 'admin',
    label: '행정부 판단',
    reviewer: '오주혜 선임',
    color: '#d97706',
    axes: ['예산', '계약', '제출', '기관', '정산', '관리'],
    factors: [
      {
        key: '예산',
        title: '예산·수익 구조 안정성',
        desc: '전체 예산, 사업부서 예산, 순익, 수익성, 원가추정 불확실성을 고려한 안정성',
      },
      {
        key: '계약',
        title: '계약·기술료 조건 수용성',
        desc: '기술료, 성과물 소유권, 기업참여, 연구비 부담 조건을 회사가 수용할 수 있는지',
      },
      {
        key: '제출',
        title: '행정 제출·IRIS 부담 적정성',
        desc: '제안서, 참여의사확인서, 증빙, 재무제표, IRIS 입력 등 제출 부담의 적정성',
      },
      {
        key: '기관',
        title: '참여기관 신용·재정 안정성',
        desc: '공동기관과 위탁기관의 신용등급, 재무상태, 지속 수행 가능성',
      },
      {
        key: '정산',
        title: '정산·감사 대응 안정성',
        desc: '연구비 집행, 증빙, 감사, 기술료 산정, 청년인력 등 사후관리 안정성',
      },
      {
        key: '관리',
        title: '컨소시엄 계약관리 가능성',
        desc: '기관 수와 역할분담을 고려한 협약·비용정산·자료제공 의무 관리 가능성',
      },
    ],
  },
  exec: {
    key: 'exec',
    label: '부문장 판단',
    reviewer: '송용식 부사장',
    color: '#7c3aed',
    axes: ['수주', '수익', '전략', '우선', '수용', '파급'],
    factors: [
      {
        key: '수주',
        title: '수주 가능성',
        desc: '경쟁구도, 컨소시엄 경쟁력, 평가항목 대응력을 고려한 실제 수주 가능성',
      },
      {
        key: '수익',
        title: '사업성·수익성',
        desc: '매출, 순익, 수익성, 후속사업 가능성을 고려한 사업 가치',
      },
      {
        key: '전략',
        title: '전략적 중요도',
        desc: '해양 AI, AX 플랫폼, 대형 R&D 레퍼런스 확보 측면의 중요도',
      },
      {
        key: '우선',
        title: '조직 자원투입 우선순위',
        desc: '다른 사업과 비교해 핵심 인력과 조직 자원을 투입할 우선순위',
      },
      {
        key: '수용',
        title: '위험수용성',
        desc: '기술·데이터·기관·계약 리스크가 있어도 회사가 감내 가능한 수준인지',
      },
      {
        key: '파급',
        title: '대외 파급효과',
        desc: '정책연계, 후속과제, 브랜드, 레퍼런스 창출 효과',
      },
    ],
  },
};

/** 참여기관 실명 (plus1.html institutions) */
export const INSTITUTIONS = [
  '한국조선해양기자재연구원',
  '한국해양과학기술원',
  '㈜지오시스템리서치',
  '㈜아이렘 기술개발',
  '부산대학교 산학협력단',
  '㈜산엔지니어링',
  '㈜씨넷',
];

/** 참여기관 위험평가 (plus1.html buildInstitutions) */
export interface InstitutionRisk {
  name: string;
  credit: number; // 신용·재정 안정성
  role: number; // 역할 명확성
  manage: number; // 계약관리 난이도
}

/**
 * 참여기관 위험평가 점수 산정 (plus1.html buildInstitutions 로직 이식)
 * - credit: idx 0/1/4 → 4, 그 외 3
 * - role: idx 2 → 5, 그 외 3
 * - manage: count>=8 → 2, count>=6 → 3, 그 외 4
 */
export function buildInstitutions(count = INSTITUTIONS.length): InstitutionRisk[] {
  const list: InstitutionRisk[] = [];
  for (let idx = 0; idx < count; idx++) {
    const name = INSTITUTIONS[idx] ?? `참여기관 ${idx + 1}`;
    const credit = idx === 0 || idx === 1 || idx === 4 ? 4 : 3;
    const role = idx === 2 ? 5 : 3;
    const manage = count >= 8 ? 2 : count >= 6 ? 3 : 4;
    list.push({ name, credit, role, manage });
  }
  return list;
}

/** 종합 평가축 (plus1.html 종합 레이더) */
export const SUMMARY_AXES = ['기술수행', '행정안정', '전략가치', '수익성', '기관위험', '위험수용'];
export const SUMMARY_COLOR = '#16a34a';
/** plus1.html 종합 폴리곤 좌표에서 역산한 0~5 점수 */
export const SUMMARY_SCORES = [4.5, 3.7, 5.0, 4.0, 3.0, 3.5];

/** 역할별 기본 점수 — plus1.html 폴리곤 좌표 기준 (반지름 105px / 5단계 = 21px/점) */
export interface RoleScores {
  scores: number[]; // 길이 6, 0~5
  judgement: Judgement;
  opinion: string;
}

export const DEFAULT_SCORES: Record<RoleConfig['key'], RoleScores> = {
  // 부서장: 점수 합 22 / 6 = 3.67
  dept: {
    scores: [4, 3, 3, 4, 3, 5],
    judgement: '조건부',
    opinion: '전략적 가치는 높으나 데이터 확보와 수행범위 통제 조건 보완 필요',
  },
  // 행정부: 합 19 / 6 = 3.17
  admin: {
    scores: [4, 3, 3, 3, 3, 3],
    judgement: '조건부',
    opinion: '참여기관 수에 따른 계약·정산·기관 신용도 확인 필요',
  },
  // 부문장: 합 23 / 6 = 3.83
  exec: {
    scores: [3, 4, 5, 4, 3, 4],
    judgement: '조건부',
    opinion: '전략적 중요도와 파급효과는 높으나 수주 가능성 검토 병행 필요',
  },
};

/** 사업 개요 (plus1.html 1.사업 개요) */
export interface ProjectOverview {
  title: string;
  orderingAgency: string; // 발주/전문기관
  totalBudgetText: string;
  currentYearBudgetText: string;
  period: string;
  partnerCount: number;
  manager: string; // 사업책임자
  department: string;
  selectedTaskCount: string; // 선정과제수
  taskNature: string; // 과제성격
  securityClass: string; // 보안과제
}

export const PROJECT_OVERVIEW: ProjectOverview = {
  title: '민군경 AI 기반 해양영상 융복합 분석기술개발',
  orderingAgency: '해양수산부 / KIMST',
  totalBudgetText: '총 150억 원 이내',
  currentYearBudgetText: '35억 원 이내',
  period: '2026.04 ~ 2029.12 이내',
  partnerCount: 7,
  manager: '박영민',
  department: '예보사업부',
  selectedTaskCount: '1개',
  taskNature: '연구개발',
  securityClass: '일반과제',
};

/** 주요 사업내용 (plus1.html 4.주요 사업내용) */
export const PROJECT_NOTICE =
  '해양안보, 안전·재난 예방 및 실시간 대응 체계 강화를 위해 해양환경, 객체 및 안전사고 등에 대한 자동탐지·식별 등을 위한 AI 기반 해양영상 융복합분석 기술개발 및 실증을 수행한다.';

export const PROJECT_TASKS = [
  '해양객체 자동탐지 및 식별 AI 알고리즘 통합·고도화',
  '온디바이스 AI 기반 지능형 감시 기술 개발',
  '해양영상·센서 데이터 실시간 융합 멀티모달 분석',
  '해양영토 관련 플랫폼 연계 및 통합 플랫폼 실증',
];

/** 평가자·결재 검토자 기본값 (v9) */
export interface Reviewers {
  dept: string; // 부서장 / 최초 평가자
  admin: string; // 행정부 검토자
  exec: string; // 부문장 검토자
  approvalFlow: string;
}

export const DEFAULT_REVIEWERS: Reviewers = {
  dept: '최흥배 부서장',
  admin: '오주혜 선임',
  exec: '송용식 부사장',
  approvalFlow: '부서장 평가 → 행정부 평가 → 부문장 평가 → 대표 결재',
};

/** 예산 산정 기본값 (v7 — 전체예산 × 비율) */
export const DEFAULT_TOTAL_BUDGET = 15_000_000_000;
export const DEFAULT_BUDGET_RATIO = 7.97; // %

/** 종합평가 결과 요약 (plus1.html 7.종합평가 결과 요약) */
export interface SummaryRow {
  axis: string;
  judgement: '높음' | '양호' | '보통' | '보완 필요';
  interpretation: string;
}

export const SUMMARY_TABLE: SummaryRow[] = [
  { axis: '기술수행', judgement: '양호', interpretation: '사업부 기술 방향과 부합하나 데이터·실증 확보 조건 필요' },
  { axis: '행정안정', judgement: '보통', interpretation: '예산·계약 검토는 가능하나 참여기관 관리부담 존재' },
  { axis: '전략가치', judgement: '높음', interpretation: '해양 AI·AX 전략 및 대형 R&D 레퍼런스 측면에서 가치 높음' },
  { axis: '기관위험', judgement: '보완 필요', interpretation: '참여기관 7개 기준 역할분담, 산출물 책임, 정산관리 명확화 필요' },
];

export const SUMMARY_NARRATIVE =
  '종합평가 결과, 본 과제는 조건부 참여 권고로 판단된다. 기술수행과 전략가치는 상대적으로 양호하나, 참여기관 수가 많고 데이터·실증 조건 및 계약·정산관리 리스크가 존재하므로 제안 전 보완조건을 확정할 필요가 있다.';

export const OVERALL_BADGE = '조건부 참여 권고';

/** 주요 리스크 4카드 (plus1.html 8) */
export interface RiskCard {
  title: string;
  body: string;
  level: RiskLevel;
}

export const RISK_CARDS: RiskCard[] = [
  { title: '데이터·실증 리스크', body: '영상·센서 데이터 제공 범위와 현장 실증 조건을 제안 전 사전 협의한다.', level: 'amber' },
  { title: '참여기관 관리 리스크', body: '참여기관 수 7개 기준으로 역할분담, 계약관리, 산출물 책임을 명확화한다.', level: 'red' },
  { title: '계약·기술료 리스크', body: '기술료, 성과물 소유권, 기업참여 조건을 행정부 검토 후 확정한다.', level: 'amber' },
  { title: '사업부서 수행 리스크', body: '사업책임자와 핵심 인력 투입률을 확정하고 사업부서 예산 범위를 점검한다.', level: 'green' },
];

/** 종합 판단 권고 액션 (plus1.html 9) */
export const OVERALL_NARRATIVE =
  '본 과제는 회사의 해양 AI·AX 전략과 부합하고 대외 파급효과가 크므로 참여 검토 가치가 있다. 다만 참여기관 수가 많고 데이터 확보, 실증환경, 계약·정산관리 리스크가 존재하므로 조건부 참여가 타당하다.';

export const OVERALL_ACTIONS = [
  '사업책임자와 사업부서 예산 기준으로 참여범위 확정',
  '참여기관 수에 따른 계약·정산관리 계획 수립',
  '데이터 제공 범위 및 실증조건 사전 협의',
  '계약·기술료·성과물 조건 검토 후 결재 상신',
];

/** 결재란 (plus1.html 10) */
export interface SignSlot {
  name: string;
  role: string;
}

export const SIGN_SLOTS: SignSlot[] = [
  { name: '최흥배 부서장', role: '확정' },
  { name: '오주혜 선임', role: '확인' },
  { name: '송용식 부사장', role: '검토' },
  { name: '대표', role: '결재' },
];
