import { projects, filterByAgency } from '../data/projects.js'
import { SearchIcon } from './icons.jsx'

export default function ProjectList({ onOpen, agency, onClearAgency }) {
  const list = filterByAgency(agency)
  return (
    <div className="glass">
      <div className="panelhead">
        <h2>
          <span className="k">› </span>프로젝트 목록
          {agency && <span className="filteron">· {agency.label} {list.length}건</span>}
        </h2>
        {agency ? (
          <button className="search clearfilter" onClick={onClearAgency}>✕ 필터 해제</button>
        ) : (
          <div className="search"><SearchIcon /> 프로젝트 / 발주처 / 용어</div>
        )}
      </div>
      {list.map((p) => {
        const n = projects.findIndex((x) => x.id === p.id) + 1
        return (
          <button key={p.id} className="row" onClick={() => onOpen(p.id)}>
            <span className="idx mono">{String(n).padStart(2, '0')}</span>
            <span>
              <span className="pname">{p.name}</span>
              <span className="tagrow">
                {p.tags.map((t) => (
                  <span key={t} className="tg">{t}</span>
                ))}
              </span>
            </span>
            <span className="bud">{p.budgetShort}</span>
            <span className="ag">{p.agency}</span>
            <span className="go">→</span>
          </button>
        )
      })}
    </div>
  )
}
