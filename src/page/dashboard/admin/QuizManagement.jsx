import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import QuizStats from "../../../components/admin/quiz/QuizStats";
import QuizFilters from "../../../components/admin/quiz/QuizFilters";
import QuizTable from "../../../components/admin/quiz/QuizTable";
import Pagination from "../../../components/shared/Pagination";
import DeleteConfirmModal from "../../../components/shared/DeleteConfirmModal";

// Mock quiz data generator
const generateMockQuizzes = () => {
  const baseQuizzes = [
    { title: "Math final exam 2025", subject: "Mathematics", questions: 20, duration: "1 Hour", status: "Published", createdAt: "May 20, 2025" },
    { title: "AI Foundations Quiz", subject: "Artificial Intelligence", questions: 15, duration: "45 Mins", status: "Published", createdAt: "May 20, 2025" },
    { title: "Python Programming Lab", subject: "Programming", questions: 30, duration: "2 Hours", status: "Published", createdAt: "May 20, 2025" },
    { title: "Data Science Essentials", subject: "Data Science", questions: 25, duration: "1.5 Hours", status: "Published", createdAt: "May 20, 2025" },
    { title: "Linear Algebra Exam", subject: "Mathematics", questions: 20, duration: "1 Hour", status: "Published", createdAt: "May 20, 2025" },
    { title: "Neural Networks Test", subject: "Artificial Intelligence", questions: 10, duration: "30 Mins", status: "Published", createdAt: "May 20, 2025" },
    { title: "Git and Code Collaboration", subject: "Programming", questions: 15, duration: "45 Mins", status: "Published", createdAt: "May 20, 2025" },
    { title: "Probability & Stats quiz", subject: "Mathematics", questions: 20, duration: "1 Hour", status: "Draft", createdAt: "May 20, 2025" },
    { title: "SQL Database Queries", subject: "Data Science", questions: 20, duration: "1 Hour", status: "Draft", createdAt: "May 20, 2025" },
    { title: "Machine Learning Basics", subject: "Artificial Intelligence", questions: 25, duration: "1.5 Hours", status: "Draft", createdAt: "May 20, 2025" },
    { title: "C++ Programming Midterm", subject: "Programming", questions: 30, duration: "2 Hours", status: "Draft", createdAt: "May 20, 2025" },
    { title: "Discrete Math Evaluation", subject: "Mathematics", questions: 20, duration: "1 Hour", status: "Draft", createdAt: "May 20, 2025" },
  ];

  const list = [];
  // Generate 60 mock items (exactly 5 pages of 12 items)
  for (let i = 0; i < 60; i++) {
    const base = baseQuizzes[i % baseQuizzes.length];
    list.push({
      id: i + 1,
      title: i < 12 ? base.title : `${base.title} #${i + 1}`,
      subject: base.subject,
      questions: base.questions,
      duration: base.duration,
      status: base.status,
      createdAt: base.createdAt,
    });
  }
  return list;
};

export default function QuizManagement() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState(() => generateMockQuizzes());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Status");
  const [selectedSubject, setSelectedSubject] = useState("All Subject");
  const [currentPage, setCurrentPage] = useState(1);
  const [deletingQuiz, setDeletingQuiz] = useState(null); // stores quiz to delete
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

  const handleSubjectChange = (subject) => {
    setSelectedSubject(subject);
    setCurrentPage(1);
  };

  // Filter quizzes based on search, status, and subject
  const filteredQuizzes = useMemo(() => {
    return quizzes.filter((quiz) => {
      const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = selectedStatus === "Status" || quiz.status === selectedStatus;
      const matchesSubject = selectedSubject === "All Subject" || quiz.subject === selectedSubject;
      return matchesSearch && matchesStatus && matchesSubject;
    });
  }, [quizzes, searchQuery, selectedStatus, selectedSubject]);

  // Pagination calculations
  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(filteredQuizzes.length / itemsPerPage));
  }, [filteredQuizzes, itemsPerPage]);

  const paginatedQuizzes = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredQuizzes.slice(startIndex, endIndex);
  }, [filteredQuizzes, currentPage, itemsPerPage]);

  // View action
  const handleView = (quiz) => {
    navigate(`/admin/quiz/${quiz.id}`);
  };

  // Delete handlers
  const handleDeleteRequest = (quiz) => {
    setDeletingQuiz(quiz);
  };

  const confirmDelete = () => {
    if (deletingQuiz) {
      setQuizzes((prev) => prev.filter((q) => q.id !== deletingQuiz.id));
      toast.success(`Quiz "${deletingQuiz.title}" deleted successfully.`);
      setDeletingQuiz(null);
    }
  };

  const cancelDelete = () => {
    setDeletingQuiz(null);
  };

  return (
    <div className="w-full flex flex-col gap-6 text-left">
      {/* Three Summary Status Cards */}
      <QuizStats />

      {/* Filters block */}
      <QuizFilters
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        selectedStatus={selectedStatus}
        onStatusChange={handleStatusChange}
        selectedSubject={selectedSubject}
        onSubjectChange={handleSubjectChange}
      />

      {/* Table grid wrapper and pagination */}
      <div className="bg-white border border-slate-200 rounded-[20px] shadow-sm flex flex-col w-full overflow-hidden">
        <div className="p-6">
          <QuizTable
            quizzes={paginatedQuizzes}
            onView={handleView}
            onDeleteRequest={handleDeleteRequest}
          />
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Delete Confirmation Modal Popup */}
      <DeleteConfirmModal
        isOpen={!!deletingQuiz}
        title="Delete Quiz"
        message={
          deletingQuiz
            ? `Are you sure you want to delete "${deletingQuiz.title}"? This action cannot be undone.`
            : ""
        }
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}
