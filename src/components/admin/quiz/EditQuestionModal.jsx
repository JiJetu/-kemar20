import { useState, useEffect } from "react";
import { X, Plus, Trash2, RotateCcw, Save } from "lucide-react";
import { toast } from "sonner";
import { createPortal } from "react-dom";
import FormInput from "../../ui/FormInput";
import FormSelect from "../../ui/FormSelect";

export default function EditQuestionModal({ isOpen, question, onClose, onSave }) {
  const [editingQuestion, setEditingQuestion] = useState(null);

  // Synchronize when question changes or modal opens
  useEffect(() => {
    if (question) {
      setEditingQuestion({
        ...question,
        options: [...question.options],
      });
    }
  }, [question, isOpen]);

  if (!isOpen || !editingQuestion) return null;

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

    onSave(editingQuestion);
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-xl w-full max-w-lg relative text-left animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Modal header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4 shrink-0">
          <h3 className="text-lg font-bold text-[#0A2648] roboto">Edit Question</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal scrollable form body */}
        <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-4">
          {/* Question Type */}
          <FormSelect
            label="Question Type"
            labelClassName="text-xs font-bold text-slate-500 uppercase"
            defaultValue="Multiple Choice"
            className="bg-[#F1F5FD] border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-sm focus:outline-none w-full font-medium"
          >
            <option value="Multiple Choice">Multiple Choice</option>
            <option value="True / False">True / False</option>
            <option value="Short Answer">Short Answer</option>
          </FormSelect>

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
              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-[#0A2648]/30 h-20 resize-none font-medium"
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
                          ? "bg-[#0A2648] border-[#0A2648] text-white"
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

                    <FormInput
                      type="text"
                      value={opt}
                      onChange={(e) => handleModalOptionChange(oidx, e.target.value)}
                      className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-800 text-sm focus:outline-none font-medium"
                    />

                    <button
                      type="button"
                      onClick={() => handleModalRemoveOption(oidx)}
                      className="p-1 rounded-md text-red-400 hover:text-red-655 hover:bg-red-55 transition-colors cursor-pointer"
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
          <FormSelect
            label={<span>Correct Answer <span className="text-red-500">*</span></span>}
            labelClassName="text-xs font-bold text-slate-500 uppercase"
            value={editingQuestion.correctAnswer}
            onChange={(e) => handleModalCorrectChange(Number(e.target.value))}
            className="bg-[#F1F5FD] border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-sm focus:outline-none w-full font-medium"
          >
            {editingQuestion.options.map((_, oidx) => (
              <option key={oidx} value={oidx}>
                {String.fromCharCode(65 + oidx)}
              </option>
            ))}
          </FormSelect>

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
              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-[#0A2648]/30 h-24 resize-none font-medium"
              placeholder="Enter step-by-step math solutions..."
            />
          </div>
        </div>

        {/* Modal footer buttons */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-4 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 hover:bg-slate-55 text-slate-600 rounded-lg transition-colors text-sm font-semibold cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Cancel</span>
          </button>
          <button
            type="button"
            onClick={handleModalSave}
            className="flex items-center gap-1.5 px-5 py-2 bg-[#0A2648] hover:bg-[#0A2648]/90 text-white rounded-lg transition-colors shadow-sm text-sm font-bold cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
}
