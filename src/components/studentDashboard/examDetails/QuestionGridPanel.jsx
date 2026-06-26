
export default function QuestionGridPanel({
  mockQuestions,
  currentQIndex,
  answers,
  visitedQuestions,
  setCurrentQIndex
}) {
  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 flex flex-col shadow-sm w-full select-none">
      {/* Header */}
      <h3 className="text-[#082042] text-lg font-bold mb-4 text-left lora">
        Question List
      </h3>

      {/* Key Indicators */}
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 bg-[#66A331] rounded shrink-0" />
          <span className="text-xs text-slate-500 font-semibold roboto">
            Answered
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 bg-[#082042] rounded shrink-0" />
          <span className="text-xs text-slate-500 font-semibold roboto">
            Current
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 bg-red-500 rounded shrink-0" />
          <span className="text-xs text-slate-500 font-semibold roboto">
            Skipped
          </span>
        </div>
      </div>

      {/* 5-Column Navigation Grid */}
      <div className="grid grid-cols-5 gap-3">
        {mockQuestions.map((item, idx) => {
          const isActive = currentQIndex === idx;
          const isAnswered = answers[idx] !== null;
          const isSkipped = visitedQuestions.includes(idx) && answers[idx] === null;

          let btnStyles = "bg-white border-slate-200 text-slate-700 hover:border-slate-300";
          if (isActive) {
            btnStyles = "bg-[#082042] border-[#082042] text-white font-bold";
          } else if (isAnswered) {
            btnStyles = "bg-[#E1EBCF] border-[#66A331] text-[#66A331] font-bold";
          } else if (isSkipped) {
            btnStyles = "bg-red-100 border-red-500 text-red-600 font-bold";
          }

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setCurrentQIndex(idx)}
              className={`aspect-square w-full rounded-lg border text-sm font-semibold flex items-center justify-center transition-all ${btnStyles}`}
            >
              {item.id}
            </button>
          );
        })}
      </div>
    </div>
  );
}
