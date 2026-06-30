import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Field, Input } from '@/components/ui/Field';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/Reveal';
import { IconWallet, IconArrowRight } from '@/components/Icons';
import { formatKRW } from '@/lib/utils';

export function ReportSetupPage() {
  const navigate = useNavigate();
  const { totalBudget, budgetRatio, departmentBudget, setTotalBudget, setBudgetRatio } = useApp();

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <Reveal>
        <Card>
          <CardHeader
            icon={<IconWallet />}
            title="사업부서 예산 산정"
            desc="전체 사업 예산 × 사업부서 예산 비율(%)로 사업부서 예산을 자동 산정합니다. (v7)"
          />
          <CardBody className="space-y-5">
            <Field label="전체 사업 예산 (원)" hint="천단위 콤마는 자동 처리됩니다.">
              <Input
                inputMode="numeric"
                value={formatKRW(totalBudget)}
                onChange={(e) => {
                  const n = Number(e.target.value.replace(/[^0-9]/g, ''));
                  setTotalBudget(Number.isFinite(n) ? n : 0);
                }}
              />
            </Field>
            <Field label="사업부서 예산 비율 (%)">
              <Input
                inputMode="decimal"
                value={budgetRatio}
                onChange={(e) => {
                  const n = Number(e.target.value.replace(/[^0-9.]/g, ''));
                  setBudgetRatio(Number.isFinite(n) ? n : 0);
                }}
              />
            </Field>
          </CardBody>
        </Card>
      </Reveal>

      <Reveal delay={80}>
        <Card className="overflow-hidden">
          <CardHeader title="자동 산정 결과" desc="입력값에 따라 실시간 계산됩니다." />
          <CardBody className="space-y-4">
            <div className="rounded-3xl bg-gradient-to-br from-navy to-blue p-6 text-white">
              <p className="text-sm font-semibold text-white/75">사업부서 예산</p>
              <p className="mt-1 text-3xl font-extrabold tabular-nums">
                {formatKRW(departmentBudget)}
                <span className="ml-1 text-xl font-bold">원</span>
              </p>
              <p className="mt-3 text-sm text-white/80">
                {formatKRW(totalBudget)}원 × {budgetRatio}% = {formatKRW(departmentBudget)}원
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-line bg-canvas/60 p-4">
                <p className="text-xs font-semibold uppercase text-muted">전체 사업 예산</p>
                <p className="mt-1 text-lg font-bold tabular-nums text-navy">{formatKRW(totalBudget)}원</p>
              </div>
              <div className="rounded-2xl border border-line bg-canvas/60 p-4">
                <p className="text-xs font-semibold uppercase text-muted">예산 비율</p>
                <p className="mt-1 text-lg font-bold tabular-nums text-navy">{budgetRatio}%</p>
              </div>
            </div>

            <Button className="w-full" size="lg" onClick={() => navigate('/summary')}>
              종합평가 확인 후 보고서 생성
              <IconArrowRight width={18} height={18} />
            </Button>
          </CardBody>
        </Card>
      </Reveal>
    </div>
  );
}
