import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import StudentStats from "../../../components/admin/student/StudentStats";
import StudentFilters from "../../../components/admin/student/StudentFilters";
import StudentTable from "../../../components/admin/student/StudentTable";
import Pagination from "../../../components/shared/Pagination";

// Mock student data generator
const generateMockStudents = () => {
  const baseStudents = [
    { name: "Pappu roy", email: "pappuroy6393@gmai.com", quizzesTaken: 20, score: "92%", status: "Active", joinDate: "May 20, 2025", subject: "Artificial Intelligence" },
    { name: "Pappu roy", email: "pappuroy6393@gmai.com", quizzesTaken: 10, score: "89%", status: "Inactive", joinDate: "May 20, 2025", subject: "Programming" },
    { name: "Pappu roy", email: "pappuroy6393@gmai.com", quizzesTaken: 5, score: "85%", status: "Active", joinDate: "May 20, 2025", subject: "Artificial Intelligence" },
    { name: "Pappu roy", email: "pappuroy6393@gmai.com", quizzesTaken: 2, score: "82%", status: "Active", joinDate: "May 20, 2025", subject: "Data Science" },
    { name: "Pappu roy", email: "pappuroy6393@gmai.com", quizzesTaken: 5, score: "78%", status: "Active", joinDate: "May 20, 2025", subject: "Programming" },
    { name: "Pappu roy", email: "pappuroy6393@gmai.com", quizzesTaken: 4, score: "75%", status: "Active", joinDate: "May 20, 2025", subject: "Artificial Intelligence" },
    { name: "Pappu roy", email: "pappuroy6393@gmai.com", quizzesTaken: 2, score: "73%", status: "Active", joinDate: "May 20, 2025", subject: "Data Science" },
    { name: "Pappu roy", email: "pappuroy6393@gmai.com", quizzesTaken: 25, score: "70%", status: "Inactive", joinDate: "May 20, 2025", subject: "Programming" },
    { name: "Pappu roy", email: "pappuroy6393@gmai.com", quizzesTaken: 5, score: "70%", status: "Active", joinDate: "May 20, 2025", subject: "Artificial Intelligence" },
    { name: "Pappu roy", email: "pappuroy6393@gmai.com", quizzesTaken: 4, score: "70%", status: "Inactive", joinDate: "May 20, 2025", subject: "Programming" },
    { name: "Pappu roy", email: "pappuroy6393@gmai.com", quizzesTaken: 7, score: "70%", status: "Active", joinDate: "May 20, 2025", subject: "Data Science" },
    { name: "Pappu roy", email: "pappuroy6393@gmai.com", quizzesTaken: 2, score: "40%", status: "Inactive", joinDate: "May 20, 2025", subject: "Artificial Intelligence" },
  ];

  const list = [];
  // Generate 156 items (exactly 13 pages of 12 items)
  for (let i = 0; i < 156; i++) {
    const base = baseStudents[i % baseStudents.length];
    list.push({
      id: i + 1,
      rank: i + 1,
      name: i < 12 ? base.name : `${base.name} #${i + 1}`,
      email: i < 12 ? base.email : `pappuroy${i + 1}@gmail.com`,
      quizzesTaken: base.quizzesTaken,
      score: base.score,
      status: base.status,
      joinDate: base.joinDate,
      subject: base.subject,
    });
  }
  return list;
};

export default function StudentManagement() {
  const navigate = useNavigate();
  const [students, setStudents] = useState(() => generateMockStudents());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Reset page number on filter changes
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    setCurrentPage(1);
  };

  // Filter students based on search and status
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        selectedStatus === "All Status" || student.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [students, searchQuery, selectedStatus]);

  // Pagination calculations
  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(filteredStudents.length / itemsPerPage));
  }, [filteredStudents, itemsPerPage]);

  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    // Adjust rank numbering for display consistency
    return filteredStudents.slice(startIndex, endIndex).map((student, idx) => ({
      ...student,
      rank: startIndex + idx + 1,
    }));
  }, [filteredStudents, currentPage, itemsPerPage]);

  // Actions
  const handleView = (student) => {
    navigate(`/admin/student/${student.id}`);
  };

  const handleDelete = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
    toast.success("Student record deleted successfully.");
  };

  const handleExport = () => {
    toast.success("Exporting student directory to CSV...");
  };

  return (
    <div className="w-full flex flex-col gap-6 text-left">
      {/* 3 top summary status cards */}
      <StudentStats />

      {/* Filters: search, status select, export */}
      <StudentFilters
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        selectedStatus={selectedStatus}
        onStatusChange={handleStatusChange}
        onExport={handleExport}
      />

      {/* Table grid wrapper and pagination */}
      <div className="bg-white border border-slate-200 rounded-[20px] shadow-sm flex flex-col w-full overflow-hidden">
        <div className="p-6">
          <StudentTable
            students={paginatedStudents}
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
