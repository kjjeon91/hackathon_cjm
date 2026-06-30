import { kpis } from '../data/projects.js'

const ITEMS = [
  { lab: 'Analyzed', v: kpis.count, unit: ' 사업', hi: true },
  { lab: 'Total Budget', v: kpis.budgetTotal, mono: true },
  { lab: 'Agencies', v: kpis.agencies, unit: ' 기관' },
  { lab: 'Key Terms', v: kpis.terms, unit: ' 용어' },
]

export default function KpiDeck() {
  return (
    <div className="deck">
      {ITEMS.map((it) => (
        <div key={it.lab} className={`glass kpi${it.hi ? ' hi' : ''}`}>
          <div className="lab">{it.lab}</div>
          <div className="v">
            {it.v}
            {it.unit && <small>{it.unit}</small>}
          </div>
        </div>
      ))}
    </div>
  )
}
