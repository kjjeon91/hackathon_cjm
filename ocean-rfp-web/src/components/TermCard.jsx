export default function TermCard({ term }) {
  return (
    <div className="glass term-card">
      <div className="term-head">
        <b>{term.term}</b>
        <span className="level">중요 용어</span>
      </div>
      <div className="term-body">
        <div className="def"><strong>전문 정의</strong>{term.proDef}</div>
        <div className="def"><strong>쉽게 이해하기</strong>{term.easyDef}</div>
        <div className="def"><strong>과업에서 보는 관점</strong>{term.taskView}</div>
      </div>
    </div>
  )
}
