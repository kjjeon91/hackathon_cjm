import { projects, agencyColor } from '../data/projects.js'
import { SearchIcon } from './icons.jsx'

export default function ProjectList({ list, onOpen, agencies = [], onClearAgency, query, setQuery }) {
  return (
    <div className="glass">
      <div className="panelhead">
        <h2>
          <span className="k">› </span>프로젝트 목록
          {agencies.length > 0 && (
            <span className="filteron">· {agencies.map((a) => a.label).join(', ')}</span>
          )}
          <span className="cnt">{list.length}건</span>
        </h2>
        <div className="searchwrap">
          {agencies.length > 0 && (
            <button className="clearfilter" onClick={onClearAgency} title="기관 필터 해제">✕ 기관</button>
          )}
          <div className="search">
            <SearchIcon />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="프로젝트 / 발주처 / 용어"
            />
            {query && (
              <button className="search-clear" onClick={() => setQuery('')} title="검색어 지우기">✕</button>
            )}
          </div>
        </div>
      </div>

      {list.length === 0 ? (
        <div className="empty">검색 결과가 없습니다.</div>
      ) : (
        list.map((p) => {
          const n = projects.findIndex((x) => x.id === p.id) + 1
          const c = agencyColor(p.agency)
          return (
            <button
              key={p.id}
              className="row"
              onClick={() => onOpen(p.id)}
              style={{ boxShadow: `inset 4px 0 0 ${c}` }}
            >
              <span className="idx mono" style={{ color: c }}>{String(n).padStart(2, '0')}</span>
              <span>
                <span className="pname">{p.name}</span>
                <span className="tagrow">
                  {p.tags.map((t) => (
                    <span key={t} className="tg">{t}</span>
                  ))}
                </span>
              </span>
              <span className="bud">{p.budgetShort}</span>
              <span className="ag">
                <span className="ag-dot" style={{ background: c }} />
                {p.agency}
              </span>
              <span className="go">→</span>
            </button>
          )
        })
      )}
    </div>
  )
}
