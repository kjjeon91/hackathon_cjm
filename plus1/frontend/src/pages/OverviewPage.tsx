import { useApp } from '@/context/AppContext';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Table, TBody, Tr, Td, KeyTh } from '@/components/ui/Table';
import { Reveal } from '@/components/Reveal';
import { IconDoc, IconCheck } from '@/components/Icons';
import { PROJECT_OVERVIEW, PROJECT_NOTICE, PROJECT_TASKS } from '@/data/seed';
import { formatKRW } from '@/lib/utils';

export function OverviewPage() {
  const { departmentBudget, budgetRatio } = useApp();
  const o = PROJECT_OVERVIEW;

  return (
    <div className="space-y-6">
      <Reveal>
        <Card>
          <CardHeader
            icon={<IconDoc />}
            title="사업 개요 확인"
            desc="추출된 공고문 기반 사업 개요입니다. 값 확인 후 다음 단계로 진행합니다."
          />
          <CardBody>
            <Table>
              <TBody>
                <Tr>
                  <KeyTh>사업명</KeyTh>
                  <Td className="font-semibold">{o.title}</Td>
                  <KeyTh>발주 / 전문기관</KeyTh>
                  <Td>{o.orderingAgency}</Td>
                </Tr>
                <Tr>
                  <KeyTh>전체 예산</KeyTh>
                  <Td>{o.totalBudgetText}</Td>
                  <KeyTh>당해연도 예산</KeyTh>
                  <Td>{o.currentYearBudgetText}</Td>
                </Tr>
                <Tr>
                  <KeyTh>전체 사업기간</KeyTh>
                  <Td>{o.period}</Td>
                  <KeyTh>참여기관 수</KeyTh>
                  <Td>{o.partnerCount}개</Td>
                </Tr>
                <Tr>
                  <KeyTh>사업책임자</KeyTh>
                  <Td>{o.manager}</Td>
                  <KeyTh>사업부서 / 예산비율 / 예산</KeyTh>
                  <Td>
                    {o.department} / 전체 예산의 {budgetRatio}% /{' '}
                    <b className="text-blue">{formatKRW(departmentBudget)}원</b>
                  </Td>
                </Tr>
                <Tr>
                  <KeyTh>선정과제수</KeyTh>
                  <Td>{o.selectedTaskCount}</Td>
                  <KeyTh>과제성격</KeyTh>
                  <Td>{o.taskNature}</Td>
                </Tr>
                <Tr>
                  <KeyTh>보안과제</KeyTh>
                  <Td>{o.securityClass}</Td>
                  <KeyTh>{''}</KeyTh>
                  <Td>{''}</Td>
                </Tr>
              </TBody>
            </Table>
          </CardBody>
        </Card>
      </Reveal>

      <Reveal delay={80}>
        <Card>
          <CardHeader title="주요 사업내용" />
          <CardBody className="space-y-4">
            <div className="rounded-2xl border border-blue/20 bg-blue/5 p-5 text-base leading-relaxed text-[#1e3a5f]">
              {PROJECT_NOTICE}
            </div>
            <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {PROJECT_TASKS.map((task) => (
                <li
                  key={task}
                  className="flex items-start gap-3 rounded-2xl border border-line bg-canvas/50 p-4"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-green/15 text-green">
                    <IconCheck width={14} height={14} />
                  </span>
                  <span className="text-base leading-relaxed text-ink">{task}</span>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      </Reveal>
    </div>
  );
}
