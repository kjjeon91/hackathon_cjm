import { getProject } from '../data/projects.js'
import { DownloadIcon } from './icons.jsx'

function InfoCard({ title, items }) {
  return (
    <div className="glass info-card">
      <h2><span className="k">// </span>{title}</h2>
      <ul>
        {items.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </div>
  )
}

// 원문을 구조(대제목/중제목/항목/하위/비고)로 구분 렌더링
function lineClass(t) {
  if (/^[가-힣]\.\s/.test(t) || /^[ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩ]+\./.test(t)) return 'ol-h1' // 가. 나. 다.
  if (/^\d+\)/.test(t)) return 'ol-h2' // 1) 2)
  if (/^\d+\.\s/.test(t)) return 'ol-h2' // 1. 2.
  if (/^[○◦●]/.test(t)) return 'ol-o' // ○ 주요 항목
  if (/^[-]\s/.test(t)) return 'ol-dash' // - 하위
  if (/^[*※]/.test(t)) return 'ol-note' // * ※ 비고
  return 'ol-p'
}

// 표 추출 잔해 감지 — 표 구조가 깨져 한 줄로 뭉친 라인 (내용 마커 기반, 본문 오검출 방지)
function isTableDump(t) {
  if (/추진\s*일정\s*\(개월\)|공정\s*\(%\)|누계\s*공정/.test(t)) return true // 추진일정표
  if (/중앙행정기관명|전체 연구개발기간|연구개발과제명/.test(t)) return true // RFP 개요표
  if (/구분\s+항목\s+비고/.test(t)) return true // 자료목록표
  if (/활용\s*위성\s*\/\s*서비스|산출물\s*명\s*활용/.test(t)) return true // 위성 산출물표 헤더
  // 위성/센서 코드가 3종 이상 나열 → 위성 산출물표 본문
  const codes = (t.match(/GK-2[AB]|Sentinel|MODIS|VIIRS|CMEMS|Landsat|NOAA|Aqua|Terra|Suomi|GCOM|GPM|Skysat|Worldview|Pleiades/g) || []).length
  if (codes >= 3) return true
  return false
}

function OriginalDoc({ text }) {
  const lines = text.split('\n')
  return (
    <div className="doc">
      {lines.map((raw, i) => {
        const t = raw.trim()
        if (t === '') return <div key={i} className="ol-gap" />
        if (isTableDump(t)) {
          return (
            <div key={i} className="ol-table">
              <span className="ol-table-tag">원문 표 (추출 원본)</span>
              {t}
            </div>
          )
        }
        return <div key={i} className={lineClass(t)}>{t}</div>
      })}
    </div>
  )
}

export default function OriginalScreen({ id, onBack, onSummary }) {
  const p = getProject(id)
  if (!p) return null

  return (
    <main className="detail">
      <button className="back" onClick={onBack}>← 프로젝트 목록으로</button>

      <div className="head doc-head">
        <h1>{p.name}</h1>
        {p.download?.has ? (
          <a
            className="dl-btn"
            href={`${import.meta.env.BASE_URL}originals/${encodeURIComponent(p.download.file)}`}
            download={p.download.file}
            title={`원문 자료 다운로드 (${p.download.file})`}
          >
            <DownloadIcon /> 원문 다운로드
          </a>
        ) : (
          <span className="dl-btn disabled" title="원문 파일이 등록되지 않았습니다">
            <DownloadIcon /> 원문 준비중
          </span>
        )}
      </div>

      <div className="glass section">
        <div className="shead">
          <span className="doc-badge">사업내용</span>
        </div>
        <OriginalDoc text={p.original} />
      </div>

      <div className="info-grid">
        <InfoCard title="주요 제출 산출물" items={p.deliverables} />
        <InfoCard title="중요 정보" items={p.keyInfo} />
      </div>

      <div className="actions">
        <button className="big primary" onClick={() => onSummary(p.id)}>← 사업요약으로</button>
        <button className="big secondary" onClick={onBack}>목록으로</button>
      </div>
    </main>
  )
}
