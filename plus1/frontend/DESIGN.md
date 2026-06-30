# DESIGN.md — RFP Decision Intelligence v9 디자인 시스템

정부·공공 R&D 수주검토용 **엔터프라이즈 SaaS 대시보드**. 정보 밀도가 높고 가독성을 최우선으로 하며,
refero.design devtools 계열의 깔끔한 톤을 따른다. plus1.html(자동 결과보고서 v9)의 팔레트와 레이더 기하를 계승한다.

## 1. 컨셉

- **신뢰·정밀·기관성(institutional)**: 결재 상신용 의사결정 도구. 화려함보다 명료함.
- 네이비→블루 그라데이션으로 권위를, 흰 카드 + 옅은 청회색 캔버스로 가독성을 확보.
- green/amber/red는 장식이 아니라 **의사결정 시맨틱**(참여/조건부/보류)으로만 사용.

## 2. 색상 팔레트 (Tailwind `theme.extend.colors`)

| 토큰 | HEX | 용도 |
| --- | --- | --- |
| `navy` | `#061627` | 헤더 그라데이션 시작, 제목 |
| `blue` | `#0b4ea2` | 주요 강조, 섹션 헤딩, 액션 |
| `line` | `#dbe7f4` | 보더, 구분선 |
| `ink` | `#0f172a` | 본문 텍스트 |
| `muted` | `#64748b` | 보조 텍스트 |
| `canvas` | `#eef5fb` | 페이지 배경 |
| `green` | `#16a34a` | 참여/양호/높음, 종합 레이더 |
| `amber` | `#f59e0b` | 조건부/보통, 행정부 레이더(`#d97706`) |
| `red` | `#dc2626` | 보류/보완필요 |
| `role-dept` | `#2563eb` | 부서장 레이더 |
| `role-admin` | `#d97706` | 행정부 레이더 |
| `role-exec` | `#7c3aed` | 부문장 레이더 |

## 3. 타이포그래피

- **폰트**: Pretendard (CDN) → `Pretendard, "Noto Sans KR", system-ui, sans-serif`.
- **가독성 하한 12px**: 모든 텍스트는 12px 이상. 레이더 축 라벨도 12px.

| 토큰 | px | 용도 |
| --- | --- | --- |
| `text-xs` | 12 | 메타·캡션·축 라벨 (하한) |
| `text-sm` | 13 | 라벨·보조 |
| `text-base` | 14 | 본문 기본 |
| `text-md` | 15 | 강조 본문 |
| `text-lg` | 17 | 카드 제목 |
| `text-xl` | 20 | 섹션 제목 |
| `text-2xl` | 24 | 강조 수치 |
| `text-3xl` | 30 | 보고서 H1 |

## 4. 간격 · 형태

- 카드: `rounded-3xl`(24px) + `border-line` + `shadow-card`. 내부 패딩 `p-6`.
- 버튼/입력/뱃지: `rounded-2xl`(16px) / `rounded-full`.
- 그림자: `shadow-card`(은은), `shadow-float`(보고서), `shadow-header`(네이비 톤).

## 5. 컴포넌트 규칙 (`src/components/ui`)

- `Card` / `CardHeader` / `CardBody` — 아이콘+제목+설명+액션 슬롯.
- `Button` — variant(primary/secondary/ghost/outline) × size(sm/md/lg). primary는 navy→blue 그라데이션.
- `Badge` — tone(green/amber/red/blue/neutral), `judgementTone()`로 판단값 자동 매핑.
- `Table` — 라운드 보더 래퍼, `KeyTh`로 옅은 파랑 라벨 셀.
- `Field` + `Input` — label+input 묶음.
- `Tabs` / `Stepper` — 활성 단계 navy→blue.
- `RadarChart` — plus1.html SVG 기하 일반화(중심 170,150 / 반지름 105 / 5격자 / 6축 / 0~5점 매핑). props: `axes[]`, `scores[]`, `color`.

## 6. 모션

- 고임팩트 순간에만 집중: 페이지 진입 staggered `fade-up`(Reveal, delay 80ms 간격), 레이더 폴리곤 값 변경 시 `cubic-bezier(.16,1,.3,1)` 트랜지션, 버튼 hover brightness.
- 인쇄 보고서는 애니메이션 비활성(`animate={false}`).

## 7. 반응형 브레이크포인트

- 컨테이너 `max-w-shell`(1440) / 보고서 `max-w-report`(1050).
- 그리드: `grid-cols-1 md:grid-cols-2 xl:grid-cols-3` 패턴.
- Stepper: `md` 이상 가로 스텝퍼, 미만은 컴팩트 셀렉트.
- 레이더 `width:100%` 유지 → QHD(2560)·FHD(1920)·노트북(1366)·태블릿 전 해상도 비파괴.
- 헤더/푸터 네비 sticky, 본문만 스크롤.

## 8. 접근성

- 레이더 `role="img"` + `aria-label`로 수치 음성화.
- Stepper `aria-current="step"`, 슬라이더 `aria-valuetext`.
- `focus-ring` 유틸로 키보드 포커스 가시화. 색 대비 WCAG AA 목표.
