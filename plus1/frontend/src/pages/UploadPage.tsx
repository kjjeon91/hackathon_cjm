import { useRef, useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Field, Input } from '@/components/ui/Field';
import { Reveal } from '@/components/Reveal';
import { IconUpload, IconUsers, IconFile, IconX, IconArrowRight } from '@/components/Icons';
import { formatKRW } from '@/lib/utils';

interface DropzoneProps {
  label: string;
  accept: string;
  file: { name: string; size: number } | null;
  onFile: (f: { name: string; size: number } | null) => void;
  hint: string;
}

function Dropzone({ label, accept, file, onFile, hint }: DropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  // NOTE: 실제 업로드는 mock — 파일 메타데이터만 보관. 추후 src/db/query.py 업로드 API로 교체.
  const pick = (f: File | undefined) => {
    if (f) onFile({ name: f.name, size: f.size });
  };

  return (
    <div>
      <p className="mb-1.5 text-sm font-semibold text-navy">{label}</p>
      {file ? (
        <div className="flex items-center gap-3 rounded-2xl border border-blue/30 bg-blue/5 p-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue/10 text-blue">
            <IconFile width={20} height={20} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-semibold text-ink">{file.name}</p>
            <p className="text-xs text-muted">{formatKRW(file.size / 1024)} KB · 업로드 완료</p>
          </div>
          <button
            onClick={() => onFile(null)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-red/10 hover:text-red focus-ring"
            aria-label={`${label} 제거`}
          >
            <IconX width={16} height={16} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            pick(e.dataTransfer.files?.[0]);
          }}
          className={`flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-7 text-center transition-colors focus-ring ${
            dragging ? 'border-blue bg-blue/5' : 'border-line bg-canvas/50 hover:border-blue/40'
          }`}
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue/10 text-blue">
            <IconUpload width={22} height={22} />
          </span>
          <span className="text-base font-semibold text-ink">클릭 또는 드래그하여 업로드</span>
          <span className="text-xs text-muted">{hint}</span>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => pick(e.target.files?.[0])}
      />
    </div>
  );
}

export function UploadPage() {
  const { rfpFile, riskFile, setRfpFile, setRiskFile, reviewers, setReviewers } = useApp();

  return (
    <div className="space-y-6">
      <Reveal>
        <Card>
          <CardHeader
            icon={<IconUpload />}
            title="공고문 · 내부 위험요소 업로드"
            desc="공고문/RFP와 내부 위험요소 한글파일을 업로드합니다. (데모: 업로드는 mock 처리)"
          />
          <CardBody className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Dropzone
              label="공고문 / RFP"
              accept=".pdf,.hwp,.hwpx,.docx"
              file={rfpFile}
              onFile={setRfpFile}
              hint="PDF · HWP · DOCX 지원"
            />
            <Dropzone
              label="내부 위험요소 (한글파일)"
              accept=".hwp,.hwpx,.docx,.pdf"
              file={riskFile}
              onFile={setRiskFile}
              hint="HWP · HWPX 지원"
            />
          </CardBody>
        </Card>
      </Reveal>

      <Reveal delay={80}>
        <Card>
          <CardHeader
            icon={<IconUsers />}
            title="평가자 · 결재 검토자 지정"
            desc="역할별 평가자와 결재 검토자를 지정합니다. 기본값은 v9 표준 라인업입니다."
          />
          <CardBody className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Field label="부서장 / 최초 평가자">
                <Input
                  value={reviewers.dept}
                  onChange={(e) => setReviewers({ ...reviewers, dept: e.target.value })}
                />
              </Field>
              <Field label="행정부 검토자">
                <Input
                  value={reviewers.admin}
                  onChange={(e) => setReviewers({ ...reviewers, admin: e.target.value })}
                />
              </Field>
              <Field label="부문장 검토자">
                <Input
                  value={reviewers.exec}
                  onChange={(e) => setReviewers({ ...reviewers, exec: e.target.value })}
                />
              </Field>
            </div>

            {/* 업무 흐름 안내 */}
            <div className="rounded-2xl border border-blue/20 bg-blue/5 p-5">
              <p className="mb-3 text-sm font-bold text-blue">업무 흐름</p>
              <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-navy">
                {['부서장 평가', '행정부 평가 요청', '부문장 평가 요청', '자동 결과보고서 생성', '결재 상신'].map(
                  (step, i, arr) => (
                    <span key={step} className="flex items-center gap-2">
                      <span className="rounded-xl bg-white px-3 py-1.5 ring-1 ring-line">{step}</span>
                      {i < arr.length - 1 && <IconArrowRight width={16} height={16} className="text-muted" />}
                    </span>
                  ),
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      </Reveal>
    </div>
  );
}
