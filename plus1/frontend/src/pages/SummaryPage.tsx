import { useNavigate } from 'react-router-dom';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { RadarChart } from '@/components/ui/RadarChart';
import { SummaryInsights } from '@/components/SummaryInsights';
import { Reveal } from '@/components/Reveal';
import { IconRadar, IconChart, IconArrowRight } from '@/components/Icons';
import { SUMMARY_AXES, SUMMARY_COLOR, SUMMARY_NARRATIVE } from '@/data/seed';
import { comprehensiveScores } from '@/lib/selectors';

export function SummaryPage() {
  const navigate = useNavigate();
  const scores = comprehensiveScores();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
        <Reveal className="xl:col-span-2">
          <Card>
            <CardHeader icon={<IconRadar />} title="종합 평가 레이더" desc="6개 종합 평가축 기준" />
            <CardBody>
              <div className="mx-auto max-w-md">
                <RadarChart axes={SUMMARY_AXES} scores={scores} color={SUMMARY_COLOR} fillOpacity={0.18} />
              </div>
            </CardBody>
          </Card>
        </Reveal>

        <Reveal delay={80} className="xl:col-span-3">
          <Card className="h-full">
            <CardHeader icon={<IconChart />} title="종합평가 결과 요약" desc="자동 산정된 의사결정 인사이트" />
            <CardBody className="space-y-4">
              <div className="rounded-2xl border border-blue/20 bg-blue/5 p-5 text-base leading-relaxed text-[#1e3a5f]">
                {SUMMARY_NARRATIVE}
              </div>
              <SummaryInsights />
            </CardBody>
          </Card>
        </Reveal>
      </div>

      <Reveal delay={160}>
        <Card>
          <CardBody className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div>
              <p className="text-lg font-bold text-navy">검토가 완료되었습니다</p>
              <p className="text-sm text-muted">
                입력값을 기반으로 결재 상신용 자동 결과보고서를 생성합니다.
              </p>
            </div>
            <Button size="lg" onClick={() => navigate('/report')}>
              결과보고서 생성
              <IconArrowRight width={18} height={18} />
            </Button>
          </CardBody>
        </Card>
      </Reveal>
    </div>
  );
}
