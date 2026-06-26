import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit2, Trash2, X, Plus, Save, RotateCcw } from "lucide-react";
import { toast } from "sonner";

export default function QuizReview({ formData, onPublish }) {
  const navigate = useNavigate();
  // Mock questions matching the mathematical focus of the mockup
  const [questions, setQuestions] = useState([
    {
      id: 1,
      questionText: "If 2x^2 + 5x - 3 = 0, what is the value of 4x^2 + 10x?",
      options: ["6", "-6", "3", "-3"],
      correctAnswer: 1,
      solution: "2x^2 + 5x - 3 = 0 => 2x^2 + 5x = 3\n4x^2 + 10x = 2(2x^2 + 5x) = 2 * 3 = 6",
    },
    {
      id: 2,
      questionText: "If $2x + 3 = 11$, what is the value of $x$?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 2,
      solution: "2x + 3 = 11\n2x = 11 - 3 = 8\nx = 8/2 = 4",
    },
    {
      id: 3,
      questionText: "Solve for x: x^2 - 4 = 0",
      options: ["2 or -2", "4", "0", "1"],
      correctAnswer: 0,
      solution: "x^2 - 4 = 0\nx^2 = 4\nx = 2 or -2",
    },
    {
      id: 4,
      questionText: "Determine the vertex of the parabola: y = (x - 3)^2 + 5",
      options: ["(3, 5)", "(-3, 5)", "(3, -5)", "(-3, -5)"],
      correctAnswer: 0,
      solution: "The vertex form is y = a(x - h)^2 + k\nHere, h = 3 and k = 5\nTherefore, the vertex is (3, 5)",
    },
  ]);

  const [editingQuestion, setEditingQuestion] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isChangesSaved, setIsChangesSaved] = useState(false);

  // Edit / Delete operations
  const handleOpenEdit = (q) => {
    setEditingQuestion({
      ...q,
      options: [...q.options], // shallow clone options
    });
    setShowEditModal(true);
  };

  const handleDeleteQuestion = (id) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
    setIsChangesSaved(false);
    toast.success("Question deleted successfully");
  };

  // Modal handlers
  const handleModalClose = () => {
    setEditingQuestion(null);
    setShowEditModal(false);
  };

  const handleModalQuestionChange = (text) => {
    setEditingQuestion((prev) => ({ ...prev, questionText: text }));
  };

  const handleModalOptionChange = (idx, text) => {
    setEditingQuestion((prev) => {
      const opts = [...prev.options];
      opts[idx] = text;
      return { ...prev, options: opts };
    });
  };

  const handleModalAddOption = () => {
    if (editingQuestion.options.length >= 6) {
      toast.error("Maximum 6 options allowed");
      return;
    }
    setEditingQuestion((prev) => ({
      ...prev,
      options: [...prev.options, ""],
    }));
  };

  const handleModalRemoveOption = (idx) => {
    if (editingQuestion.options.length <= 2) {
      toast.error("Minimum 2 options required");
      return;
    }
    setEditingQuestion((prev) => {
      const opts = prev.options.filter((_, i) => i !== idx);
      // Adjust correct answer index if it was pointing to the deleted index
      let correct = prev.correctAnswer;
      if (correct === idx) {
        correct = 0;
      } else if (correct > idx) {
        correct -= 1;
      }
      return { ...prev, options: opts, correctAnswer: correct };
    });
  };

  const handleModalCorrectChange = (idx) => {
    setEditingQuestion((prev) => ({ ...prev, correctAnswer: idx }));
  };

  const handleModalSolutionChange = (text) => {
    setEditingQuestion((prev) => ({ ...prev, solution: text }));
  };

  const handleModalSave = () => {
    if (!editingQuestion.questionText.trim()) {
      toast.error("Question text is required");
      return;
    }
    if (editingQuestion.options.some((opt) => !opt.trim())) {
      toast.error("All options must have content");
      return;
    }
    if (!editingQuestion.solution.trim()) {
      toast.error("Solution steps are required");
      return;
    }

    setQuestions((prev) =>
      prev.map((q) => (q.id === editingQuestion.id ? editingQuestion : q))
    );
    setIsChangesSaved(false);
    setShowEditModal(false);
    toast.success("Question updated successfully");
  };

  const handleSaveChanges = () => {
    toast.success("Quiz saved as draft successfully!");
    navigate("/admin/quiz");
  };

  return (
    <div className="w-full flex flex-col gap-6 text-left max-w-5xl mx-auto select-none animate-in fade-in duration-300">
      {/* 1. Header Information Banner */}
      <div className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-sm flex items-center gap-5 w-full">
        {/* Clipboard checklist icon wrapper */}
        <div className="w-16 h-16 rounded-xl bg-[#082042] flex items-center justify-center text-white shrink-0 shadow-sm">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>

        <div className="flex flex-col text-left flex-1">
          <h2 className="text-2xl font-bold text-[#082042] roboto leading-tight">
            Exam 2026
          </h2>
          <div className="text-slate-400 text-sm font-semibold lato flex items-center gap-1.5 mt-0.5">
            <span>{formData?.subject || "Mathematics"}</span>
            <span>•</span>
            <span>{formData?.duration || "1 Hour"}</span>
          </div>
          <div className="mt-2.5 self-start">
            <span className="inline-block px-3 py-1 text-xs font-bold text-[#66A331] bg-[#EBF5E4] rounded-md border border-[#66A331]/20 lato">
              {questions.length} Questions Generated
            </span>
          </div>
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
                className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center bg-white text-slate-500 hover:text-[#082042] hover:bg-slate-50 transition-colors shadow-sm cursor-pointer"
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
            <h4 className="font-bold text-[#082042] text-lg roboto pr-20">
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
                  
                  {/* Options List */}
                  <div className="flex flex-col gap-2.5">
                    {q.options.map((opt, oidx) => {
                      const isCorrect = q.correctAnswer === oidx;
                      return (
                        <div
                          key={oidx}
                          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg border text-sm transition-all ${
                            isCorrect
                              ? "border-[#66A331] bg-[#EBF5E4]/50 text-slate-800 font-semibold shadow-sm"
                              : "border-slate-100 bg-slate-50/20 text-slate-600"
                          }`}
                        >
                          {/* Circle radio indicator */}
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 bg-white ${
                              isCorrect ? "border-[#66A331]" : "border-slate-300"
                            }`}
                          >
                            {isCorrect && <div className="w-2 h-2 rounded-full bg-[#66A331]" />}
                          </div>
                          <span className="font-bold">{String.fromCharCode(65 + oidx)}.</span>
                          <span className="flex-1 truncate">{opt}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Correct choice highlight */}
                <div className="mt-4 text-xs font-bold text-[#66A331] uppercase lato tracking-wider">
                  Correct Answer: {String.fromCharCode(65 + q.correctAnswer)}
                </div>
              </div>

              {/* Right Column: Steps Solution block */}
              <div className="bg-[#FAFBFD] border border-slate-100 rounded-xl p-5 flex flex-col gap-3.5 h-full">
                <span className="text-sm font-bold text-slate-700 lato">Solution:</span>
                <div className="flex flex-col gap-2 font-mono text-xs text-slate-600 leading-relaxed overflow-x-auto">
                  {q.solution.split("\n").map((line, lidx) => (
                    <div key={lidx} className="bg-white px-3 py-2 rounded-lg border border-slate-200/50 shadow-sm whitespace-pre">
                      {line}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* 3. Bottom Action Buttons Bar */}
      <div className="flex items-center justify-end gap-3 mt-2">
        <button
          type="button"
          onClick={handleSaveChanges}
          className="bg-[#EAEFF8] hover:bg-[#D4DFEE] text-slate-700 font-bold py-2.5 px-6 rounded-lg shadow-sm transition-all focus:outline-none roboto text-center text-sm leading-none border-none cursor-pointer"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={onPublish}
          className="bg-[#66A331] hover:bg-[#548728] text-white font-bold py-2.5 px-6 rounded-lg shadow-sm transition-all focus:outline-none roboto text-center text-sm leading-none cursor-pointer"
        >
          Publish Quiz
        </button>
      </div>

      {/* 4. Edit Question Overlay Modal popup */}
      {showEditModal && editingQuestion && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-xl w-full max-w-lg relative text-left animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            
            {/* Modal header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4 shrink-0">
              <h3 className="text-lg font-bold text-[#082042] roboto">Edit Question</h3>
              <button
                onClick={handleModalClose}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal scrollable form body */}
            <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-4">
              {/* Question Type */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Question Type</label>
                <select
                  defaultValue="Multiple Choice"
                  className="bg-[#F0F4FA] border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-sm focus:outline-none w-full font-medium"
                >
                  <option value="Multiple Choice">Multiple Choice</option>
                  <option value="True / False">True / False</option>
                  <option value="Short Answer">Short Answer</option>
                </select>
              </div>

              {/* Question text textarea */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-baseline">
                  <label className="text-xs font-bold text-slate-500 uppercase">
                    Question <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {editingQuestion.questionText.length}/1000
                  </span>
                </div>
                <textarea
                  value={editingQuestion.questionText}
                  onChange={(e) => handleModalQuestionChange(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-[#082042]/30 h-20 resize-none font-medium"
                  placeholder="Enter question text..."
                />
              </div>

              {/* Options */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Options <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col gap-2">
                  {editingQuestion.options.map((opt, oidx) => {
                    const isSelected = editingQuestion.correctAnswer === oidx;
                    return (
                      <div key={oidx} className="flex items-center gap-2">
                        {/* Custom radio circular selector with tick */}
                        <button
                          type="button"
                          onClick={() => handleModalCorrectChange(oidx)}
                          className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 cursor-pointer transition-colors ${
                            isSelected
                              ? "bg-green-500 border-green-500 text-white"
                              : "border-slate-300 bg-white text-transparent"
                          }`}
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </button>

                        <span className="text-sm font-bold text-slate-400 w-4 select-none">
                          {String.fromCharCode(65 + oidx)}.
                        </span>

                        <input
                          type="text"
                          value={opt}
                          onChange={(e) => handleModalOptionChange(oidx, e.target.value)}
                          className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-[#082042]/30 font-medium"
                        />

                        <button
                          type="button"
                          onClick={() => handleModalRemoveOption(oidx)}
                          className="p-1 rounded-md text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={handleModalAddOption}
                  className="flex items-center justify-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors py-2 border border-dashed border-blue-200 hover:border-blue-300 rounded-lg mt-1 bg-blue-50/20 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Option</span>
                </button>
              </div>

              {/* Correct Answer Dropdown */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Correct Answer <span className="text-red-500">*</span>
                </label>
                <select
                  value={editingQuestion.correctAnswer}
                  onChange={(e) => handleModalCorrectChange(Number(e.target.value))}
                  className="bg-[#F0F4FA] border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-sm focus:outline-none w-full font-medium"
                >
                  {editingQuestion.options.map((_, oidx) => (
                    <option key={oidx} value={oidx}>
                      {String.fromCharCode(65 + oidx)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Solution steps */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-baseline">
                  <label className="text-xs font-bold text-slate-500 uppercase">
                    Solution (Step by step) <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {editingQuestion.solution.length}/2000
                  </span>
                </div>
                <textarea
                  value={editingQuestion.solution}
                  onChange={(e) => handleModalSolutionChange(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-[#082042]/30 h-24 resize-none font-medium"
                  placeholder="Enter step-by-step math solutions..."
                />
              </div>
            </div>

            {/* Modal footer buttons */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-4 shrink-0">
              <button
                type="button"
                onClick={handleModalClose}
                className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg transition-colors text-sm font-semibold cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Cancel</span>
              </button>
              <button
                type="button"
                onClick={handleModalSave}
                className="flex items-center gap-1.5 px-4.5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm text-sm font-bold cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
