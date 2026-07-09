import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import QuizStats from "../../../components/admin/quiz/QuizStats";
import QuizFilters from "../../../components/admin/quiz/QuizFilters";
import QuizTable from "../../../components/admin/quiz/QuizTable";
import Pagination from "../../../components/shared/Pagination";
import DeleteConfirmModal from "../../../components/shared/DeleteConfirmModal";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import {
  useGetAdminQuizzesQuery,
  useGetAdminQuizStatsQuery,
  useDeleteQuizMutation,
} from "../../../redex/features/admin/quiz.api";

export default function QuizManagement() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Status");
  const [selectedSubject, setSelectedSubject] = useState("All Subject");
  const [currentPage, setCurrentPage] = useState(1);
  const [deletingQuiz, setDeletingQuiz] = useState(null);

  // 1. Build API filters dynamically to deduplicate cache keys
  const queryArgs = useMemo(() => {
    const args = { page: currentPage };
    if (searchQuery) args.search = searchQuery;
    
    if (selectedSubject === "volume1" || selectedSubject === "volume2") {
      args.book_name = selectedSubject;
    }
    
    if (selectedStatus === "Published") {
      args.is_published = "true";
    } else if (selectedStatus === "Draft") {
      args.is_published = "false";
    }
    return args;
  }, [currentPage, searchQuery, selectedSubject, selectedStatus]);

  const { data: currentListData, isLoading } = useGetAdminQuizzesQuery(queryArgs);

  // Dedicated single endpoint query for totals
  const { data: statsData } = useGetAdminQuizStatsQuery();

  const totalCount = statsData?.total_quizzes !== undefined ? statsData.total_quizzes : (statsData?.total || 0);
  const publishedCount = statsData?.published_quizzes !== undefined ? statsData.published_quizzes : (statsData?.published || 0);
  const draftCount = statsData?.draft_quizzes !== undefined ? statsData.draft_quizzes : (statsData?.draft || 0);

  const [deleteQuiz] = useDeleteQuizMutation();

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

  // Map backend quizzes to front-end schema
  const mappedQuizzes = useMemo(() => {
    return (currentListData?.results || []).map((q) => {
      const dateObj = new Date(q.created_at);
      const options = { month: "short", day: "numeric", year: "numeric" };
      const formattedDate = isNaN(dateObj.getTime())
        ? "N/A"
        : dateObj.toLocaleDateString("en-US", options);

      return {
        id: q.id,
        title: q.title,
        questions: q.question_count || q.questions?.length || 0,
        duration: q.time_limit ? `${q.time_limit} Mins` : "30 Mins",
        status: q.is_published ? "Published" : "Draft",
        createdAt: formattedDate,
      };
    });
  }, [currentListData]);

  const totalPages = currentListData?.total_pages || 1;

  // View action
  const handleView = (quiz) => {
    navigate(`/admin/quiz/${quiz.id}`);
  };

  // Delete handlers
  const handleDeleteRequest = (quiz) => {
    setDeletingQuiz(quiz);
  };

  const confirmDelete = async () => {
    if (deletingQuiz) {
      try {
        await deleteQuiz(deletingQuiz.id).unwrap();
        toast.success(`Quiz "${deletingQuiz.title}" deleted successfully.`);
      } catch (err) {
        console.error("Delete quiz error:", err);
        toast.error("Failed to delete quiz.");
      } finally {
        setDeletingQuiz(null);
      }
    }
  };

  const cancelDelete = () => {
    setDeletingQuiz(null);
  };

  return (
    <div className="w-full flex flex-col gap-6 text-left">
      {/* Three Summary Status Cards */}
      <QuizStats 
        total={totalCount}
        published={publishedCount}
        draft={draftCount}
      />

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
      <div className="bg-white border border-slate-200 rounded-[20px] shadow-sm flex flex-col w-full overflow-hidden min-h-[400px]">
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center p-12">
            <LoadingSpinner />
          </div>
        ) : mappedQuizzes.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-slate-400 font-semibold select-none text-center gap-2">
            <span>No quizzes found.</span>
            <span className="text-xs text-slate-400">Try adjusting filters or create a new quiz.</span>
          </div>
        ) : (
          <>
            <div className="p-6">
              <QuizTable
                quizzes={mappedQuizzes}
                onView={handleView}
                onDeleteRequest={handleDeleteRequest}
              />
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
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
