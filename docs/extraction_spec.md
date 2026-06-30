# Agent1 추출 정의서 — raw 파일에서 무엇을 뽑을 것인가

> 작성: 정기준 (Agent1 담당) · 근거: `agent1_document_pipeline.md`, `agent2_ai_analysis.md`, `agent3_dashboard_report.md` + 실제 raw 파일 2종 분석
> 원칙: **추출 항목은 소비자(Agent2·3)의 요구에서 역산한다.** Agent1은 "의미"를 해석하지 않고, 텍스트·표·목차·이미지·근거를 **page_no 기준으로 구조화**해 넘긴다. 의미 추출(예산/평가배점 해석)은 Agent2의 몫.

---

## 0. 대상 raw 파일 (data/raw/2026, 읽기전용)

| # | 파일 | 형식 | 분석 결과 |
|---|------|------|-----------|
| ① | `project/제안요청서_2026_해안침수예상도_제작.hwpx` | HWPX | 본문 63,260자 / 표 **108개** / 임베디드 이미지 2(BMP). 텍스트층 깨끗. **OCR 불필요** |
| ② | `rnd/[공고문]…민군경AI기반해양영상융복합분석기술개발(R&D).pdf` | PDF 1.6 | 텍스트 레이어 존재(폰트·Tj 연산자 1만개+), 암호화 없음, 이미지 24. **OCR 불필요** |

> 두 문서 모두 OCR이 필요 없다 → 명세서 B-03(OCR)은 현 샘플에서 **후순위 확정**.

---

## 1. Agent1 산출물 5종 (소비자 계약) → raw 추출 매핑

### (1) `document_pages` — 페이지별 텍스트  〔소비자: agent2 /pages, agent3〕
| 컬럼 | 내용 | HWPX 추출법 | PDF 추출법 |
|---|---|---|---|
| page_no | 페이지 번호(정수) | **§2 페이지 결정 전략** 참조 | PDF 페이지 인덱스 그대로 |
| text(raw) | 페이지 원문 | `Contents/section*.xml`의 `<hp:t>` 런 연결 | PDF 텍스트 추출 라이브러리 |
| cleaned_text | 머리말·꼬리말·중복 제거(B-06) | 반복 라인 제거 | 동일 |
| image_path | 페이지 PNG 경로 | **§3 페이지 이미지 전략** | 렌더링 |

### (2) `tables` — 표 JSON  〔소비자: agent2 /tables — 평가배점표·제출서류표가 여기서 나옴〕
- **이 시스템에서 가장 중요한 추출물.** Agent2의 `extract_evaluation_table`·`extract_submission_documents`가 표를 근거로 동작.
- 컬럼: `table_index, page_no, n_rows, n_cols, table_json(2차원 배열 또는 {headers, rows}), caption(있으면)`
- HWPX: `<hp:tbl>` → `<hp:tr>`(행) → `<hp:tc>`(셀) → 셀 안 `<hp:t>` 텍스트. **셀 병합(rowspan/colspan)** 속성 처리 필요.
- PDF: 표 추출 라이브러리(라인/좌표 기반).
- ⚠️ HWPX에 표 108개 → **표 추출 정확도가 MVP 성패를 좌우.** 특히 평가배점표·제출서류표·보안 별표.

### (3) `document_outline` — 목차 트리  〔소비자: agent2 /outline, agent3 트리뷰〕
- 컬럼: `outline_id, parent_id, level(장/절/항), title, page_no`
- **HWPX는 운이 좋다**: `section0.xml` 표지 뒤에 **목차가 이미 페이지번호와 함께** 들어있음
  (예: `1. 사업 개요 …… 1 / 가. 사업 일반 …… 1 / 마. 기대효과 …… 4 / 2. 사업 추진방안 …… 5`).
  → 이 목차 자체가 **page_no 매핑의 1차 근거**가 된다(§2와 연계).

### (4) `evidence_map` — 원문 근거  〔소비자: agent2의 모든 도구가 evidence_page 필수, agent3 근거표시〕
- **시스템 전체의 핵심 전제.** 누락되면 agent2·3가 무너진다(명세서 15장 핵심 4번).
- 컬럼: `evidence_id, document_id, page_no, block_type(paragraph|table|cell|heading), text_span(원문 문장), char_offset, (좌표 bbox는 MVP 선택)`
- 추출 시 모든 텍스트 블록/표 셀에 evidence_id 부여 → Agent2가 추출한 값(예산 25억)을 이 evidence_id에 연결.
- **MVP 범위**: 페이지 단위 근거(page_no + 원문 문장)까지. 좌표 하이라이트는 2차(agent3 8절도 동일하게 1차는 페이지 단위까지만).

