# RFP Decision Intelligence v9 — 수주검토 의사결정 플랫폼 (Frontend)

정부·공공 R&D **수주검토 의사결정 플랫폼**의 React 프론트엔드. 공고문/RFP·내부 위험요소를 입력받아
역할별(부서장·행정부·부문장) 판단을 레이더 차트로 시각화하고, 결재 상신용 **자동 결과보고서**를 생성한다.

## 기술 스택

- Vite + React 18 + TypeScript
- Tailwind CSS v3
- react-router-dom (라우팅)
- 상태: React Context (`src/context/AppContext.tsx`)
- 차트: 외부 라이브러리 없이 직접 구현한 SVG `RadarChart`

## 설치 · 실행

```bash
cd frontend
npm install
npm run dev      # http://localhost:5173
```

## 빌드

```bash
npm run build    # tsc -b && vite build → dist/
npm run preview  # 빌드 결과 미리보기
```

## 화면 구성

상단 가로 **Stepper**로 6단계 + 종합평가 이동(클릭 가능). 입력값은 Context로 단계 간 공유.

| 경로 | 화면 |
| --- | --- |
| `/upload` | 1. 파일 업로드 · 평가자/결재 검토자 지정 · 업무 흐름 안내 |
| `/overview` | 2. 사업개요 확인 + 주요 사업내용 |
| `/dept` | 3. 부서장 판단 (6축 0~5점 → 실시간 레이더 파랑) |
| `/admin` | 4. 행정부 판단 (레이더 amber) |
| `/exec` | 5. 부문장 판단 (레이더 보라) |
| `/report-setup` | 6. 전체예산 × 비율 → 사업부서 예산 자동 산정 |
| `/summary` | 종합평가 (종합 레이더 green + 결과 요약) |
| `/report` | **결과보고서**(별도 라우트, 10개 섹션, 인쇄/PDF) |

## 데이터 연동 메모

- 데모 데이터는 `src/data/seed.ts`(plus1.html v9 값)에서 자체 완결로 제공.
- 파일 업로드는 현재 **mock**(메타데이터만 보관).
- 종합 평가 점수는 plus1.html 권위값 사용.
- **추후**: 시드/업로드/종합산정을 `src/db/query.py` API 응답으로 교체(코드 내 주석 표시).

## 디자인 시스템

`DESIGN.md` 참고 — 팔레트(navy/blue 계열), 타이포(Pretendard, 12px 하한), 컴포넌트 규칙, 반응형 브레이크포인트.
QHD(2560)·FHD(1920)·노트북(1366)·태블릿 전 해상도 대응.
