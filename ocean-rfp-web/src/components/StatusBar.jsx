import { WaveMark } from './icons.jsx'

export default function StatusBar() {
  return (
    <div className="statusbar">
      <div className="sb-l">
        <div className="logo">
          <span className="lmark"><WaveMark /></span>
          OCEAN RFP · INTELLIGENCE
        </div>
      </div>
      <div className="sb-r">
        <span className="mono">국립해양조사원 · 수산과학원 · KIMST</span>
        <span className="online">SYSTEM ONLINE</span>
      </div>
    </div>
  )
}
