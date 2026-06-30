import { AGENCIES } from '../data/projects.js'
import logo from '../assets/geosr-logo.png'

export default function StatusBar({ agencies = [], onAgency }) {
  const isOn = (a) => agencies.some((x) => x.label === a.label)
  return (
    <header className="statusbar">
      <div className="statusbar-inner">
        <div className="sb-l">
          <img src={logo} alt="GeoSR · GeoSystem Research Corporation" className="brand-logo" />
        </div>
        <div className="sb-r">
          <div className="agencies">
            {AGENCIES.map((a, i) => (
              <span key={a.label}>
                {i > 0 && <span className="sep">·</span>}
                <button
                  className={`agency-btn${isOn(a) ? ' on' : ''}`}
                  onClick={() => onAgency(a)}
                  title={`${a.label} 사업 필터 (다중 선택 가능)`}
                  style={
                    isOn(a)
                      ? { background: a.color, borderColor: a.color, color: '#070b16' }
                      : { color: a.color }
                  }
                >
                  <span className="agency-dot" style={{ background: a.color }} />
                  {a.label}
                </button>
              </span>
            ))}
          </div>
          <span className="online">SYSTEM ONLINE</span>
        </div>
      </div>
    </header>
  )
}
