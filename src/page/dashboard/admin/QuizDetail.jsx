import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import DeleteConfirmModal from "../../../components/shared/DeleteConfirmModal";
import QuizDetailHeader from "../../../components/admin/quiz/QuizDetailHeader";
import QuizLeaderboard from "../../../components/admin/quiz/QuizLeaderboard";
import QuizQuestionsList from "../../../components/admin/quiz/QuizQuestionsList";

// Reusable mock generator matching QuizManagement.jsx
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

export default function QuizDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find or default mock quiz details
  const allQuizzes = useMemo(() => generateMockQuizzes(), []);
  const initialQuiz = useMemo(() => {
    return allQuizzes.find((q) => q.id === Number(id)) || {
      id: Number(id) || 1,
      title: "Math Final Exam 2026",
      subject: "Mathematics",
      questions: 20,
      duration: "1 Hour",
      status: Number(id) % 2 === 0 ? "Draft" : "Published",
      createdAt: "28 May 2025"
    };
  }, [allQuizzes, id]);

  const [quiz, setQuiz] = useState(initialQuiz);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Mock questions matching the math mockup structure
  const [questions] = useState([
    {
      id: 1,
      questionText: "If 2x^2 + 5x - 3 = 0, what is the value of 4x^2 + 10x?",
      options: ["6", "-6", "3", "-3"],
      correctAnswer: 1, // 'B'
      solution: "2x^2 + 5x - 3 = 0 => 2x^2 + 5x = 3\n4x^2 + 10x = 2(2x^2 + 5x) = 2 * 3 = 6",
    },
    {
      id: 2,
      questionText: "If 2x^2 + 5x - 3 = 0, what is the value of 4x^2 + 10x?",
      options: ["6", "-6", "3", "-3"],
      correctAnswer: 1,
      solution: "2x^2 + 5x - 3 = 0 => 2x^2 + 5x = 3\n4x^2 + 10x = 2(2x^2 + 5x) = 2 * 3 = 6",
    },
    {
      id: 3,
      questionText: "If 2x^2 + 5x - 3 = 0, what is the value of 4x^2 + 10x?",
      options: ["6", "-6", "3", "-3"],
      correctAnswer: 1,
      solution: "2x^2 + 5x - 3 = 0 => 2x^2 + 5x = 3\n4x^2 + 10x = 2(2x^2 + 5x) = 2 * 3 = 6",
    },
    {
      id: 4,
      questionText: "If 2x^2 + 5x - 3 = 0, what is the value of 4x^2 + 10x?",
      options: ["6", "-6", "3", "-3"],
      correctAnswer: 1,
      solution: "2x^2 + 5x - 3 = 0 => 2x^2 + 5x = 3\n4x^2 + 10x = 2(2x^2 + 5x) = 2 * 3 = 6",
    },
  ]);

  // Actions
  const handleBack = () => {
    navigate("/admin/quiz");
  };

  const handleDeleteConfirm = () => {
    toast.success(`Quiz "${quiz.title}" deleted successfully.`);
    setIsDeleteModalOpen(false);
    navigate("/admin/quiz");
  };

  const handleSaveChanges = () => {
    toast.success("Quiz saved as draft successfully!");
    navigate("/admin/quiz");
  };

  const handlePublish = () => {
    setQuiz((prev) => ({ ...prev, status: "Published" }));
    toast.success("Quiz has been successfully published to students!");
  };

  return (
    <div className="w-full flex flex-col gap-6 text-left max-w-5xl mx-auto select-none animate-in fade-in duration-300">
      
      {/* 1. Header Information Banner */}
      <QuizDetailHeader
        title={quiz.title}
        subject={quiz.subject}
        duration={quiz.duration}
        createdAt={quiz.createdAt}
        questionsCount={quiz.questions}
        status={quiz.status}
      />

      {/* 2. Middle Section: Student Attempt Leaderboard (Published state only) */}
      {quiz.status === "Published" && (
        <QuizLeaderboard attemptsCount={45} />
      )}

      {/* 3. Bottom Section: Questions Scrollable Container */}
      <QuizQuestionsList questions={questions} />

      {/* 4. Footer Actions Controls */}
      <div className="flex items-center justify-between mt-2 w-full border-t border-slate-100 pt-5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleBack}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-6 rounded-lg shadow-sm transition-all focus:outline-none roboto text-center text-sm leading-none border-none cursor-pointer"
          >
            Back To Quizzes
          </button>
          <button
            type="button"
            onClick={() => setIsDeleteModalOpen(true)}
            className="bg-red-50 hover:bg-red-100 text-red-600 font-bold py-2.5 px-6 rounded-lg shadow-sm transition-all focus:outline-none roboto text-center text-sm leading-none border-none cursor-pointer flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>Deleted Quizzes</span>
          </button>
        </div>

        {/* Right side save/publish only for Draft status */}
        {quiz.status === "Draft" && (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSaveChanges}
              className="bg-[#EAEFF8] hover:bg-[#D4DFEE] text-slate-700 font-bold py-2.5 px-6 rounded-lg shadow-sm transition-all focus:outline-none roboto text-center text-sm leading-none border-none cursor-pointer"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={handlePublish}
              className="bg-[#66A331] hover:bg-[#548728] text-white font-bold py-2.5 px-6 rounded-lg shadow-sm transition-all focus:outline-none roboto text-center text-sm leading-none cursor-pointer"
            >
              Publish Quiz
            </button>
          </div>
        )}
      </div>

      {/* 5. Reusable Delete Confirmation modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        title="Delete Quiz"
        message={`Are you sure you want to delete "${quiz.title}"? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsDeleteModalOpen(false)}
      />

    </div>
  );
}
