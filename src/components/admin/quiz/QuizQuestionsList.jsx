export default function QuizQuestionsList({ questions }) {
  return (
    <div className="flex flex-col gap-5 max-h-[580px] overflow-y-auto pr-2 custom-scrollbar">
      {questions.map((q, idx) => (
        <div
          key={q.id}
          className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-sm flex flex-col gap-4 animate-in fade-in duration-200"
        >
          {/* Question Label Header */}
          <h4 className="font-bold text-secondary text-lg roboto">
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
                            ? "border-[#137333] bg-[#E6F4EA]/50 text-slate-800 font-semibold shadow-sm"
                            : "border-slate-100 bg-slate-50/20 text-slate-600"
                        }`}
                      >
                        {/* Circle radio indicator with selected dot */}
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 bg-white ${
                            isCorrect ? "border-[#137333]" : "border-slate-300"
                          }`}
                        >
                          {isCorrect && <div className="w-2 h-2 rounded-full bg-[#137333]" />}
                        </div>
                        <span className="font-bold">{String.fromCharCode(65 + oidx)}.</span>
                        <span className="flex-1 truncate">{opt}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Correct choice highlight */}
              <div className="mt-4 text-xs font-bold text-[#137333] uppercase lato tracking-wider">
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
  );
}
