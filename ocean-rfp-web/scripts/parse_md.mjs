// agent3 대시보드 MD → src/data/projects.json 파싱
// 표출 전용 정적 데이터 생성 (DB 아님)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const MD = resolve(__dirname, '../../agent3_dashboard_report_4개파일반영_v13.md')

// 프로젝트 H1 제목 → id 매핑
const PROJECTS = [
  { id: 'coast', h1: '2026 해안침수예상도 제작' },
  { id: 'satellite', h1: '2026년 해양위성정보 종합분석 및 활용지원' },
  { id: 'ecology', h1: '연근해 저차해양생태계 생물 현황 및 먹이망 구조 파악(II)' },
  { id: 'ai', h1: '민군경 AI 기반 해양영상 융복합 분석기술개발' },
]

// 중요 정보 (원본 HTML 기준 — MD에는 없음)
const KEY_INFO = {
  coast: [
    '수치모형 변경 시 발주기관 협의 필요',
    '대상지역별 침수 외력조건은 발주기관과 협의하여 선정',
    '수심·지형·해안선 자료의 기준면과 좌표계 명확화',
    '검증자료와 활용자료는 보고서에 명확히 제시',
  ],
  satellite: [
    '괭생이모자반 모니터링은 계약체결 후 7월까지 포함',
    '저염분수는 최소 6~9월, 적조는 최소 7~10월 모니터링 포함',
    '2025.12~2026.11 자료 생산 조건 다수 포함',
    '국가해양위성센터 기존 산출물과 신규 개발 산출물 구분 필요',
  ],
  ecology: [
    '식물플랑크톤 시료 600개 분석 조건 포함',
    '중형 및 대형 동물플랑크톤 각각 200개 시료 분석 조건 포함',
    '대형저서동물 200개 시료 분석 조건 포함',
    '착수·중간·최종보고회 및 월별 수행상황 보고 필요',
    '성과물 지식재산권과 자료 제공은 발주처 조건 준수',
  ],
  ai: [
    '선정과제수 1개',
    '연구개발과제성격은 연구개발',
    '보안과제 유무는 일반과제',
    '기업참여 필수 및 기술료 징수 조건 확인 필요',
    '총 연구기간과 정부지원연구개발비는 평가·예산에 따라 조정 가능',
  ],
}

const raw = readFileSync(MD, 'utf8')
const lines = raw.split('\n')

// H1(# ...) 위치로 프로젝트 청크 분할
function chunkFor(h1) {
  const start = lines.findIndex((l) => l.trim() === `# ${h1}`)
  if (start < 0) throw new Error(`H1 없음: ${h1}`)
  let end = lines.length
  for (let i = start + 1; i < lines.length; i++) {
    if (/^# (?!#)/.test(lines[i]) || lines[i].startsWith('# ')) {
      end = i
      break
    }
  }
  return lines.slice(start, end)
}

// 청크 내 "## 섹션" 추출 → 라인 배열
function section(chunk, name) {
  const s = chunk.findIndex((l) => l.trim() === `## ${name}`)
  if (s < 0) return []
  let e = chunk.length
  for (let i = s + 1; i < chunk.length; i++) {
    if (chunk[i].startsWith('## ')) { e = i; break }
  }
  return chunk.slice(s + 1, e)
}

// ```text ... ``` 펜스 안의 "- " bullet 추출
function fenceBullets(secLines) {
  const out = []
  let inFence = false
  for (const l of secLines) {
    if (l.startsWith('```')) { inFence = !inFence; continue }
    if (inFence && l.trim().startsWith('- ')) out.push(l.trim().slice(2).trim())
  }
  return out
}

// ```text ... ``` 펜스 안 전체 텍스트 (원문용)
function fenceText(secLines) {
  const out = []
  let inFence = false
  for (const l of secLines) {
    if (l.startsWith('```')) { inFence = !inFence; continue }
    if (inFence) out.push(l)
  }
  return out.join('\n').trim()
}

// 기본정보 표: | 항목 | 값 |
function basicInfo(secLines) {
  const map = {}
  for (const l of secLines) {
    const m = l.match(/^\|\s*(.+?)\s*\|\s*(.+?)\s*\|$/)
    if (!m) continue
    const k = m[1].trim(), v = m[2].trim()
    if (k === '항목' || /^-+$/.test(k)) continue
    map[k] = v
  }
  return map
}

// 상세 용어해설: ### <term> + 표(전문 정의/쉽게 이해하기/과업에서 보는 관점)
function terms(secLines) {
  const result = []
  let cur = null
  for (const l of secLines) {
    const h = l.match(/^###\s+(.+?)\s*$/)
    if (h) { cur = { term: h[1].trim(), proDef: '', easyDef: '', taskView: '' }; result.push(cur); continue }
    if (!cur) continue
    const m = l.match(/^\|\s*(.+?)\s*\|\s*(.+?)\s*\|$/)
    if (!m) continue
    const k = m[1].trim(), v = m[2].trim()
    if (k === '구분' || /^-+$/.test(k)) continue
    if (k === '전문 정의') cur.proDef = v
    else if (k === '쉽게 이해하기') cur.easyDef = v
    else if (k === '과업에서 보는 관점') cur.taskView = v
  }
  return result
}

const projects = PROJECTS.map(({ id, h1 }) => {
  const chunk = chunkFor(h1)
  const info = basicInfo(section(chunk, '기본정보'))
  return {
    id,
    name: h1,
    agency: info['발주처'] || '',
    docType: info['문서 유형'] || '',
    budget: info['예산'] || '',
    period: info['사업기간'] || '',
    section: info['표출 구간'] || '',
    summary: fenceBullets(section(chunk, '사업요약')),
    areas: fenceBullets(section(chunk, '대상지역 / 범위')),
    deliverables: fenceBullets(section(chunk, '주요 산출물')),
    keyInfo: KEY_INFO[id] || [],
    terms: terms(section(chunk, '상세 용어해설')),
    original: fenceText(section(chunk, '원본 사업내용')),
  }
})

// 검증
const errors = []
for (const p of projects) {
  for (const f of ['agency', 'budget', 'period', 'original']) {
    if (!p[f]) errors.push(`${p.id}.${f} 비어있음`)
  }
  if (p.summary.length === 0) errors.push(`${p.id}.summary 비어있음`)
  if (p.terms.length === 0) errors.push(`${p.id}.terms 비어있음`)
  for (const t of p.terms) {
    if (!t.proDef || !t.easyDef || !t.taskView) errors.push(`${p.id} 용어 "${t.term}" 필드 누락`)
  }
}

const outDir = resolve(__dirname, '../src/data')
mkdirSync(outDir, { recursive: true })
writeFileSync(resolve(outDir, 'projects.json'), JSON.stringify(projects, null, 2), 'utf8')

console.log('=== 파싱 결과 ===')
for (const p of projects) {
  console.log(
    `${p.id.padEnd(10)} | ${p.agency} | 예산 ${p.budget} | 요약 ${p.summary.length} · 대상 ${p.areas.length} · 산출물 ${p.deliverables.length} · 용어 ${p.terms.length} · 원문 ${p.original.length}자`,
  )
}
console.log(errors.length ? `\n검증 오류:\n - ${errors.join('\n - ')}` : '\n검증 OK — 누락 없음')
