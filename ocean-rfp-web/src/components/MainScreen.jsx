import KpiDeck from './KpiDeck.jsx'
import ProjectList from './ProjectList.jsx'
import LlmPanel from './LlmPanel.jsx'

export default function MainScreen({ onOpen }) {
  return (
    <main>
      <div className="head">
        <div>
          <div className="eyebrow">Marine Project Command Deck</div>
          <h1>해양 RFP <em>인텔리전스</em></h1>
          <p>
            분석된 4개 제안요청서의 사업요약·핵심 용어·원문을 새벽 심해를 닮은 글래스
            커맨드덱에서 탐색합니다.
          </p>
        </div>
        <div className="clock">
          <div className="t mono">04:48</div>
          <div className="d mono">PRE-DAWN · 2026.06.30</div>
        </div>
      </div>

      <KpiDeck />

      <div className="layout">
        <ProjectList onOpen={onOpen} />
        <LlmPanel />
      </div>
    </main>
  )
}
