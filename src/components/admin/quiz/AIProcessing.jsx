import { useState, useEffect } from "react";

export default function AIProcessing({ onComplete }) {
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDone(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white border border-slate-200 rounded-[20px] p-12 shadow-sm min-h-[420px] flex flex-col items-center justify-center text-center w-full max-w-3xl mx-auto animate-in fade-in duration-300">
      {!isDone ? (
        <>
          {/* Custom CSS Spinner matching mockup */}
          <div className="w-24 h-24 border-[8px] border-slate-100 border-t-[#082042] border-r-[#082042] rounded-full animate-spin mb-8" />

          {/* Processing Text */}
          <h3 className="text-xl md:text-2xl font-bold text-[#082042] roboto mb-2.5">
            AI Is Processing Your Exam Paper...
          </h3>
          <p className="text-slate-400 text-sm lato">
            This May Take A Few Moments. Please Don't Close This Page
          </p>
        </>
      ) : (
        <>
          {/* Success Confetti Animation Card */}
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

            {/* Sparkles / Confetti Star shapes surrounding success check */}
            <span className="absolute top-2 left-4 text-yellow-500 text-lg animate-bounce select-none">✦</span>
            <span className="absolute top-6 right-2 text-blue-500 text-sm select-none font-bold rotate-45">★</span>
            <span className="absolute bottom-6 left-2 text-red-500 text-base select-none rotate-12">★</span>
            <span className="absolute bottom-3 right-6 text-green-500 text-lg select-none rotate-[30deg]">✦</span>
            <span className="absolute top-1 right-12 text-purple-400 text-sm select-none">●</span>
            <span className="absolute bottom-1 left-12 text-orange-400 text-xs select-none">▲</span>
            <span className="absolute top-16 left-[-10px] text-teal-400 text-base select-none">■</span>
          </div>

          {/* Success Text */}
          <h3 className="text-xl md:text-2xl font-bold text-[#082042] roboto mb-2.5">
            Quiz Generated Successfully
          </h3>
          <p className="text-slate-400 text-sm lato max-w-md mb-8">
            We have generated questions, answer, and solutions from your exam paper
          </p>

          <button
            type="button"
            onClick={onComplete}
            className="bg-[#082042] hover:bg-[#0c2f5d] text-white font-bold py-3.5 px-10 rounded-xl shadow-sm transition-all focus:outline-none roboto text-center leading-none"
          >
            Continue to Preview
          </button>
        </>
      )}
    </div>
  );
}
