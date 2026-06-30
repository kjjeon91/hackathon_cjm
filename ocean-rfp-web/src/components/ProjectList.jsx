import { projects } from '../data/projects.js'
import { SearchIcon } from './icons.jsx'

export default function ProjectList({ onOpen }) {
  return (
    <div className="glass">
      <div className="panelhead">
        <h2><span className="k">› </span>프로젝트 목록</h2>
        <div className="search">
          <SearchIcon /> 프로젝트 / 발주처 / 용어
        </div>
      </div>
      {projects.map((p, i) => (
        <button key={p.id} className="row" onClick={() => onOpen(p.id)}>
          <span className="idx mono">{String(i + 1).padStart(2, '0')}</span>
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
      ))}
    </div>
  )
}
