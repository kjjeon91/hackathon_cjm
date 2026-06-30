# 원문 자료 폴더 (public/originals)

각 사업의 **원문 RFP 파일**을 이 폴더에 넣으면, 해당 사업의 「사업내용」 화면에서
사업명 옆 **[원문 다운로드]** 버튼으로 내려받을 수 있습니다.

## 파일명 규칙 (반드시 이 이름으로 저장)

| 사업 | 넣을 파일명 | 등록 여부 |
|---|---|---|
| 2026 해안침수예상도 제작 | `coast.hwpx` | ✅ 등록됨 |
| 2026 해양위성정보 종합분석·활용지원 | `satellite.pdf` | ⬜ 필요 |
| 연근해 저차해양생태계 먹이망 구조 파악(II) | `ecology.hwpx` | ⬜ 필요 |
| 민군경 AI 기반 해양영상 융복합 분석기술개발 | `ai.pdf` | ✅ 등록됨 |

> 확장자(hwpx/pdf)도 위 표와 동일하게 맞춰주세요. 다른 확장자를 쓰려면
> `src/data/projects.js`의 `download.file` 값을 함께 바꿔야 합니다.

## 넣는 방법
1. 원본 파일을 위 표의 이름으로 바꿔 이 폴더(`ocean-rfp-web/public/originals/`)에 복사
2. `src/data/projects.js`에서 해당 사업의 `download.has`를 `true`로 변경
   (등록되면 버튼이 "원문 준비중" → "원문 다운로드"로 활성화)
3. `bun run build` (또는 dev 서버 자동 반영)

## 동작 원리
- `public/` 폴더의 파일은 빌드 시 그대로 사이트 루트로 복사됩니다.
- 버튼은 `<a href="originals/<파일명>" download="<저장될 한글 파일명>">` 으로 연결됩니다.
- 저장될 파일명(한글)은 `projects.js`의 `download.name`에서 지정합니다.
