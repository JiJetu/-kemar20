import { useEffect } from "react";

export default function AIProcessing({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="bg-white border border-slate-200 rounded-[20px] p-12 shadow-sm min-h-[450px] flex flex-col items-center justify-center text-center w-full max-w-3xl mx-auto animate-in fade-in duration-300">
      {/* Custom CSS Spinner matching mockup */}
      <div className="w-24 h-24 border-[8px] border-slate-100 border-t-[#082042] border-r-[#082042] rounded-full animate-spin mb-8" />

      {/* Processing Text */}
      <h3 className="text-xl md:text-2xl font-bold text-[#082042] roboto mb-2.5">
        AI Is Processing Your Exam Paper...
      </h3>
      <p className="text-slate-400 text-sm lato">
        This May Take A Few Moments. Please Don't Close This Page
      </p>
    </div>
  );
}
