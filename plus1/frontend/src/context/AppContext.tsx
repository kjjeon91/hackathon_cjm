import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import {
  DEFAULT_BUDGET_RATIO,
  DEFAULT_REVIEWERS,
  DEFAULT_SCORES,
  DEFAULT_TOTAL_BUDGET,
  ROLE_CONFIG,
  type Reviewers,
  type RoleConfig,
} from '@/data/seed';
import { average } from '@/lib/utils';

interface UploadedFile {
  name: string;
  size: number;
}

interface AppState {
  // 1. 업로드 + 평가자
  rfpFile: UploadedFile | null;
  riskFile: UploadedFile | null;
  reviewers: Reviewers;
  setRfpFile: (f: UploadedFile | null) => void;
  setRiskFile: (f: UploadedFile | null) => void;
  setReviewers: (r: Reviewers) => void;

  // 3~5. 역할별 점수
  scores: Record<RoleConfig['key'], number[]>;
  setScore: (role: RoleConfig['key'], axisIndex: number, value: number) => void;

  // 6. 예산 산정
  totalBudget: number;
  budgetRatio: number;
  setTotalBudget: (v: number) => void;
  setBudgetRatio: (v: number) => void;
  departmentBudget: number;

  // 파생값
  averages: Record<RoleConfig['key'], number>;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [rfpFile, setRfpFile] = useState<UploadedFile | null>({
    name: '민군경_AI_해양영상_RFP_공고문.pdf',
    size: 2_482_176,
  });
  const [riskFile, setRiskFile] = useState<UploadedFile | null>({
    name: '내부_위험요소_점검표.hwpx',
    size: 1_210_950,
  });
  const [reviewers, setReviewers] = useState<Reviewers>(DEFAULT_REVIEWERS);

  const [scores, setScores] = useState<Record<RoleConfig['key'], number[]>>({
    dept: [...DEFAULT_SCORES.dept.scores],
    admin: [...DEFAULT_SCORES.admin.scores],
    exec: [...DEFAULT_SCORES.exec.scores],
  });

  const [totalBudget, setTotalBudget] = useState(DEFAULT_TOTAL_BUDGET);
  const [budgetRatio, setBudgetRatio] = useState(DEFAULT_BUDGET_RATIO);

  const setScore = (role: RoleConfig['key'], axisIndex: number, value: number) => {
    setScores((prev) => {
      const next = [...prev[role]];
      next[axisIndex] = value;
      return { ...prev, [role]: next };
    });
  };

  const departmentBudget = useMemo(
    () => Math.round((totalBudget * budgetRatio) / 100),
    [totalBudget, budgetRatio],
  );

  const averages = useMemo(
    () => ({
      dept: average(scores.dept),
      admin: average(scores.admin),
      exec: average(scores.exec),
    }),
    [scores],
  );

  const value: AppState = {
    rfpFile,
    riskFile,
    reviewers,
    setRfpFile,
    setRiskFile,
    setReviewers,
    scores,
    setScore,
    totalBudget,
    budgetRatio,
    setTotalBudget,
    setBudgetRatio,
    departmentBudget,
    averages,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

// 역할 설정 재노출 (편의)
export { ROLE_CONFIG };
