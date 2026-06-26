import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import UploadStepper from "../../../components/admin/quiz/UploadStepper";
import QuizInfoForm from "../../../components/admin/quiz/QuizInfoForm";
import PdfUploadForm from "../../../components/admin/quiz/PdfUploadForm";
import AIProcessing from "../../../components/admin/quiz/AIProcessing";
import QuizReview from "../../../components/admin/quiz/QuizReview";
import QuizPublishedSuccess from "../../../components/admin/quiz/QuizPublishedSuccess";

export default function UploadQuizPdf() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [quizMetadata, setQuizMetadata] = useState({
    book: "",
    chapter: "",
    topic: "",
    duration: "1 Hour",
    numQuestions: "20",
  });
  const [pdfFile, setPdfFile] = useState(null);
  const [formData, setFormData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [isPublished, setIsPublished] = useState(false);

  const handleInfoSubmit = (metadata) => {
    setQuizMetadata(metadata);
    setCurrentStep(2);
  };

  const handlePdfSubmit = (file) => {
    setPdfFile(file);
    const combinedData = {
      ...quizMetadata,
      pdfFile: file,
      date: new Date().toISOString().split("T")[0],
    };
    setFormData(combinedData);
    setCurrentStep(3);
  };

  const handleProcessingComplete = () => {
    setCurrentStep(4);
  };

  const handlePublishComplete = () => {
    // Show success toast and trigger the published successfully state view
    toast.success("Quiz has been successfully published to students!");
    
    // Clear details
    setQuizMetadata({
      book: "",
      chapter: "",
      topic: "",
      duration: "1 Hour",
      numQuestions: "20",
    });
    setPdfFile(null);
    setFormData(null);
    setQuestions([]);
    setIsPublished(true);
  };

  const handleViewPublishedQuiz = () => {
    setIsPublished(false);
    setCurrentStep(1);
    navigate("/quiz");
  };

  const handleGoToDashboard = () => {
    setIsPublished(false);
    setCurrentStep(1);
    navigate("/admin");
  };

  if (isPublished) {
    return (
      <QuizPublishedSuccess
        onViewQuiz={handleViewPublishedQuiz}
        onGoToDashboard={handleGoToDashboard}
      />
    );
  }

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
          <AIProcessing onComplete={handleProcessingComplete} />
        )}
        {currentStep === 4 && (
          <QuizReview
            formData={formData}
            onPublish={handlePublishComplete}
          />
        )}
      </div>
    </div>
  );
}
