import { useState } from "react";
import { Edit2, ChevronRight } from "lucide-react";

export default function QuizReview({ formData, onComplete }) {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      questionText: "What is the primary role of a supervisor in project management?",
      options: [
        "To assign tasks and manage resources",
        "To perform code audits and write specifications",
        "To write test cases and validate outputs",
        "To organize community social events",
      ],
      correctAnswer: 0,
    },
    {
      id: 2,
      questionText: "Which of the following is considered a best practice for API security?",
      options: [
        "Storing API keys in client-side source files",
        "Disabling CORS controls globally",
        "Implementing token-based authentication and rate limiting",
        "Using HTTP instead of HTTPS",
      ],
      correctAnswer: 2,
    },
    {
      id: 3,
      questionText: "What does the term 'CI/CD' stand for in software engineering?",
      options: [
        "Continuous Integration and Continuous Deployment",
        "Code Inspection and Concurrent Development",
        "Client Interaction and Core Database",
        "Computed Instance and Cloud Directory",
      ],
      correctAnswer: 0,
    },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [editedQuestion, setEditedQuestion] = useState(null);

  const startEdit = (q) => {
    setEditingId(q.id);
    setEditedQuestion({ ...q });
  };

  const saveEdit = () => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === editingId ? editedQuestion : q))
    );
    setEditingId(null);
    setEditedQuestion(null);
  };

  const handleTextChange = (text) => {
    setEditedQuestion((prev) => ({ ...prev, questionText: text }));
  };

  const handleOptionChange = (idx, val) => {
    setEditedQuestion((prev) => {
      const opts = [...prev.options];
      opts[idx] = val;
      return { ...prev, options: opts };
    });
  };

  const handleCorrectChange = (idx) => {
    setEditedQuestion((prev) => ({ ...prev, correctAnswer: idx }));
  };

  const handleProceed = () => {
    onComplete(questions);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-sm flex flex-col gap-6 text-left max-w-3xl mx-auto w-full animate-in fade-in duration-300">
      <div className="flex flex-col gap-1 border-b border-slate-100 pb-4">
        <h3 className="text-xl font-bold text-[#082042] roboto">Generate Quiz</h3>
        <p className="text-slate-400 text-sm lato">
          Review and edit the AI-generated questions for <span className="font-semibold text-[#082042]">{formData.subject}</span>.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {questions.map((q, qidx) => {
          const isEditing = editingId === q.id;
          const current = isEditing ? editedQuestion : q;

          return (
            <div
              key={q.id}
              className={`border rounded-xl p-4 transition-all ${
                isEditing ? "border-[#082042] bg-slate-50/50" : "border-slate-200"
              }`}
            >
              {isEditing ? (
                // Edit Mode
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Question {qidx + 1}</label>
                    <input
                      type="text"
                      value={current.questionText}
                      onChange={(e) => handleTextChange(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-[#082042]/30"
                    />
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Options (Select Correct Answer)</label>
                    {current.options.map((opt, oidx) => (
                      <div key={oidx} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`correct-${q.id}`}
                          checked={current.correctAnswer === oidx}
                          onChange={() => handleCorrectChange(oidx)}
                          className="w-4 h-4 text-[#082042] focus:ring-[#082042]/30 border-slate-300 cursor-pointer"
                        />
                        <span className="text-sm font-bold text-slate-400 w-5">{String.fromCharCode(65 + oidx)}.</span>
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) => handleOptionChange(oidx, e.target.value)}
                          className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-[#082042]/30"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="px-3.5 py-1.5 text-xs font-semibold text-slate-500 hover:bg-slate-100 rounded-lg transition-colors border border-transparent"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={saveEdit}
                      className="px-3.5 py-1.5 text-xs font-semibold bg-[#082042] hover:bg-[#0c2f5d] text-white rounded-lg transition-colors shadow-sm"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                // View Mode
                <div className="flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="font-bold text-slate-800 text-base leading-snug">
                      <span className="text-slate-400 mr-1.5 font-medium">Q{qidx + 1}.</span>
                      {q.questionText}
                    </h4>
                    <button
                      type="button"
                      onClick={() => startEdit(q)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shrink-0"
                    >
                      <Edit2 className="w-4.5 h-4.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
                    {q.options.map((opt, oidx) => {
                      const isCorrect = q.correctAnswer === oidx;
                      return (
                        <div
                          key={oidx}
                          className={`flex items-start gap-2.5 p-2 rounded-lg border text-sm ${
                            isCorrect
                              ? "border-[#66A331] bg-[#EBF5E4]/40 text-[#548728] font-semibold"
                              : "border-slate-100 bg-slate-50/30 text-slate-600"
                          }`}
                        >
                          <span className="font-bold">{String.fromCharCode(65 + oidx)}.</span>
                          <span className="flex-1">{opt}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={handleProceed}
        className="w-full bg-[#082042] hover:bg-[#0c2f5d] text-white font-bold py-3.5 px-4 rounded-xl shadow-sm transition-all focus:outline-none flex items-center justify-center gap-1.5 leading-none mt-2"
      >
        <span>Preview & Confirm Quiz</span>
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
