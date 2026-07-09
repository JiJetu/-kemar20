import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import UploadStepper from "../../../components/admin/quiz/UploadStepper";
import QuizInfoForm from "../../../components/admin/quiz/QuizInfoForm";
import PdfUploadForm from "../../../components/admin/quiz/PdfUploadForm";
import AIProcessing from "../../../components/admin/quiz/AIProcessing";
import QuizReview from "../../../components/admin/quiz/QuizReview";
import QuizPublishedSuccess from "../../../components/admin/quiz/QuizPublishedSuccess";
import {
  useCreateQuizMutation,
  useGetAdminQuizDetailsQuery,
  useUpdateQuizMutation,
  usePatchQuizMutation,
} from "../../../redex/features/admin/quiz.api";

export default function UploadQuizPdf() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [quizMetadata, setQuizMetadata] = useState({
    title: "",
    classForm: "",
    duration: "",
    numQuestions: "",
    bookName: "",
    chapter: "",
    topic: "",
  });
  const [pdfFile, setPdfFile] = useState(null);
  const [formData, setFormData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [isPublished, setIsPublished] = useState(false);
  const [activeQuizId, setActiveQuizId] = useState(null);

  // RTK-Query endpoints
  const [createQuiz, { isLoading: isCreating }] = useCreateQuizMutation();
  const [updateQuiz] = useUpdateQuizMutation();
  const [patchQuiz] = usePatchQuizMutation();

  // Background status polling (runs every 5 seconds when activeQuizId is active)
  const { data: polledQuizDetails } = useGetAdminQuizDetailsQuery(activeQuizId, {
    skip: !activeQuizId,
    pollingInterval: 5000,
  });

  // Watch background polling results
  useEffect(() => {
    if (!polledQuizDetails) return;

    const currentStatus = polledQuizDetails.status?.toLowerCase();

    // Keep polling while status is pending or generating
    if (currentStatus !== "pending" && currentStatus !== "generating") {
      setTimeout(() => {
        // Clear active ID to stop polling
        setActiveQuizId(null);

        if (currentStatus === "failed" || polledQuizDetails.generation_error) {
          toast.error(polledQuizDetails.generation_error || "AI generation failed. Please try a different document.");
          setCurrentStep(2); // send back to PDF upload step
        } else {
          // Success: map questions returned from database
          const mappedQuestions = (polledQuizDetails.questions || []).map((q, idx) => ({
            id: q.id || idx + 1,
            questionText: q.question_text || "No Question Text",
            options: Array.isArray(q.options) ? q.options : ["A", "B", "C", "D"],
            correctAnswer: q.correct_answer !== undefined ? Number(q.correct_answer) - 1 : 0,
            solution: Array.isArray(q.steps) ? q.steps.join("\n") : (q.solution || ""),
          }));

          setQuestions(mappedQuestions);
          setFormData({
            ...quizMetadata,
            id: polledQuizDetails.id,
            pdfFile: pdfFile,
            title: polledQuizDetails.title || quizMetadata.title,
            questions: mappedQuestions,
          });

          toast.success("AI generated the quiz questions successfully!");
        }
      }, 0);
    }
  }, [polledQuizDetails, quizMetadata, pdfFile]);

  const handleInfoSubmit = (metadata) => {
    setQuizMetadata(metadata);
    setCurrentStep(2);
  };

  const handlePdfSubmit = async (file) => {
    setPdfFile(file);

    // Build standard multipart FormData payload
    const postData = new FormData();
    postData.append("title", quizMetadata.title);
    postData.append("description", quizMetadata.title || "");
    postData.append("book_name", quizMetadata.bookName);
    postData.append("chapter", quizMetadata.chapter);
    postData.append("topic", quizMetadata.topic);
    postData.append("num_questions", Number(quizMetadata.numQuestions));
    postData.append("time_limit", Number(quizMetadata.duration || 60));
    postData.append("is_published", "false"); // Draft initially

    if (file) {
      postData.append("reference_pdf", file);
    }

    try {
      setCurrentStep(3); // Transition to loader spinner screen
      const result = await createQuiz(postData).unwrap();
      const initialStatus = result.status?.toLowerCase();

      if (initialStatus === "pending" || initialStatus === "generating") {
        // Start polling the single quiz details endpoint
        setActiveQuizId(result.id);
      } else {
        // Immediate completion (fallback)
        const mappedQuestions = (result.questions || []).map((q, idx) => ({
          id: q.id || idx + 1,
          questionText: q.question_text || "No Question Text",
          options: Array.isArray(q.options) ? q.options : ["A", "B", "C", "D"],
          correctAnswer: q.correct_answer !== undefined ? Number(q.correct_answer) - 1 : 0,
          solution: Array.isArray(q.steps) ? q.steps.join("\n") : (q.solution || ""),
        }));

        setQuestions(mappedQuestions);
        setFormData({
          ...quizMetadata,
          id: result.id,
          pdfFile: file,
          title: result.title || quizMetadata.title,
          questions: mappedQuestions,
        });
        toast.success("AI generated the quiz questions successfully!");
      }
    } catch (err) {
      console.error("Create quiz error:", err);
      toast.error(err?.data?.detail || err?.data?.message || "Failed to process PDF exam paper. Please check that you uploaded a valid PDF.");
      setCurrentStep(2); // Fallback to Upload step
    }
  };

  const handleProcessingComplete = () => {
    setCurrentStep(4);
  };

  const handlePublishComplete = async () => {
    if (formData?.id) {
      try {
        await patchQuiz({ id: formData.id, is_published: true }).unwrap();
        toast.success("Quiz has been successfully published to students!");
        setIsPublished(true);
      } catch (err) {
        console.error("Publish error:", err);
        toast.error("Failed to publish quiz.");
      }
    } else {
      toast.success("Quiz has been successfully published to students!");
      setIsPublished(true);
    }
  };

  const handleViewPublishedQuiz = () => {
    setIsPublished(false);
    setCurrentStep(1);
    navigate("/admin/quiz");
  };

  const handleGoToDashboard = () => {
    setIsPublished(false);
    setCurrentStep(1);
    navigate("/admin");
  };

  const handleUpdateFormData = (updatedData) => {
    setFormData((prev) => ({
      ...prev,
      ...updatedData,
    }));
    if (updatedData.pdfFile) {
      setPdfFile(updatedData.pdfFile);
    }
    setQuizMetadata((prev) => ({
      ...prev,
      ...updatedData,
    }));
  };

  const handleSaveChangesComplete = async (updatedQuestions) => {
    if (formData?.id) {
      try {
        const payloadQuestions = updatedQuestions.map((q, idx) => ({
          question_no: idx + 1,
          question_text: q.questionText,
          options: q.options,
          correct_answer: q.correctAnswer + 1,
          steps: q.solution ? q.solution.split("\n") : [],
        }));

        await updateQuiz({
          id: formData.id,
          title: formData.title,
          class_form: formData.classForm,
          time_limit: Number(formData.duration || 60),
          num_questions: Number(formData.numQuestions || updatedQuestions.length),
          book_name: formData.bookName,
          chapter: formData.chapter,
          topic: formData.topic,
          is_published: false,
          questions: payloadQuestions,
        }).unwrap();

        toast.success("Quiz saved as draft successfully!");
        navigate("/admin/quiz");
      } catch (err) {
        console.error("Save draft error:", err);
        toast.error("Failed to save changes.");
      }
    } else {
      toast.success("Quiz saved as draft successfully!");
      navigate("/admin/quiz");
    }
  };

  if (isPublished) {
    return (
      <QuizPublishedSuccess
        onViewQuiz={handleViewPublishedQuiz}
        onGoToDashboard={handleGoToDashboard}
      />
    );
  }

  const questionCount = polledQuizDetails?.question_count || polledQuizDetails?.questions?.length || 0;
  const totalQuestions = polledQuizDetails?.num_questions || Number(quizMetadata?.numQuestions) || 0;

  return (
    <div className="w-full flex flex-col gap-6 text-left max-w-7xl mx-auto select-none">
      {/* Stepper header stays at the top of the content */}
      <div className="sticky top-0 z-10 bg-slate-50/80 backdrop-blur-sm pb-2">
        <UploadStepper currentStep={currentStep} />
      </div>

      {/* Current Step Content Area */}
      <div className="w-full flex-1">
        {currentStep === 1 && (
          <QuizInfoForm onSubmitData={handleInfoSubmit} defaultValues={quizMetadata} />
        )}
        {currentStep === 2 && (
          <PdfUploadForm onSubmitFile={handlePdfSubmit} defaultFile={pdfFile} />
        )}
        {currentStep === 3 && (
          <AIProcessing 
            onComplete={handleProcessingComplete} 
            isLoading={isCreating || !!activeQuizId} 
            questionCount={questionCount}
            totalQuestions={totalQuestions}
          />
        )}
        {currentStep === 4 && (
          <QuizReview
            formData={formData}
            onPublish={handlePublishComplete}
            onGoToStep={setCurrentStep}
            onUpdateFormData={handleUpdateFormData}
            onSave={handleSaveChangesComplete}
          />
        )}
      </div>
    </div>
  );
}
