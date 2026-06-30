import { useApp } from '@/context/AppContext';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Badge, judgementTone } from '@/components/ui/Badge';
import { RadarChart } from '@/components/ui/RadarChart';
import { ScoreSegmented } from '@/components/ui/ScoreSegmented';
import { Reveal } from '@/components/Reveal';
import { IconRadar, IconUsers } from '@/components/Icons';
import { Table, THead, TBody, Tr, Th, Td } from '@/components/ui/Table';
import { ROLE_CONFIG, DEFAULT_SCORES, buildInstitutions, type RoleConfig } from '@/data/seed';
import { judgeFromAverage } from '@/lib/utils';

/** 부서장/행정부/부문장 공용 판단 페이지 */
export function RoleJudgement({ roleKey }: { roleKey: RoleConfig['key'] }) {
  const { scores, setScore, averages, reviewers } = useApp();
  const config = ROLE_CONFIG[roleKey];
  const roleScores = scores[roleKey];
  const avg = averages[roleKey];
  const judgement = judgeFromAverage(avg);
  const reviewerName = reviewers[roleKey];
  const defaultOpinion = DEFAULT_SCORES[roleKey].opinion;
  const institutions = roleKey === 'admin' ? buildInstitutions() : [];

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      {/* 왼쪽: 6축 슬라이더 */}
      <Reveal>
        <Card>
          <CardHeader
            icon={<IconUsers />}
            title={config.label}
            desc={
              <span>
                평가자 <b className="text-navy">{reviewerName}</b> · 6개 평가축을 0~5점으로 <b>바로 클릭</b>해 선택하세요.
              </span>
            }
          />
          <CardBody className="space-y-5">
            {config.factors.map((factor, i) => (
              <div key={factor.key}>
                <div className="mb-2 flex items-start justify-between gap-3">
                  <div>
                    <label className="text-base font-bold text-blue">{factor.title}</label>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted">{factor.desc}</p>
                  </div>
                  <span
                    className="mt-0.5 flex h-7 min-w-[2.75rem] shrink-0 items-center justify-center rounded-lg px-2 text-sm font-bold tabular-nums"
                    style={{ background: `${config.color}15`, color: config.color }}
                  >
                    {roleScores[i].toFixed(1)}
                  </span>
                </div>
                <ScoreSegmented
                  label={factor.title}
                  value={roleScores[i]}
                  color={config.color}
                  onChange={(next) => setScore(roleKey, i, next)}
                />
              </div>
            ))}
          </CardBody>
        </Card>
      </Reveal>

      {/* 오른쪽: 실시간 레이더 + 판단 */}
      <Reveal delay={80} className="space-y-6">
        <Card className="sticky top-[160px]">
          <CardHeader icon={<IconRadar />} title="실시간 평가 시각화" desc="입력값이 즉시 반영됩니다." />
          <CardBody>
            <div className="mx-auto max-w-md">
              <RadarChart axes={config.axes} scores={roleScores} color={config.color} />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-line bg-canvas/60 p-4 text-center">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">평균 점수</p>
                <p className="mt-1 text-2xl font-extrabold tabular-nums" style={{ color: config.color }}>
                  {avg.toFixed(2)}
                </p>
              </div>
              <div className="flex flex-col items-center justify-center rounded-2xl border border-line bg-canvas/60 p-4 text-center">
                <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted">참여 판단</p>
                <Badge tone={judgementTone(judgement)}>{judgement}</Badge>
              </div>
            </div>

            <div className="mt-3 rounded-2xl border border-blue/20 bg-blue/5 p-4">
              <p className="text-sm font-semibold text-blue">주요 의견</p>
              <p className="mt-1 text-base leading-relaxed text-ink">{defaultOpinion}</p>
            </div>
          </CardBody>
        </Card>

        {/* 행정부 전용: 참여기관 위험평가 */}
        {roleKey === 'admin' && (
          <Card>
            <CardHeader
              icon={<IconUsers />}
              title="참여기관 위험평가"
              desc="참여기관별 신용·재정 안정성, 역할 명확성, 계약관리 난이도를 점검합니다."
            />
            <CardBody>
              <Table>
                <THead>
                  <Tr>
                    <Th>참여기관</Th>
                    <Th className="text-center">신용·재정 안정성</Th>
                    <Th className="text-center">역할 명확성</Th>
                    <Th className="text-center">계약관리 난이도</Th>
                  </Tr>
                </THead>
                <TBody>
                  {institutions.map((inst) => (
                    <Tr key={inst.name}>
                      <Td className="font-semibold text-blue">{inst.name}</Td>
                      <Td className="text-center font-bold tabular-nums">{inst.credit}</Td>
                      <Td className="text-center font-bold tabular-nums">{inst.role}</Td>
                      <Td className="text-center font-bold tabular-nums">{inst.manage}</Td>
                    </Tr>
                  ))}
                </TBody>
              </Table>
            </CardBody>
          </Card>
        )}
      </Reveal>
    </div>
  );
}
