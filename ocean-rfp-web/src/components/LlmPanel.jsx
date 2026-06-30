import { useState } from 'react'

// 표출 전용 목업 — 실제 API 호출 없음. 등록된 예시 질문/답변을 클라이언트에서 토글.
const QA = {
  ai: {
    q: 'AI 관련 사업만 보여줘',
    a: 'AI 관련 사업은 ① 민군경 AI 해양영상 융복합 분석, ② 해안침수예상도의 AI 기상모델 고도화, ③ 저차해양생태계의 AI 기반 변동 분석입니다.',
    ev: '프로젝트명 + 등록 키워드',
  },
  khoa: {
    q: '국립해양조사원 사업은?',
    a: '국립해양조사원 사업은 2026 해안침수예상도 제작과 2026년 해양위성정보 종합분석 및 활용지원입니다.',
    ev: '프로젝트 목록 발주처',
  },
  sat: {
    q: '위성 관련 사업은?',
    a: '위성 관련 사업은 2026년 해양위성정보 종합분석 및 활용지원입니다. 다종위성·위성활용산출물·북극항로 지원·융합 서비스 체계 설계가 핵심입니다.',
    ev: '프로젝트명 및 상세 용어',
  },
  budget: {
    q: '예산이 큰 사업은?',
    a: '예산은 민군경 AI 사업 150억 원(총액), 해안침수예상도 25억, 해양위성정보 19억, 저차해양생태계 5.3억 순입니다.',
    ev: '프로젝트 메타정보',
  },
}
const CHIPS = [
  { key: 'khoa', label: '국립해양조사원 사업' },
  { key: 'sat', label: '위성 관련 사업' },
  { key: 'budget', label: '예산이 큰 사업' },
]

export default function LlmPanel({ count = 4 }) {
  const [active, setActive] = useState('ai')
  const cur = QA[active]
  return (
    <aside className="glass llm">
      <div className="llmhead">
        <h2><span className="dot" />AI 어시스턴트</h2>
        <p>{count}개 사업 목록·메타정보 기준으로 답변합니다.</p>
      </div>
      <div className="lb">
        <div className="bub q">{cur.q}</div>
        <div className="bub a">
          <b>답변</b>
          <br />
          {cur.a}
          <div className="ev">EVIDENCE · {cur.ev}</div>
        </div>
        <div className="chips">
          {CHIPS.map((c) => (
            <button
              key={c.key}
              className="chip"
              onClick={() => setActive(c.key)}
              style={active === c.key ? { borderColor: 'rgba(140,160,255,.6)' } : undefined}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className="askbar">
          <div className="askin">무엇이든 물어보세요…</div>
          <button className="askbtn">↑</button>
        </div>
      </div>
    </aside>
  )
}
