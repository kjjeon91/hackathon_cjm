# 해양 RFP 인텔리전스 (Ocean RFP Intelligence)

분석된 4개 해양 제안요청서(RFP)를 웹으로 **표출하는 React 앱**.
디자인: **Dimension** 스타일(pre-dawn glassmorphic command deck).

## 성격
- **표출 전용(read-only)** — 검색·LLM은 시각적 목업(실제 API 호출 없음)
- **DB 없음** — 분석된 MD를 정적 데이터(`src/data/projects.json`)로 내장
- 3화면 구조: 목록(Page1) → 사업요약+용어해설(Page2) → 원본 전문(Page3)

## 실행 (Bun)
```bash
bun install
bun run dev      # 개발 서버 (http://localhost:5173)
bun run build    # 정적 빌드 → dist/
bun run preview  # 빌드 결과 미리보기
```
> Node 미설치 환경이라 **bun** 사용. npm/pnpm/yarn도 동일 스크립트로 동작.

## 데이터 생성(파싱)
원본 대시보드 MD가 갱신되면 재파싱:
```bash
bun scripts/parse_md.mjs   # ../agent3_dashboard_report_4개파일반영_v13.md → src/data/projects.json
```

## 딥링크
- `?screen=summary&id=<id>` / `?screen=original&id=<id>`
- id: `coast` · `satellite` · `ecology` · `ai`

## 구조
```
src/
├─ App.jsx                 # 상태 기반 3화면 라우팅
├─ data/
│  ├─ projects.json        # 파싱된 원본 데이터
│  └─ projects.js          # 데이터 접근 + 표시용 보강(태그·KPI)
├─ styles/dimension.css    # Dimension 전역 스타일
└─ components/
   ├─ StatusBar.jsx  KpiDeck.jsx  ProjectList.jsx  LlmPanel.jsx
   ├─ SummaryScreen.jsx  TermCard.jsx
   ├─ OriginalScreen.jsx  MainScreen.jsx  icons.jsx
```

## 후속 (Phase 8)
디자인 리팩토링 — Tailwind/shadcn 토큰화, 모션 고도화, 다른 스타일 실험.
시안 스크린샷: `../output/design_samples/`
