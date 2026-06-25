
import StatusCards from "../../../components/admin/dashboard/StatusCards";
import TopStudents from "../../../components/admin/dashboard/TopStudents";
import RecentQuizzes from "../../../components/admin/dashboard/RecentQuizzes";

function AdminDashboard() {
  return (
    <div className="w-full flex flex-col gap-6">
      {/* Overview Stat Cards */}
      <StatusCards />

      {/* Top Students Rankings */}
      <TopStudents />

      {/* Recent Quiz Uploads */}
      <RecentQuizzes />
    </div>
  );
}

export default AdminDashboard;