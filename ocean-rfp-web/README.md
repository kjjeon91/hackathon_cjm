# 예보사업부 RFP 통합 대시보드 (ocean-rfp-web)

분석된 4개 해양 제안요청서(RFP)를 한 화면에서 탐색하는 **React 표출 대시보드**.
디자인: **라이트 테마**(DESIGN.md 기준 cord 스타일 — 흰 캔버스 · 미드나잇 네이비 `#0b3658` · 시그널 블루 `#4e9ad9` · Figtree) · **GeoSR** 브랜딩.

## 성격
- **표출 전용(read-only)** — 검색·필터는 실제 동작, AI 어시스턴트는 예시 질의 목업
- **DB 없음** — 분석된 원문 MD를 정적 데이터(`src/data/projects.json`)로 내장
- 3화면 구조: 목록(Page1) → 사업요약+용어해설(Page2) → 원문 사업내용(Page3)

## 주요 기능
- **프로젝트 목록** — 발주처 색상 구분, 데이터 증가 대비 내부 스크롤
- **발주처 다중 필터** — 여러 기관 동시 선택(재클릭 해제), KPI·목록·AI 안내 실시간 연동
- **검색** — 프로젝트·발주처·용어 검색(Enter/돋보기 실행 시 적용) + **↺ 초기화**
- **KPI 덱** — 사업 수·예산 합계·기관 수·용어 수 (필터 연동)
- **요약/용어** — 사업요약·대상·산출물·중요정보 카드 + 용어해설 3단(전문정의·쉽게·과업관점)
- **원문 사업내용** — 대제목/중제목/항목/비고 구조 구분 렌더링, 추출 깨진 표는 "원문 표" 박스로 분리
- **원문 다운로드** — 사업명 옆 버튼으로 원본 RFP 파일(원본 파일명 그대로) 내려받기
- **실시간 시계 · 상태 표시 · 페이지 전환 애니메이션**

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

## 원문 파일 (다운로드)
`public/originals/`에 **원본 파일명 그대로** RFP 파일을 두고, `src/data/projects.js`의 `download.file`을 그 파일명으로 지정하면 다운로드 버튼이 활성화됩니다. (상세: `public/originals/README.md`)

## 딥링크
- `?screen=summary&id=<id>` / `?screen=original&id=<id>` / `?agency=<발주처명[,발주처명]>`
- id: `coast` · `satellite` · `ecology` · `ai`

## 구조
```
public/originals/          # 원문 RFP 파일(원본명) + 등록 규칙 README
scripts/
├─ parse_md.mjs            # 원문 MD → projects.json 파싱
└─ crop_logo.mjs           # GeoSR 로고 크롭(헤더용)
src/
├─ App.jsx                 # 상태 기반 3화면 라우팅 + 전환 애니메이션
├─ data/
│  ├─ projects.json        # 파싱된 원문 데이터(정적)
│  └─ projects.js          # 데이터 접근 + 보강(태그·KPI·발주처 색상·다운로드 메타)
├─ styles/dimension.css    # 전역 스타일(라이트 디자인 토큰) ※ 파일명은 유지
└─ components/
   ├─ StatusBar.jsx  KpiDeck.jsx  ProjectList.jsx  LlmPanel.jsx
   ├─ SummaryScreen.jsx  TermCard.jsx
   ├─ OriginalScreen.jsx  MainScreen.jsx  icons.jsx
```

## 후속
- 정적 데이터(`projects.json`) 대신 DB/API 연동(`projects.js`만 교체) 시 실시간 데이터화 가능
- 시안·스크린샷: `../output/design_samples/`