### (5) 페이지 이미지 (`page-image/{no}`)  〔소비자: agent3 원본 뷰어〕
- §3 전략 참조.

---

## 2. ⚠️ 핵심 설계결정 #1 — HWPX의 page_no를 어떻게 정하나

**문제**: Agent2·3의 근거 모델은 전부 **페이지 번호 기반**(`evidence_page: integer`, `/page-image/{no}`). 그런데 **HWPX는 흐름(flow) 문서**라 고정 페이지가 없다(페이지는 렌더링 시점에 결정). 한컴/LibreOffice 렌더러는 이 환경에 **없음**.

**채택 전략 (MVP, 비용순)**:
1. **(권장) 문서 내 페이지 구분자 활용** — HWPX XML의 명시적 페이지나눔(`<hp:pageBreak>`/페이지 정의 컨트롤)이 있으면 그걸로 분절. + **목차의 선언된 페이지번호**((3) outline)로 보정·검증.
2. 페이지 구분자가 불충분하면 → **문단/높이 기반 근사 페이지네이션**(섹션·문단 누적). page_no는 "논리 페이지"로 표기하고 evidence에 근사임을 플래그.
3. 2차 개발: 한컴/LibreOffice로 HWPX→PDF 변환 후 정확 페이지 확정(렌더러 설치 시).

> **PDF(②)는 문제 없음** — 물리 페이지가 그대로 있으므로 page_no = PDF 페이지.

**→ 결정 필요**: 1번(문서 페이지구분자+목차)로 가되, 실제 `section*.xml`에 페이지나눔 컨트롤이 있는지 다음 단계에서 확인 후 확정.

---

## 3. ⚠️ 핵심 설계결정 #2 — 페이지 이미지(PNG)를 어떻게 만드나

**문제**: agent3 원본 뷰어가 `/page-image/{no}` PNG를 요구. 하지만 HWPX/PDF → PNG 렌더러(LibreOffice/pdf렌더 라이브러리)가 **현재 환경에 없음**.

**MVP 전략(비용순)**:
1. **HWPX 임베디드 이미지 직접 추출** — `BinData/image1.bmp, image2.bmp` + `Preview/PrvImage.png`를 그대로 제공(문서 내 도면/그림). 단 이건 "페이지 스냅샷"이 아니라 "삽입 이미지".
2. **PDF 페이지 렌더링** — PDF 렌더 라이브러리 설치 시 페이지→PNG 가능.
3. 페이지 스냅샷이 꼭 필요하면 → 렌더러(LibreOffice/Hancom/pdf렌더) 설치 후 일괄 변환(2차).

> agent3 8절: "1차는 페이지 단위 근거 표시까지" → **MVP는 page-image 없이도 텍스트+목차+근거로 뷰어 구성 가능.** page-image는 환경에 렌더러 깔린 뒤 추가.

---

## 4. 개발환경 선결과제 (현재 환경에 없음)
- `pip`/패키지 매니저, PDF 파싱·표추출·렌더 라이브러리, `unzip`, 한컴/LibreOffice **모두 미설치**.
- **HWPX 텍스트·표·목차·근거 추출 = python stdlib(zipfile/xml)만으로 즉시 가능** → MVP 1순위.
- PDF 텍스트/표·페이지렌더 = **라이브러리 설치 선행 필요**.
- → MVP 착수 순서: **HWPX 파이프라인 먼저(라이브러리 0개)** → 환경에 pip 확보 후 PDF 합류.

---

## 5. 결론 — Agent1이 raw에서 뽑을 항목 확정 리스트
1. **페이지 텍스트**(page_no, raw/cleaned) — HWPX는 stdlib 즉시, PDF는 lib
2. **표 JSON**(page_no, 2D배열, 병합처리) — **최우선 품질목표**, HWPX 108개
3. **목차 트리**(level, title, page_no) — HWPX는 본문 목차 활용
4. **evidence_map**(evidence_id ↔ page_no ↔ 원문문장) — **모든 산출물에 부착, 시스템 전제**
5. **페이지/삽입 이미지** — MVP는 HWPX 임베디드 BMP + PDF 렌더(가능 시), 페이지 스냅샷은 2차

**미해결·결정대기 2건**: ① HWPX 페이지번호 결정 방식(§2) ② 페이지 PNG 생성 방식(§3) — 둘 다 다음 단계(section XML 정밀분석 + 환경 패키지 확보)에서 확정.
