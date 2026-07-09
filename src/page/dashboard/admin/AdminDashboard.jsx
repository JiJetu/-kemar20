
import StatusCards from "../../../components/admin/dashboard/StatusCards";
import RevenueTrendChart from "../../../components/admin/dashboard/RevenueTrendChart";
import TopStudents from "../../../components/admin/dashboard/TopStudents";
import RecentQuizzes from "../../../components/admin/dashboard/RecentQuizzes";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import { useGetAdminOverviewQuery } from "../../../redex/features/admin/admin.api";

function AdminDashboard() {
  const { data: overviewData, isLoading } = useGetAdminOverviewQuery();

  if (isLoading) {
    return <LoadingSpinner message="Loading dashboard data..." />;
  }

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Overview Stat Cards */}
      <StatusCards 
        totalRevenue={overviewData?.total_revenue}
        totalStudents={overviewData?.total_students}
        totalQuizUploads={overviewData?.total_quiz_uploads}
      />

      {/* Revenue Trend Line Chart */}
      <RevenueTrendChart trend={overviewData?.revenue_trend} />

      {/* Top Students Rankings */}
      <TopStudents students={overviewData?.top_students} />

      {/* Recent Quiz Uploads */}
      <RecentQuizzes quizzes={overviewData?.recent_uploads} />
    </div>
  );
}

export default AdminDashboard;