import { getProject } from '../data/projects.js'

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

export default function OriginalScreen({ id, onBack, onSummary }) {
  const p = getProject(id)
  if (!p) return null

  return (
    <main className="detail">
      <button className="back" onClick={onBack}>← 프로젝트 목록으로</button>

      <div className="head">
        <div>
          <div className="eyebrow">Page 3 · Original Document</div>
          <h1>{p.name} <em>원본</em></h1>
          <p>원문 사업내용 전체를 그대로 표출합니다. (표출 전용 · 편집 불가)</p>
        </div>
      </div>

      <div className="glass section">
        <div className="shead">
          <span className="num">원문</span>
          <div>
            <h2>원본 사업내용</h2>
            <div className="src">표출 구간 · {p.section}</div>
          </div>
        </div>
        <div className="raw">{p.original}</div>
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
