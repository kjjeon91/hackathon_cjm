// 표출 전용 정적 데이터 (DB 아님)
// 원본: agent3_dashboard_report_4개파일반영_v13.md → scripts/parse_md.mjs 로 생성된 projects.json
import data from './projects.json'

// 표시용 보강 (디자인 시안 기준 — 목록 칩/단축 라벨)
// download.file: public/originals/ 아래 파일명 | download.name: 저장될 파일명 | download.has: 파일 등록 여부
const AUGMENT = {
  coast: {
    tags: ['복합침수', 'ADCIRC', '50개소'], budgetShort: '25억', endLabel: '2026.12',
    download: { file: 'originals/coast.hwpx', name: '2026_해안침수예상도_제작_제안요청서.hwpx', has: true },
  },
  satellite: {
    tags: ['다종위성', 'ATBD', '북극항로'], budgetShort: '19억', endLabel: '2026.12',
    download: { file: 'originals/satellite.pdf', name: '2026_해양위성정보_종합분석_제안요청서.pdf', has: false },
  },
  ecology: {
    tags: ['플랑크톤', '먹이망', 'AI 분석'], budgetShort: '5.3억', endLabel: '2026.12',
    download: { file: 'originals/ecology.hwpx', name: '연근해_저차해양생태계_먹이망_제안요청서.hwpx', has: false },
  },
  ai: {
    tags: ['멀티모달', '온디바이스 AI', '객체탐지'], budgetShort: '150억', endLabel: '2029.12',
    download: { file: 'originals/ai.pdf', name: '민군경_AI_해양영상_공고문.pdf', has: true },
  },
}

export const projects = data.map((p) => ({ ...p, ...AUGMENT[p.id] }))

export const getProject = (id) => projects.find((p) => p.id === id)

// 상단바 기관 필터 (label=표시명, match=agency 포함 매칭, color=기관 색상)
export const AGENCIES = [
  { label: '국립해양조사원', match: '해양조사원', color: '#3ddccb' }, // coast, satellite — aqua
  { label: '수산과학원', match: '수산과학원', color: '#5fd38a' }, // ecology — green
  { label: 'KIMST', match: 'KIMST', color: '#8a9bff' }, // ai — periwinkle
]

// 발주처 → 색상
export const agencyColor = (agency) =>
  (AGENCIES.find((a) => agency.includes(a.match)) || {}).color || '#7d93b8'

// 다중 선택: 선택된 기관 배열 중 하나라도 일치하면 표시 (빈 배열=전체)
export const filterByAgency = (agencies) =>
  !agencies || agencies.length === 0
    ? projects
    : projects.filter((p) => agencies.some((a) => p.agency.includes(a.match)))

// 목록의 예산 합계(억) — budgetShort("25억" 등) 파싱·합산
export const sumBudgetEok = (list) => {
  const sum = list.reduce(
    (s, p) => s + (parseFloat(String(p.budgetShort).replace(/[^0-9.]/g, '')) || 0),
    0,
  )
  if (sum === 0) return '0'
  const r = sum < 10 ? Math.round(sum * 10) / 10 : Math.round(sum)
  return `약 ${r}억`
}

// KPI 덱 집계
export const kpis = {
  count: projects.length,
  budgetTotal: '약 199억', // 25+19+5.3+150 (해안25·위성19·생태5.3·AI 150억 총액)
  agencies: new Set(projects.map((p) => p.agency)).size, // 3 (조사원·수산과학원·해수부/KIMST)
  terms: projects.reduce((n, p) => n + p.terms.length, 0), // 28
}
