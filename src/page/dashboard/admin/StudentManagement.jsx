import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import StudentStats from "../../../components/admin/student/StudentStats";
import StudentFilters from "../../../components/admin/student/StudentFilters";
import StudentTable from "../../../components/admin/student/StudentTable";
import Pagination from "../../../components/shared/Pagination";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import { useGetStudentsQuery } from "../../../redex/features/admin/admin.api";

export default function StudentManagement() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Dynamic API list hook execution
  const { data: studentsResponse, isLoading } = useGetStudentsQuery({
    search: searchQuery,
    plan: selectedPlan,
    classVal: selectedClass,
    page: currentPage,
  });

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleClassChange = (cls) => {
    setSelectedClass(cls);
    setCurrentPage(1);
  };

  const handlePlanChange = (pln) => {
    setSelectedPlan(pln);
    setCurrentPage(1);
  };

  // Map API response array to table dataset
  const studentsList = useMemo(() => {
    if (!studentsResponse?.results) return [];
    return studentsResponse.results.map((student, idx) => {
      let formattedDate = "";
      try {
        if (student.join_date) {
          const dateObj = new Date(student.join_date);
          const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          const day = dateObj.getDate();
          const month = months[dateObj.getMonth()];
          const year = dateObj.getFullYear();
          formattedDate = `${month} ${day}, ${year}`;
        }
      } catch (e) {
        formattedDate = "";
      }

      return {
        id: student.id,
        rank: ((currentPage - 1) * 10) + idx + 1, // standard offset calculation
        name: student.student_name || "Student",
        email: student.email || "",
        classForm: student.class_form || student.student_class || "",
        plan: student.plan || "Free",
        status: student.status || (student.is_active ? "Active" : "Inactive"),
        is_active: student.is_active,
        joinDate: formattedDate || "May 20, 2025",
      };
    });
  }, [studentsResponse, currentPage]);

  const totalPages = studentsResponse?.total_pages || 1;

  const handleView = (student) => {
    navigate(`/admin/student/${student.id}`);
  };

  const handleDelete = (id) => {
    toast.success("Student deletion would execute.");
  };

  const handleExport = () => {
    toast.success("Exporting student directory to CSV...");
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading students..." />;
  }

  return (
    <div className="w-full flex flex-col gap-6 text-left">
      {/* Stats Summary Cards */}
      <StudentStats stats={studentsResponse?.stats} />

      {/* Action Filters dropdowns */}
      <StudentFilters
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        selectedClass={selectedClass}
        onClassChange={handleClassChange}
        selectedPlan={selectedPlan}
        onPlanChange={handlePlanChange}
        onExport={handleExport}
      />

      {/* Table grid wrapper and pagination */}
      <div className="bg-white border border-slate-200 rounded-[20px] shadow-sm flex flex-col w-full overflow-hidden">
        <div className="p-6">
          <StudentTable
            students={studentsList}
            onView={handleView}
            onDelete={handleDelete}
          />
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
