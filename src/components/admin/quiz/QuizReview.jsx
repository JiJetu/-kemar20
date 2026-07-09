import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Edit2, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";
import { ICONS } from "../../../assets/index";
import EditQuestionModal from "./EditQuestionModal";
import EditQuizInfoModal from "./EditQuizInfoModal";
import EditPdfModal from "./EditPdfModal";
import {
  useCreateAdminQuestionMutation,
  usePatchAdminQuestionMutation,
  useDeleteAdminQuestionMutation,
} from "../../../redex/features/admin/questions.api";

export default function QuizReview({ formData, onPublish, onUpdateFormData, onSave }) {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState(formData?.questions || []);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);

  // RTK-Query CRUD Mutations
  const [createQuestion] = useCreateAdminQuestionMutation();
  const [patchQuestion] = usePatchAdminQuestionMutation();
  const [deleteQuestion] = useDeleteAdminQuestionMutation();

  useEffect(() => {
    if (formData?.questions) {
      setTimeout(() => {
        setQuestions(formData.questions);
      }, 0);
    }
  }, [formData?.questions]);

  // Edit / Delete operations
  const handleOpenEdit = (q) => {
    setEditingQuestion({
      ...q,
      options: [...q.options],
    });
    setShowEditModal(true);
  };

  const handleOpenAddQuestion = () => {
    setEditingQuestion({
      id: "new",
      questionText: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      solution: "",
    });
    setShowEditModal(true);
  };

  const handleDeleteQuestion = async (id) => {
    try {
      await deleteQuestion(id).unwrap();
      setQuestions((prev) => prev.filter((q) => q.id !== id));
      toast.success("Question deleted successfully");
    } catch (err) {
      console.error("Delete question error:", err);
      toast.error("Failed to delete question");
    }
  };

  // Modal handlers
  const handleModalClose = () => {
    setEditingQuestion(null);
    setShowEditModal(false);
  };

  const handleSaveQuestion = async (updatedQuestion) => {
    try {
      if (updatedQuestion.id === "new") {
        // Create new question on backend
        const payload = {
          quiz: formData.id,
          question_no: questions.length + 1,
          question_text: updatedQuestion.questionText,
          options: updatedQuestion.options,
          correct_answer: updatedQuestion.correctAnswer + 1, // 1-indexed
          steps: updatedQuestion.solution ? updatedQuestion.solution.split("\n") : [],
          chapter: formData.chapter || "",
          topic: formData.topic || "",
        };
        const result = await createQuestion(payload).unwrap();

        const newMappedQ = {
          id: result.id,
          questionText: result.question_text || updatedQuestion.questionText,
          options: result.options || updatedQuestion.options,
          correctAnswer: result.correct_answer !== undefined ? result.correct_answer - 1 : 0,
          solution: Array.isArray(result.steps) ? result.steps.join("\n") : (result.steps || ""),
        };
        setQuestions((prev) => [...prev, newMappedQ]);
        toast.success("Question created successfully");
      } else {
        // Update existing question on backend
        const payload = {
          id: updatedQuestion.id,
          quiz: formData.id,
          question_no: updatedQuestion.question_no || 1,
          question_text: updatedQuestion.questionText,
          options: updatedQuestion.options,
          correct_answer: updatedQuestion.correctAnswer + 1, // 1-indexed
          steps: updatedQuestion.solution ? updatedQuestion.solution.split("\n") : [],
          chapter: formData.chapter || "",
          topic: formData.topic || "",
        };
        await patchQuestion(payload).unwrap();

        setQuestions((prev) =>
          prev.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
        );
        toast.success("Question updated successfully");
      }
      setShowEditModal(false);
      setEditingQuestion(null);
    } catch (err) {
      console.error("Save question error:", err);
      toast.error("Failed to save question");
    }
  };

  const handleSaveQuizInfo = (updatedInfo) => {
    onUpdateFormData?.(updatedInfo);
    setShowInfoModal(false);
    toast.success("Quiz information updated successfully!");
  };

  const handleSavePdf = (newFile) => {
    onUpdateFormData?.({ pdfFile: newFile });
    setShowPdfModal(false);
    toast.success("Exam PDF file updated successfully!");
  };

  const handleSaveChanges = () => {
    if (onSave) {
      onSave(questions, false);
    } else {
      toast.success("Quiz saved as draft successfully!");
      navigate("/admin/quiz");
    }
  };

  const handlePublishClick = () => {
    if (onSave) {
      onSave(questions, true);
    } else if (onPublish) {
      onPublish();
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 text-left max-w-7xl mx-auto select-none animate-in fade-in duration-300">
      {/* 1. Header Information Banner */}
      <div className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-sm flex items-center justify-between w-full">
        <div className="flex items-center gap-5">
          {/* Clipboard checklist icon wrapper */}
          <div className="w-16 h-16 rounded-xl bg-[#0A2648] flex items-center justify-center text-white shrink-0 shadow-sm">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>

          <div className="flex flex-col text-left">
            <h2 className="text-xl font-bold text-[#0A2648] roboto leading-tight">
              {formData?.title || "Mathematics Diagnostic Exam"}
            </h2>
            <div className="flex flex-wrap items-center mt-3 text-left gap-y-2">
              <div className="flex flex-col pr-6 border-r border-slate-200">
                <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Class</span>
                <span className="text-[#0A2648] font-bold text-sm mt-0.5">
                  {formData?.classForm ? `${formData.classForm} Grade` : "4th Grade"}
                </span>
              </div>
              <div className="flex flex-col px-6 border-r border-slate-200">
                <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">No Of Questions</span>
                <span className="text-[#0A2648] font-bold text-sm mt-0.5">{questions.length}</span>
              </div>
              <div className="flex flex-col px-6">
                <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Time Duration</span>
                <span className="text-[#0A2648] font-bold text-sm mt-0.5">{formData?.duration} min</span>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center mt-3 pt-3 border-t border-slate-100 text-left gap-y-2 w-full">
              <div className="flex flex-col pr-6 border-r border-slate-200 max-w-[320px]">
                <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider truncate">Book Name</span>
                <span className="text-[#0A2648] font-bold text-sm mt-0.5 truncate" title={formData?.bookName}>
                  {formData?.bookName === "volume1"
                    ? "Mathematics-a-Complete-Course-With-CXC-Questions-Volume-1"
                    : formData?.bookName === "volume2"
                    ? "Mathematics-a-Complete-Course-With-CXC-Questions-Volume-2"
                    : (formData?.bookName || "N/A")}
                </span>
              </div>
              <div className="flex flex-col px-6 border-r border-slate-200 max-w-[200px]">
                <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider truncate">Chapter</span>
                <span className="text-[#0A2648] font-bold text-sm mt-0.5 truncate" title={formData?.chapter}>
                  {formData?.chapter || "N/A"}
                </span>
              </div>
              <div className="flex flex-col px-6 max-w-[240px]">
                <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider truncate">Topic</span>
                <span className="text-[#0A2648] font-bold text-sm mt-0.5 truncate" title={formData?.topic}>
                  {formData?.topic || "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowInfoModal(true)}
          className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-[#0A2648] transition-colors cursor-pointer select-none self-start mt-1"
        >
          <span>Edit Information</span>
          <Edit2 className="w-4 h-4" />
        </button>
      </div>

      {/* 1.5. Uploaded PDF Preview Card */}
      <div className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-sm flex flex-col gap-4 w-full">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <h3 className="text-lg font-bold text-[#0A2648] roboto">Uploaded</h3>
          <button
            type="button"
            onClick={() => setShowPdfModal(true)}
            className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-[#0A2648] transition-colors cursor-pointer select-none"
          >
            <span>Change</span>
            <Edit2 className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="bg-[#F1F5FD] rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={ICONS.pdf} alt="PDF icon" className="w-8 h-8 object-contain shrink-0" />
            <div className="flex flex-col text-left">
              <span className="font-bold text-slate-800 text-sm truncate max-w-[200px] sm:max-w-[400px]">
                {formData?.pdfFile?.name || "Math-Final -2026 Pdf"}
              </span>
              <span className="text-slate-400 text-xs mt-0.5">
                {formData?.pdfFile?.size ? `${(formData.pdfFile.size / (1024 * 1024)).toFixed(2)} Mb` : "2.45 Mb"}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              if (formData?.pdfFile) {
                if (formData.pdfFile instanceof File) {
                  const url = URL.createObjectURL(formData.pdfFile);
                  window.open(url, "_blank");
                } else if (typeof formData.pdfFile === "string") {
                  window.open(formData.pdfFile, "_blank");
                } else if (formData.pdfFile.url) {
                  window.open(formData.pdfFile.url, "_blank");
                }
              } else {
                toast.info("No file uploaded to preview");
              }
            }}
            className="border border-[#1877F2] hover:bg-[#1877F2]/5 text-[#1877F2] bg-white transition-all px-4 py-2 rounded-[6px] text-xs font-bold shadow-sm cursor-pointer"
          >
            Preview PDF
          </button>
        </div>
      </div>

      {/* 2. Questions Scrollable Container */}
      <div className="flex flex-col gap-5 max-h-[620px] overflow-y-auto pr-2">
        {questions.map((q, idx) => (
          <div
            key={q.id}
            className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-sm relative flex flex-col gap-4 animate-in fade-in duration-200"
          >
            {/* Top-Right Action Controls */}
            <div className="absolute top-6 right-6 flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleOpenEdit(q)}
                className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center bg-white text-slate-500 hover:text-[#0A2648] hover:bg-slate-50 transition-colors shadow-sm cursor-pointer"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleDeleteQuestion(q.id)}
                className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center bg-white text-red-500 hover:bg-red-50 transition-colors shadow-sm cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Question Label Header */}
            <h4 className="font-bold text-[#0A2648] text-lg roboto pr-20">
              Q{idx + 1}.<span className="text-slate-400 text-sm font-semibold ml-1">(MCQ)</span>
            </h4>

            {/* Two-Column split details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              
              {/* Left Column: Question text & choices */}
              <div className="flex flex-col justify-between">
                <div>
                  <p className="text-slate-800 text-sm md:text-base font-semibold roboto mb-4 leading-relaxed">
                    {q.questionText}
                  </p>
                  
                  {/* Options List in 2x2 Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {q.options.map((opt, oidx) => {
                      const isCorrect = q.correctAnswer === oidx;
                      return (
                        <div
                          key={oidx}
                          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg border text-sm transition-all ${
                            isCorrect
                              ? "border-[#D1EBD0] bg-[#E2F4DF] text-[#39842B] font-semibold"
                              : "border-slate-200 bg-white text-slate-600 hover:border-slate-350"
                          }`}
                        >
                          {/* Circle radio indicator */}
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              isCorrect ? "border-[#39842B] bg-[#39842B]" : "border-slate-300 bg-white"
                            }`}
                          >
                            {isCorrect && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <span className="font-bold">{String.fromCharCode(65 + oidx)}.</span>
                          <span className="flex-1 truncate">{opt}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Correct choice highlight */}
                <div className="mt-4 text-sm font-bold text-[#39842B] uppercase lato tracking-wider text-left">
                  Correct Answer: {String.fromCharCode(65 + q.correctAnswer)}
                </div>
              </div>

              {/* Right Column: Steps Solution block */}
              <div className="bg-[#FAFBFD] border border-slate-100 rounded-xl p-5 flex flex-col gap-2 h-full text-left">
                <span className="text-sm font-bold text-slate-700 lato">Solution:</span>
                <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line font-medium">
                  {q.solution}
                </p>
              </div>

            </div>
          </div>
        ))}

        {/* Add Question Button inside the container */}
        <button
          type="button"
          onClick={handleOpenAddQuestion}
          className="flex items-center justify-center gap-2 border border-dashed border-[#0A2648]/30 hover:border-[#0A2648] bg-white hover:bg-slate-50 text-[#0A2648] py-4 rounded-[20px] shadow-sm transition-all text-sm font-bold cursor-pointer mb-2 shrink-0 select-none"
        >
          <Plus className="w-4 h-4" /> Add New Question
        </button>
      </div>

      {/* 3. Bottom Action Buttons Bar */}
      <div className="flex items-center justify-end gap-3 mt-2">
        <button
          type="button"
          onClick={handleSaveChanges}
          className="bg-[#F1F5FD] hover:bg-slate-100 text-[#0A2648] font-bold py-2.5 px-6 rounded-lg shadow-sm border border-slate-200 transition-all text-sm leading-none cursor-pointer"
        >
          Save Changes
        </button>
        {onPublish && (
          <button
            type="button"
            onClick={handlePublishClick}
            className="bg-[#66A331] hover:bg-[#66A331]/95 text-white font-bold py-2.5 px-6 rounded-lg shadow-sm transition-all text-sm leading-none cursor-pointer"
          >
            Publish Quiz
          </button>
        )}
      </div>

      {/* 4. Edit/Create Question Overlay Modal popup */}
      <EditQuestionModal
        isOpen={showEditModal}
        question={editingQuestion}
        onClose={handleModalClose}
        onSave={handleSaveQuestion}
      />
      <EditQuizInfoModal
        isOpen={showInfoModal}
        data={{
          title: formData?.title || "",
          classForm: formData?.classForm || "",
          duration: formData?.duration || "",
          numQuestions: formData?.numQuestions || String(questions.length),
          bookName: formData?.bookName || "",
          chapter: formData?.chapter || "",
          topic: formData?.topic || "",
        }}
        onClose={() => setShowInfoModal(false)}
        onSave={handleSaveQuizInfo}
      />
      <EditPdfModal
        isOpen={showPdfModal}
        currentFile={formData?.pdfFile}
        onClose={() => setShowPdfModal(false)}
        onSave={handleSavePdf}
      />
    </div>
  );
}
