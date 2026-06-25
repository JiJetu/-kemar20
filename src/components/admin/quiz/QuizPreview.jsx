import { Check } from "lucide-react";

export default function QuizPreview({ formData, questions, onPublish }) {
  return (
    <div className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-sm flex flex-col gap-6 text-left max-w-3xl mx-auto w-full animate-in fade-in duration-300">
      <div className="flex flex-col gap-1 border-b border-slate-100 pb-4">
        <h3 className="text-xl font-bold text-[#082042] roboto">Preview & Publish</h3>
        <p className="text-slate-400 text-sm lato">
          Verify the exam paper specifications before broadcasting to students.
        </p>
      </div>

      {/* Quiz Specifications Overview */}
      <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-6 text-sm roboto">
        <div className="flex justify-between border-b border-slate-200/50 pb-2 sm:border-none sm:pb-0">
          <span className="text-slate-400 font-medium">Subject</span>
          <span className="font-semibold text-slate-800">{formData.subject}</span>
        </div>
        <div className="flex justify-between border-b border-slate-200/50 pb-2 sm:border-none sm:pb-0">
          <span className="text-slate-400 font-medium">Date Selected</span>
          <span className="font-semibold text-slate-800">{formData.date}</span>
        </div>
        <div className="flex justify-between border-b border-slate-200/50 pb-2 sm:border-none sm:pb-0">
          <span className="text-slate-400 font-medium">Duration Time</span>
          <span className="font-semibold text-slate-800">{formData.duration}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400 font-medium">Number Of Questions</span>
          <span className="font-semibold text-slate-800">{formData.numQuestions}</span>
        </div>
        {formData.file && (
          <div className="flex justify-between sm:col-span-2 border-t border-slate-200/50 pt-2.5 mt-1">
            <span className="text-slate-400 font-medium">Source Document</span>
            <span className="font-semibold text-[#082042] truncate max-w-[220px] sm:max-w-[400px]">
              {formData.file.name}
            </span>
          </div>
        )}
      </div>

      {/* Final Questions list Preview */}
      <div className="flex flex-col gap-4">
        <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wide border-b border-slate-100 pb-2">
          Question sheet preview ({questions.length} questions)
        </h4>

        <div className="flex flex-col gap-5 max-h-[300px] overflow-y-auto pr-1">
          {questions.map((q, idx) => (
            <div key={q.id} className="flex flex-col gap-2">
              <h5 className="font-bold text-slate-800 text-sm">
                <span className="text-slate-400 font-medium mr-1">Q{idx + 1}.</span>
                {q.questionText}
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs ml-3">
                {q.options.map((opt, oidx) => {
                  const isCorrect = q.correctAnswer === oidx;
                  return (
                    <div
                      key={oidx}
                      className={`px-2.5 py-1.5 rounded border ${
                        isCorrect
                          ? "border-[#66A331] bg-[#EBF5E4]/20 text-[#548728] font-semibold"
                          : "border-slate-100 bg-slate-50/20 text-slate-500"
                      }`}
                    >
                      <span className="font-bold mr-1">{String.fromCharCode(65 + oidx)}.</span>
                      {opt}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="button"
        onClick={onPublish}
        className="w-full bg-[#66A331] hover:bg-[#548728] text-white font-bold py-3.5 px-4 rounded-xl shadow-sm transition-all focus:outline-none flex items-center justify-center gap-1.5 leading-none mt-2"
      >
        <Check className="w-5 h-5" />
        <span>Publish Quiz to Students</span>
      </button>
    </div>
  );
}
