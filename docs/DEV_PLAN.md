# 해양 RFP 인텔리전스 — React 개발 계획 (Phase별)

## 0. 개요 / 확정 사항

| 항목 | 내용 |
|---|---|
| 목표 | 분석된 4개 해양 RFP를 **웹으로 표출하는 React 앱** |
| 성격 | **표출 전용(read-only)** — 검색·LLM 등은 시각적 목업, 실제 호출 X |
| 데이터 | **DB 없음.** `agent3_dashboard_report_4개파일반영_v13.md` 내용을 **정적 데이터(JSON/JS)**로 내장 |
| 구조 기준 | 기존 `RFP_Ocean_..._v13.html`의 **3화면 구조 그대로** (목록 → 요약+용어 → 원본) |
| 디자인 | **Dimension 스타일**(pre-dawn glassmorphic command deck) — 검증 시안 `output/design_samples/dimension_page1.png` |
| 빌드 환경 | **Bun + Vite + React** (Node 미설치, bun 사용). npm 레지스트리 연결 확인됨 |
| 디자인 방침 | **기능 먼저 완성 → 디자인 리팩토링은 후속 Phase**. 초기엔 검증된 Dimension CSS를 전역 스타일로 이식 |

### 대상 4개 프로젝트 (id)
1. `coast` — 2026 해안침수예상도 제작 (국립해양조사원, 25억)
2. `satellite` — 2026 해양위성정보 종합분석·활용지원 (국립해양조사원, 19억)
3. `ecology` — 연근해 저차해양생태계 먹이망 구조 파악(II) (국립수산과학원, 5.3억)
4. `ai` — 민군경 AI 기반 해양영상 융복합 분석기술개발 (해수부/KIMST, 150억)

### 각 프로젝트 화면 (3)
- **Page1** 프로젝트 목록 + KPI 덱 + LLM 패널(목업)
- **Page2** 사업요약 / 대상지역 / 주요산출물 / 중요정보 / 용어해설 카드
- **Page3** 원본 사업내용 전문 + 주요 산출물 + 중요정보

---

## Phase 1 — 프로젝트 세팅
- **작업**: Bun으로 Vite+React 프로젝트 생성(`ocean-rfp-web/`), 폴더 구조 확정, dev 서버 기동 확인, 한글 폰트(Pretendard/Noto) 설정
- **산출물**: 실행 가능한 빈 React 앱, `package.json`, `vite.config.js`
- **완료 기준(DoD)**: `bun run dev` 기동 → 브라우저에서 빈 화면 정상 렌더, 빌드(`bun run build`) 성공

## Phase 2 — 데이터 레이어
- **작업**: agent3 MD를 파싱/정리해 `src/data/projects.js` 작성. 프로젝트별 필드:
  `id, name, agency, docType, budget, period, section, summary[], areas[], deliverables[], keyInfo[], terms[{term, proDef, easyDef, taskView}], original(원문 전문)`
- **산출물**: 4개 프로젝트 전체 콘텐츠가 담긴 정적 데이터 모듈
- **DoD**: 4개 × 모든 필드 누락 없이 채워짐, 용어해설/원문 텍스트가 원본과 일치

## Phase 3 — 화면 골격 & 공통 레이아웃
- **작업**: `App.jsx`에 상태 기반 라우팅(`screen`, `activeProject`), 화면 전환 함수(showMain/showSummary/showOriginal), Dimension 배경·상태바·전역 CSS(`src/styles/dimension.css`) 이식
- **산출물**: 3화면 뼈대 + 공통 헤더/배경
- **DoD**: 목록↔요약↔원문 전환 동작, Dimension 배경·글래스 톤 적용

## Phase 4 — Page1 (목록 + LLM 패널)
- **작업**: `KpiDeck`, `ProjectList`(클릭→요약), `LlmPanel`(목업: 칩/버블, 클릭 시 정적 응답 토글 정도)
- **DoD**: 4개 프로젝트 행 표출, 행 클릭 시 해당 요약 화면 이동, 검증 시안과 동일한 룩

## Phase 5 — Page2 (요약 + 용어해설)
- **작업**: `SummaryView`(dhero 메타, 사업요약/대상/산출물/중요정보 카드), `TermCard`(전문정의/쉽게/과업관점 3단) 그리드
- **DoD**: 4개 프로젝트 각각 요약·용어 카드 정상 표출, "원본 전체 보기"·"목록으로" 동작

## Phase 6 — Page3 (원본 전문)
- **작업**: `OriginalView`(원문 전문 스크롤 영역 + 산출물/중요정보), 표출 구간 라벨
- **DoD**: 4개 프로젝트 원문 전문 표출, 스크롤·가독성 확보, 화면 전환 동작

## Phase 7 — 마감 (반응형·디테일·검증)
- **작업**: 반응형(좁은 화면 1열), 폰트/아이콘(SVG) 정리, 화면 전환 스크롤·일관성, headless 스크린샷으로 3화면 QA
- **산출물**: 3화면 스크린샷 `output/design_samples/`
- **DoD**: 4개 프로젝트 × 3화면 = 12뷰 깨짐 없이 표출, `bun run build` 성공

## Phase 8 (후속) — 디자인 리팩토링
- **작업**: Tailwind/shadcn 도입 검토, 컴포넌트 스타일 토큰화, refero 다른 스타일 실험(Authkit/Mercury 등), 모션/디테일 고도화
- **성격**: 기능 완성 후 별도 진행

---

## 공통 규칙 (모든 Phase 적용)
- 각 Phase 완료 시 **`submit/PROCESS_LOG.md`에 항목 1개 append** (목표/시킨 것/결과 — 해커톤 채점 근거)
- 산출물 수정 시각을 **`submit/evidence/timestamps.txt`**에 정리
- 콘텐츠는 원본과 **동일하게 유지**(표출 전용)

## 폴더 구조(안)
```
ocean-rfp-web/
├─ index.html
├─ package.json / vite.config.js
├─ src/
│  ├─ main.jsx
│  ├─ App.jsx                ← 화면 전환(useState)
│  ├─ data/projects.js       ← 4개 프로젝트 정적 데이터 (DB 아님)
│  ├─ styles/dimension.css   ← Dimension 전역 스타일
│  └─ components/
│     ├─ StatusBar.jsx
│     ├─ KpiDeck.jsx
│     ├─ ProjectList.jsx
│     ├─ LlmPanel.jsx
│     ├─ SummaryView.jsx
│     ├─ TermCard.jsx
│     └─ OriginalView.jsx
```
