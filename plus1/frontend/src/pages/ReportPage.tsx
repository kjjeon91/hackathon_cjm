import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/Button';
import { Badge, judgementTone } from '@/components/ui/Badge';
import { RadarChart } from '@/components/ui/RadarChart';
import { SummaryInsights } from '@/components/SummaryInsights';
import { IconPrint, IconArrowLeft, IconRadar } from '@/components/Icons';
import {
  ROLE_CONFIG,
  DEFAULT_SCORES,
  PROJECT_OVERVIEW,
  PROJECT_NOTICE,
  PROJECT_TASKS,
  SUMMARY_AXES,
  SUMMARY_COLOR,
  SUMMARY_NARRATIVE,
  SUMMARY_TABLE,
  RISK_CARDS,
  OVERALL_BADGE,
  OVERALL_NARRATIVE,
  OVERALL_ACTIONS,
  SIGN_SLOTS,
  type RoleConfig,
} from '@/data/seed';
import { comprehensiveScores, ROLE_KEYS } from '@/lib/selectors';
import { formatKRW } from '@/lib/utils';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3.5 mt-8 border-b-2 border-blue pb-2.5 text-xl font-bold text-blue first:mt-0">
      {children}
    </h2>
  );
}

function RTable({ children }: { children: React.ReactNode }) {
  return (
    <table className="mb-4 w-full border-collapse text-base">
      <tbody>{children}</tbody>
    </table>
  );
}
function RTh({ children, colSpan }: { children: React.ReactNode; colSpan?: number }) {
  return (
    <th
      colSpan={colSpan}
      className="border border-[#d8e7f6] bg-[#eef7ff] px-3 py-3 text-left align-top text-sm font-bold text-navy"
    >
      {children}
    </th>
  );
}
function RTd({ children, colSpan }: { children: React.ReactNode; colSpan?: number }) {
  return (
    <td
      colSpan={colSpan}
      className="border border-[#e1ebf5] px-3 py-3 align-top text-base leading-relaxed text-ink"
    >
      {children}
    </td>
  );
}

