import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import QuizReview from "../../../components/admin/quiz/QuizReview";

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

  const handleSaveChanges = () => {
    toast.success("Quiz saved successfully!");
    navigate("/admin/quiz");
  };

  const handleUpdateFormData = (updatedData) => {
    setQuiz((prev) => ({
      ...prev,
      title: updatedData.title !== undefined ? updatedData.title : prev.title,
      duration: updatedData.duration !== undefined ? updatedData.duration : prev.duration,
      questions: updatedData.numQuestions !== undefined ? Number(updatedData.numQuestions) : prev.questions,
    }));
  };

  const formData = useMemo(() => {
    return {
      title: quiz.title,
      classForm: "4th Form",
      quizType: quiz.status === "Published" ? "Premium" : "Free",
      duration: quiz.duration,
      numQuestions: String(quiz.questions),
      pdfFile: null,
    };
  }, [quiz]);

  return (
    <div className="w-full">
      <QuizReview
        formData={formData}
        onSave={handleSaveChanges}
        onUpdateFormData={handleUpdateFormData}
      />
    </div>
  );
}
