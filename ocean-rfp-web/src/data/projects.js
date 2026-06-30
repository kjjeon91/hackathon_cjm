// 표출 전용 정적 데이터 (DB 아님)
// 원본: agent3_dashboard_report_4개파일반영_v13.md → scripts/parse_md.mjs 로 생성된 projects.json
import data from './projects.json'

// 표시용 보강 (디자인 시안 기준 — 목록 칩/단축 라벨)
const AUGMENT = {
  coast: { tags: ['복합침수', 'ADCIRC', '50개소'], budgetShort: '25억', endLabel: '2026.12' },
  satellite: { tags: ['다종위성', 'ATBD', '북극항로'], budgetShort: '19억', endLabel: '2026.12' },
  ecology: { tags: ['플랑크톤', '먹이망', 'AI 분석'], budgetShort: '5.3억', endLabel: '2026.12' },
  ai: { tags: ['멀티모달', '온디바이스 AI', '객체탐지'], budgetShort: '150억', endLabel: '2029.12' },
}

export const projects = data.map((p) => ({ ...p, ...AUGMENT[p.id] }))

export const getProject = (id) => projects.find((p) => p.id === id)

// KPI 덱 집계
export const kpis = {
  count: projects.length,
  budgetTotal: '약 199억', // 25+19+5.3+150 (해안25·위성19·생태5.3·AI 150억 총액)
  agencies: new Set(projects.map((p) => p.agency)).size, // 3 (조사원·수산과학원·해수부/KIMST)
  terms: projects.reduce((n, p) => n + p.terms.length, 0), // 28
}