export function ReportPage() {
  const navigate = useNavigate();
  const { reviewers, averages, scores, totalBudget, budgetRatio, departmentBudget } = useApp();
  const o = PROJECT_OVERVIEW;
  const summaryScores = comprehensiveScores();

  return (
    <div className="min-h-screen bg-[#eef5fb] py-8">
      {/* 상단 액션 바 (인쇄 제외) */}
      <div className="no-print mx-auto mb-5 flex max-w-report items-center justify-between px-4">
        <Button variant="outline" size="sm" onClick={() => navigate('/summary')}>
          <IconArrowLeft width={16} height={16} />
          플랫폼으로
        </Button>
        <Button size="sm" onClick={() => window.print()}>
          <IconPrint width={16} height={16} />
          인쇄 / PDF 저장
        </Button>
      </div>

      <div className="print-page mx-auto max-w-report overflow-hidden rounded-3xl border border-line bg-white shadow-float">
        {/* 헤더 */}
        <div className="print-header bg-gradient-to-br from-navy to-blue px-8 py-8 text-white">
          <p className="text-sm font-semibold tracking-wide text-white/80">RFP Decision Intelligence</p>
          <h1 className="mt-1.5 text-3xl font-extrabold">수주검토 자동 결과보고서</h1>
          <p className="mt-2 max-w-3xl leading-relaxed text-[#d8eaff]">
            본 보고서는 공고문/RFP 및 내부 위험요소 한글파일과 역할별 판단값을 기반으로 별도 파일로 생성되는
            결재 상신용 보고서입니다. 종합평가 요약과 레이더 차트를 포함합니다.
          </p>
        </div>

        <div className="px-8 py-8">
          {/* 1. 사업 개요 */}
          <SectionTitle>1. 사업 개요</SectionTitle>
          <RTable>
            <tr>
              <RTh>사업명</RTh>
              <RTd>{o.title}</RTd>
              <RTh>발주/전문기관</RTh>
              <RTd>{o.orderingAgency}</RTd>
            </tr>
            <tr>
              <RTh>전체 예산</RTh>
              <RTd>{o.totalBudgetText}</RTd>
              <RTh>당해연도 예산</RTh>
              <RTd>{o.currentYearBudgetText}</RTd>
            </tr>
            <tr>
              <RTh>전체 사업기간</RTh>
              <RTd>{o.period}</RTd>
              <RTh>참여기관 수</RTh>
              <RTd>{o.partnerCount}개</RTd>
            </tr>
            <tr>
              <RTh>사업책임자</RTh>
              <RTd>{o.manager}</RTd>
              <RTh>사업부서 / 예산비율 / 예산</RTh>
              <RTd>
                {o.department} / 전체 예산의 {budgetRatio}% / {formatKRW(departmentBudget)}원
              </RTd>
            </tr>
          </RTable>

          {/* 2. 평가자 및 결재 검토자 */}
          <SectionTitle>2. 평가자 및 결재 검토자</SectionTitle>
          <RTable>
            <tr>
              <RTh>부서장 / 최초 평가자</RTh>
              <RTd>{reviewers.dept}</RTd>
              <RTh>행정부 검토자</RTh>
              <RTd>{reviewers.admin}</RTd>
            </tr>
            <tr>
              <RTh>부문장 검토자</RTh>
              <RTd>{reviewers.exec}</RTd>
              <RTh>결재 흐름</RTh>
              <RTd>{reviewers.approvalFlow}</RTd>
            </tr>
          </RTable>

          {/* 3. 사업부서 예산 산정 */}
          <SectionTitle>3. 사업부서 예산 산정</SectionTitle>
          <RTable>
            <tr>
              <RTh>전체 사업 예산</RTh>
              <RTd>{formatKRW(totalBudget)}원</RTd>
              <RTh>사업부서 예산 비율</RTh>
              <RTd>{budgetRatio}%</RTd>
            </tr>
            <tr>
              <RTh>자동 산정 사업부서 예산</RTh>
              <RTd colSpan={3}>
                {formatKRW(totalBudget)}원 × {budgetRatio}% ={' '}
                <b className="text-blue">{formatKRW(departmentBudget)}원</b>
              </RTd>
            </tr>
          </RTable>

          {/* 4. 주요 사업내용 */}
          <SectionTitle>4. 주요 사업내용</SectionTitle>
          <div className="rounded-2xl border border-[#bfdbfe] bg-[#eff6ff] p-4 leading-relaxed text-[#1e3a5f]">
            {PROJECT_NOTICE}
          </div>
          <ul className="mt-3 space-y-2 pl-5">
            {PROJECT_TASKS.map((t) => (
              <li key={t} className="list-disc text-base leading-relaxed text-ink">
                {t}
              </li>
            ))}
          </ul>

          {/* 5. 역할별 검토 결과 */}
          <SectionTitle>5. 역할별 검토 결과</SectionTitle>
          <RTable>
            <tr>
              <RTh>구분</RTh>
              <RTh>평균점수</RTh>
              <RTh>판단</RTh>
              <RTh>주요 의견</RTh>
            </tr>
            {ROLE_KEYS.map((key) => {
              const cfg = ROLE_CONFIG[key];
              return (
                <tr key={key}>
                  <RTd>{cfg.label.replace(' 판단', '')}</RTd>
                  <RTd>{averages[key].toFixed(2)}</RTd>
                  <RTd>조건부</RTd>
                  <RTd>{DEFAULT_SCORES[key].opinion}</RTd>
                </tr>
              );
            })}
          </RTable>

          {/* 6. 레이더 차트 분석 (4개) */}
          <SectionTitle>6. 레이더 차트 분석</SectionTitle>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {ROLE_KEYS.map((key) => {
              const cfg: RoleConfig = ROLE_CONFIG[key];
              return (
                <div key={key} className="rounded-2xl border border-line bg-[#fbfdff] p-4">
                  <h3 className="mb-1 flex items-center gap-1.5 font-bold text-blue">
                    <IconRadar width={16} height={16} />
                    {cfg.label.replace(' 판단', '')} 평가
                  </h3>
                  <RadarChart axes={cfg.axes} scores={scores[key]} color={cfg.color} animate={false} />
                </div>
              );
            })}
            <div className="rounded-2xl border border-line bg-[#fbfdff] p-4">
              <h3 className="mb-1 flex items-center gap-1.5 font-bold text-blue">
                <IconRadar width={16} height={16} />
                종합 평가
              </h3>
              <RadarChart
                axes={SUMMARY_AXES}
                scores={summaryScores}
                color={SUMMARY_COLOR}
                fillOpacity={0.18}
                animate={false}
              />
            </div>
          </div>

          {/* 7. 종합평가 결과 요약 */}
          <SectionTitle>7. 종합평가 결과 요약</SectionTitle>
          <div className="rounded-2xl border border-[#bfdbfe] bg-[#eff6ff] p-4 leading-relaxed text-[#1e3a5f]">
            {SUMMARY_NARRATIVE}
          </div>
          <div className="mt-4">
            <SummaryInsights />
          </div>
          <RTable>
            <tr>
              <RTh>종합 평가축</RTh>
              <RTh>판단</RTh>
              <RTh>주요 해석</RTh>
            </tr>
            {SUMMARY_TABLE.map((row) => (
              <tr key={row.axis}>
                <RTd>{row.axis}</RTd>
                <RTd>
                  <Badge tone={judgementTone(row.judgement)}>{row.judgement}</Badge>
                </RTd>
                <RTd>{row.interpretation}</RTd>
              </tr>
            ))}
          </RTable>

          {/* 8. 주요 리스크 및 대응방향 (4카드) */}
          <SectionTitle>8. 주요 리스크 및 대응방향</SectionTitle>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {RISK_CARDS.map((risk) => (
              <div key={risk.title} className="rounded-2xl border border-line bg-[#fbfdff] p-4">
                <div className="mb-1.5 flex items-center gap-2">
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full"
                    style={{
                      background:
                        risk.level === 'green' ? '#16a34a' : risk.level === 'amber' ? '#f59e0b' : '#dc2626',
                    }}
                  />
                  <b className="text-blue">{risk.title}</b>
                </div>
                <p className="text-base leading-relaxed text-ink">{risk.body}</p>
              </div>
            ))}
          </div>

          {/* 9. 종합 판단 */}
          <SectionTitle>9. 종합 판단</SectionTitle>
          <div className="mb-3">
            <Badge tone="amber" className="px-4 py-1.5 text-sm">
              {OVERALL_BADGE}
            </Badge>
          </div>
          <p className="text-base leading-relaxed text-ink">{OVERALL_NARRATIVE}</p>
          <ul className="mt-3 space-y-2 pl-5">
            {OVERALL_ACTIONS.map((a) => (
              <li key={a} className="list-disc text-base leading-relaxed text-ink">
                {a}
              </li>
            ))}
          </ul>

          {/* 10. 결재란 */}
          <SectionTitle>10. 결재</SectionTitle>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {SIGN_SLOTS.map((slot) => (
              <div
                key={slot.name}
                className="flex h-24 flex-col rounded-2xl border border-[#d8e7f6] bg-[#fbfdff] p-3 text-center"
              >
                <b className="text-sm text-blue">{slot.name}</b>
                <span className="mt-auto text-sm font-semibold text-muted">{slot.role}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
