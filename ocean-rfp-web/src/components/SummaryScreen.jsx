import { getProject } from '../data/projects.js'
import TermCard from './TermCard.jsx'

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

export default function SummaryScreen({ id, onBack, onOriginal }) {
  const p = getProject(id)
  if (!p) return null

  const metas = [
    ['발주처', p.agency],
    ['문서 유형', p.docType],
    ['예산', p.budget],
    ['사업기간', p.period],
    ['표출 구간', p.section],
  ]

  return (
    <main className="detail">
      <button className="back" onClick={onBack}>← 프로젝트 목록으로</button>

      <div className="dhero">
        <div className="eyebrow">Page 2 · Summary + Terms</div>
        <h1>{p.name}</h1>
        <p>{p.section} 기준으로 사업요약, 대상범위, 산출물, 상세 용어해설을 제공합니다.</p>
        <div className="metas">
          {metas.map(([k, v]) => (
            <div key={k} className="meta"><b>{k}</b>{v}</div>
          ))}
        </div>
      </div>

      <div className="notice">
        ※ 이미지형 키워드는 제외하고, 실제 과업 이해에 필요한 중요 용어를 상세하게 설명합니다.
      </div>

      <div className="info-grid">
        <InfoCard title="사업요약" items={p.summary} />
        <InfoCard title="대상지역 / 범위" items={p.areas} />
      </div>
      <div className="info-grid">
        <InfoCard title="주요 산출물" items={p.deliverables} />
        <InfoCard title="중요 정보" items={p.keyInfo} />
      </div>

      <div className="glass info-card">
        <h2><span className="k">// </span>상세 용어해설</h2>
        <div className="term-grid">
          {p.terms.map((t) => (
            <TermCard key={t.term} term={t} />
          ))}
        </div>
      </div>

      <div className="actions">
        <button className="big primary" onClick={() => onOriginal(p.id)}>원본 전체 보기 →</button>
        <button className="big secondary" onClick={onBack}>목록으로</button>
      </div>
    </main>
  )
}
