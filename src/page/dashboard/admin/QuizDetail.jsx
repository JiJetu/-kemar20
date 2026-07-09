import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import QuizReview from "../../../components/admin/quiz/QuizReview";
import QuizPublishedSuccess from "../../../components/admin/quiz/QuizPublishedSuccess";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import {
  useGetAdminQuizDetailsQuery,
  usePatchQuizMutation,
  usePublishQuizMutation,
} from "../../../redex/features/admin/quiz.api";

export default function QuizDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Queries & Mutations
  const { data: quizDetails, isLoading, error } = useGetAdminQuizDetailsQuery(Number(id));
  const [patchQuiz] = usePatchQuizMutation();
  const [publishQuiz] = usePublishQuizMutation();

  const [localMetadata, setLocalMetadata] = useState(null);
  const [isPublished, setIsPublished] = useState(false);

  // Sync local state when quizDetails are loaded
  useEffect(() => {
    if (quizDetails) {
      setTimeout(() => {
        setLocalMetadata({
          title: quizDetails.title || "",
          classForm: quizDetails.class_form || "4th",
          duration: quizDetails.time_limit || 60,
          numQuestions: String(quizDetails.num_questions || quizDetails.questions?.length || 0),
          bookName: quizDetails.book_name || "",
          chapter: quizDetails.chapter || "",
          topic: quizDetails.topic || "",
        });
      }, 0);
    }
  }, [quizDetails]);

  // Map backend details to the format expected by QuizReview component
  const formData = useMemo(() => {
    if (!quizDetails || !localMetadata) return null;

    const mappedQuestions = (quizDetails.questions || []).map((q, idx) => ({
      id: q.id || idx + 1,
      question_no: q.question_no || idx + 1,
      questionText: q.question_text || "No Question Text",
      options: Array.isArray(q.options) ? q.options : ["A", "B", "C", "D"],
      correctAnswer: q.correct_answer !== undefined ? Number(q.correct_answer) - 1 : 0,
      solution: Array.isArray(q.steps) ? q.steps.join("\n") : (q.solution || ""),
    }));

    return {
      id: quizDetails.id,
      title: localMetadata.title,
      classForm: localMetadata.classForm,
      duration: localMetadata.duration,
      numQuestions: localMetadata.numQuestions,
      bookName: localMetadata.bookName,
      chapter: localMetadata.chapter,
      topic: localMetadata.topic,
      pdfFile: quizDetails.reference_pdf || null,
      questions: mappedQuestions,
    };
  }, [quizDetails, localMetadata]);

  const handleUpdateFormData = (updatedData) => {
    setLocalMetadata((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        ...updatedData,
      };
    });
  };

  const handleSaveChangesComplete = async (updatedQuestions, publishVal = false) => {
    try {
      const payloadQuestions = updatedQuestions.map((q, idx) => ({
        id: q.id,
        question_no: idx + 1,
        question_text: q.questionText,
        options: q.options,
        correct_answer: q.correctAnswer + 1, // 1-indexed conversion
        steps: q.solution ? q.solution.split("\n") : [],
        chapter: localMetadata.chapter || "",
        topic: localMetadata.topic || "",
      }));

      await patchQuiz({
        id: Number(id),
        title: localMetadata.title,
        time_limit: Number(localMetadata.duration || 60),
        num_questions: Number(localMetadata.numQuestions || updatedQuestions.length),
        book_name: localMetadata.bookName,
        chapter: localMetadata.chapter,
        topic: localMetadata.topic,
        is_published: publishVal,
        questions: payloadQuestions,
      }).unwrap();

      if (publishVal) {
        toast.success("Quiz has been successfully published to students!");
        setIsPublished(true);
      } else {
        toast.success("Quiz saved successfully!");
        navigate("/admin/quiz");
      }
    } catch (err) {
      console.error("Save quiz error:", err);
      toast.error("Failed to save changes.");
    }
  };

  const handlePublishComplete = async () => {
    try {
      await publishQuiz(Number(id)).unwrap();
      toast.success("Quiz has been successfully published to students!");
      setIsPublished(true);
    } catch (err) {
      console.error("Publish error:", err);
      toast.error("Failed to publish quiz.");
    }
  };

  if (isLoading || !localMetadata) {
    return <LoadingSpinner message="Loading quiz details..." minHeight="min-h-[40vh]" />;
  }

  if (error) {
    return (
      <div className="bg-white border border-slate-200 rounded-[20px] p-8 text-center text-red-500 font-semibold shadow-sm max-w-lg mx-auto mt-12">
        Failed to load quiz details. Please return to the quiz management page.
      </div>
    );
  }

  if (isPublished) {
    return (
      <QuizPublishedSuccess
        onViewQuiz={() => {
          setIsPublished(false);
          navigate("/admin/quiz");
        }}
        onGoToDashboard={() => {
          setIsPublished(false);
          navigate("/admin");
        }}
      />
    );
  }

  return (
    <div className="w-full">
      <QuizReview
        formData={formData}
        onSave={handleSaveChangesComplete}
        onUpdateFormData={handleUpdateFormData}
        onPublish={handlePublishComplete}
      />
    </div>
  );
}
