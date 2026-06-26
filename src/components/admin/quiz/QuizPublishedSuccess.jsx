export default function QuizPublishedSuccess({ onViewQuiz, onGoToDashboard }) {
  return (
    <div className="w-full flex flex-col gap-6 text-left max-w-3xl mx-auto select-none animate-in fade-in duration-300 min-h-[420px] justify-center items-center">
      <div className="bg-white border border-slate-200 rounded-[20px] p-12 shadow-sm flex flex-col items-center justify-center text-center w-full max-w-3xl mx-auto">
        
        {/* Success Checkmark Circle with Confetti Stars */}
        <div className="relative mb-8 flex items-center justify-center w-36 h-36">
          {/* Outer pulse rings */}
          <div className="absolute w-24 h-24 rounded-full bg-green-100 animate-ping opacity-25" />
          <div className="absolute w-20 h-20 rounded-full bg-green-50 animate-pulse" />
          
          {/* Core checkmark circle */}
          <div className="relative w-16 h-16 rounded-full bg-[#66A331] flex items-center justify-center shadow-sm">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Sparkles / Confetti Star shapes */}
          <span className="absolute top-2 left-4 text-yellow-500 text-lg animate-bounce select-none">✦</span>
          <span className="absolute top-6 right-2 text-blue-500 text-sm select-none font-bold rotate-45">★</span>
          <span className="absolute bottom-6 left-2 text-red-500 text-base select-none rotate-12">★</span>
          <span className="absolute bottom-3 right-6 text-green-500 text-lg select-none rotate-[30deg]">✦</span>
          <span className="absolute top-1 right-12 text-purple-400 text-sm select-none">●</span>
          <span className="absolute bottom-1 left-12 text-orange-400 text-xs select-none">▲</span>
          <span className="absolute top-16 left-[-10px] text-teal-400 text-base select-none">■</span>
        </div>

        {/* Success Description Text */}
        <h3 className="text-2xl font-bold text-[#082042] roboto mb-2.5">
          Quiz Published Successfully
        </h3>
        <p className="text-slate-400 text-sm lato max-w-md mb-8 leading-relaxed">
          The Quiz Has Been Published And Is Now Available For Students
        </p>

        {/* Action buttons */}
        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={onViewQuiz}
            className="border border-slate-200 bg-[#F0F4FA]/50 hover:bg-[#F0F4FA] text-[#082042] font-bold py-2.5 px-6 rounded-lg shadow-sm transition-all text-sm roboto cursor-pointer animate-none"
          >
            View Published Quiz
          </button>
          <button
            type="button"
            onClick={onGoToDashboard}
            className="bg-[#66A331] hover:bg-[#548728] text-white font-bold py-2.5 px-6 rounded-lg shadow-sm transition-all text-sm roboto cursor-pointer animate-none"
          >
            Go To Dashboard
          </button>
        </div>

      </div>
    </div>
  );
}
