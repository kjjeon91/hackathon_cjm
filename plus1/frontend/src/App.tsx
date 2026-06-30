import { Navigate, Route, Routes } from 'react-router-dom';
import { PlatformLayout } from '@/components/PlatformLayout';
import { UploadPage } from '@/pages/UploadPage';
import { OverviewPage } from '@/pages/OverviewPage';
import { DeptPage } from '@/pages/DeptPage';
import { AdminPage } from '@/pages/AdminPage';
import { ExecPage } from '@/pages/ExecPage';
import { SummaryPage } from '@/pages/SummaryPage';
import { ReportPage } from '@/pages/ReportPage';

export default function App() {
  return (
    <Routes>
      {/* 결과보고서는 별도 라우트 (인쇄용 레이아웃, 플랫폼 셸 없음) */}
      <Route path="/report" element={<ReportPage />} />

      {/* 플랫폼 6단계 */}
      <Route
        path="/*"
        element={
          <PlatformLayout>
            <Routes>
              <Route path="/" element={<Navigate to="/upload" replace />} />
              <Route path="/upload" element={<UploadPage />} />
              <Route path="/overview" element={<OverviewPage />} />
              <Route path="/dept" element={<DeptPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/exec" element={<ExecPage />} />
              <Route path="/summary" element={<SummaryPage />} />
              <Route path="*" element={<Navigate to="/upload" replace />} />
            </Routes>
          </PlatformLayout>
        }
      />
    </Routes>
  );
}
