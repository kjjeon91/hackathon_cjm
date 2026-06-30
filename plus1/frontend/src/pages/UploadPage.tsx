import { useRef, useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Field, Input } from '@/components/ui/Field';
import { Reveal } from '@/components/Reveal';
import { ApprovalLine } from '@/components/ApprovalLine';
import { IconUpload, IconUsers, IconFile, IconX } from '@/components/Icons';
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
          className={`flex w-full flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed py-14 text-center transition-colors focus-ring ${
            dragging ? 'border-blue bg-blue/5' : 'border-line bg-canvas/50 hover:border-blue/40'
          }`}
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue/10 text-blue">
            <IconUpload width={30} height={30} />
          </span>
          <span className="space-y-1">
            <span className="block text-lg font-bold text-ink">클릭 또는 드래그하여 업로드</span>
            <span className="block text-sm text-muted">{hint}</span>
          </span>
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
  const { rfpFile, setRfpFile, reviewers, setReviewers } = useApp();

  const approvalNodes = [
    {
      step: '1차',
      label: '부서장',
      name: reviewers.dept,
      initial: reviewers.dept.charAt(0),
      status: 'active' as const,
    },
    {
      step: '2차',
      label: '행정부',
      name: reviewers.admin,
      initial: reviewers.admin.charAt(0),
      status: 'pending' as const,
    },
    {
      step: '3차',
      label: '부문장',
      name: reviewers.exec,
      initial: reviewers.exec.charAt(0),
      status: 'pending' as const,
    },
    {
      step: '최종',
      label: '대표',
      name: '대표이사',
      initial: '대',
      status: 'pending' as const,
    },
  ];

  return (
    <div className="space-y-6">
      <Reveal>
        <Card>
          <CardHeader
            icon={<IconUpload />}
            title="공고문 / RFP 업로드"
            desc="공고문 또는 RFP 파일을 업로드합니다. (데모: 업로드는 mock 처리)"
          />
          <CardBody>
            <Dropzone
              label="공고문 / RFP"
              accept=".pdf,.hwp,.hwpx,.docx"
              file={rfpFile}
              onFile={setRfpFile}
              hint="PDF · HWP · HWPX · DOCX 지원 — 드래그 또는 클릭하여 선택"
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
            {/* 결재 라인 시각화 */}
            <ApprovalLine nodes={approvalNodes} />

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
          </CardBody>
        </Card>
      </Reveal>
    </div>
  );
}
