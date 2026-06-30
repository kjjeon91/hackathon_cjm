#!/usr/bin/env bash
# 새 PDF 1개 → 대시보드 자동 반영 원클릭 파이프라인
#   (a) agent1(PDF 파싱) + agent2(하이브리드 추출)
#   (b) build_from_agent2.mjs 로 projects.json 갱신(upsert)
#   (c) vite HMR 로 http://localhost:5173 자동 반영
#
# 사용:
#   ./run_pipeline.sh <input.pdf>
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"

PDF="${1:-}"
if [ -z "$PDF" ]; then
  echo "사용법: $0 <input.pdf>" >&2
  exit 1
fi

# 입력 PDF 절대경로화
if [ ! -f "$PDF" ]; then
  echo "[오류] 파일을 찾을 수 없습니다: $PDF" >&2
  exit 1
fi
PDF_ABS="$(cd "$(dirname "$PDF")" && pwd)/$(basename "$PDF")"

echo "=== [1/2] agent1(PDF 파싱) + agent2(하이브리드 추출) ==="
"$ROOT/src/agent1/run.sh" "$PDF_ABS" --with-agent2

echo ""
echo "=== [2/2] projects.json 갱신 (build_from_agent2.mjs) ==="
node "$ROOT/ocean-rfp-web/scripts/build_from_agent2.mjs"

echo ""
echo "✅ 완료 — 대시보드 데이터가 갱신되었습니다."
echo "   브라우저 http://localhost:5173 에서 새로고침하세요 (이미 떠 있으면 HMR로 자동 반영)."
