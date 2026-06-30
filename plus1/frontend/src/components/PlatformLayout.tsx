import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Stepper, type Step } from '@/components/ui/Stepper';
import { Button } from '@/components/ui/Button';
import { IconArrowLeft, IconArrowRight, IconRadar } from '@/components/Icons';
import type { ReactNode } from 'react';

export const STEPS: (Step & { path: string })[] = [
  { key: 'upload', label: '파일 업로드 · 평가자 지정', short: '업로드·평가자', path: '/upload' },
  { key: 'overview', label: '사업개요 확인', short: '사업개요', path: '/overview' },
  { key: 'dept', label: '부서장 판단', short: '부서장', path: '/dept' },
  { key: 'admin', label: '행정부 판단', short: '행정부', path: '/admin' },
  { key: 'exec', label: '부문장 판단', short: '부문장', path: '/exec' },
  { key: 'summary', label: '결과보고서 생성', short: '결과보고서', path: '/summary' },
];

export function PlatformLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();

  const current = useMemo(() => {
    const idx = STEPS.findIndex((s) => s.path === location.pathname);
    return idx === -1 ? 0 : idx;
  }, [location.pathname]);

  const go = (idx: number) => {
    const clamped = Math.max(0, Math.min(STEPS.length - 1, idx));
    navigate(STEPS[clamped].path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isLast = current === STEPS.length - 1;

  return (
    <div className="min-h-screen bg-canvas">
      {/* 상단 헤더 */}
      <header className="sticky top-0 z-30 border-b border-line/80 bg-gradient-to-r from-navy to-blue text-white shadow-header">
        <div className="mx-auto flex max-w-shell items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25 backdrop-blur">
              <IconRadar width={22} height={22} />
            </div>
            <div className="leading-tight">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                RFP Decision Intelligence v9
              </p>
              <h1 className="text-md font-bold tracking-tight sm:text-lg">
                수주검토 의사결정 플랫폼
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* 스텝퍼 바 */}
      <div className="sticky top-[64px] z-20 border-b border-line bg-canvas/85 backdrop-blur">
        <div className="mx-auto max-w-shell px-4 py-3 sm:px-6 lg:px-8">
          <Stepper steps={STEPS} current={current} onSelect={go} />
        </div>
      </div>

      {/* 본문 */}
      <main className="mx-auto max-w-shell px-4 py-7 sm:px-6 lg:px-8" key={location.pathname}>
        {children}
      </main>

      {/* 하단 네비게이션 */}
      <footer className="sticky bottom-0 z-20 border-t border-line bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-shell items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <Button variant="outline" size="md" onClick={() => go(current - 1)} disabled={current === 0}>
            <IconArrowLeft width={16} height={16} />
            이전 단계
          </Button>
          <span className="hidden text-sm font-semibold text-muted sm:block">
            {current + 1} / {STEPS.length} · {STEPS[current].label}
          </span>
          {isLast ? (
            <Button size="md" onClick={() => navigate('/report')}>
              결과보고서 생성
              <IconArrowRight width={16} height={16} />
            </Button>
          ) : (
            <Button size="md" onClick={() => go(current + 1)}>
              다음 단계
              <IconArrowRight width={16} height={16} />
            </Button>
          )}
        </div>
      </footer>
    </div>
  );
}
