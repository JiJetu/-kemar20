import { useState } from "react";
import { toast } from "sonner";
import UploadStepper from "../../../components/admin/quiz/UploadStepper";
import UploadForm from "../../../components/admin/quiz/UploadForm";
import AIProcessing from "../../../components/admin/quiz/AIProcessing";
import QuizReview from "../../../components/admin/quiz/QuizReview";
import QuizPreview from "../../../components/admin/quiz/QuizPreview";

export default function UploadQuizPdf() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(null);
  const [questions, setQuestions] = useState([]);

  const handleUploadSubmit = (data) => {
    setFormData(data);
    setCurrentStep(2);
  };

  const handleProcessingComplete = () => {
    setCurrentStep(3);
  };

  const handleReviewComplete = (reviewedQuestions) => {
    setQuestions(reviewedQuestions);
    setCurrentStep(4);
  };

  const handlePublishComplete = () => {
    toast.success("Quiz has been successfully published to students!");
    // Reset wizard
    setFormData(null);
    setQuestions([]);
    setCurrentStep(1);
  };

  return (
    <div className="w-full flex flex-col gap-6 text-left max-w-5xl mx-auto select-none">
      {/* Stepper header stays at the top of the content */}
      <div className="sticky top-0 z-10 bg-slate-50/80 backdrop-blur-sm pb-2">
        <UploadStepper currentStep={currentStep} />
      </div>

      {/* Current Step Content Area */}
      <div className="w-full flex-1">
        {currentStep === 1 && (
          <UploadForm onSubmitData={handleUploadSubmit} />
        )}
        {currentStep === 2 && (
          <AIProcessing onComplete={handleProcessingComplete} />
        )}
        {currentStep === 3 && (
          <QuizReview
            formData={formData}
            onComplete={handleReviewComplete}
          />
        )}
        {currentStep === 4 && (
          <QuizPreview
            formData={formData}
            questions={questions}
            onPublish={handlePublishComplete}
          />
        )}
      </div>
    </div>
  );
}
