import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { toast } from "sonner";
import { parseMathEquation } from "../../../lib/utils/math";
import { ICONS } from "../../../assets";

const MathPracticeSession = ({
  currentQuestionData,
  currentQIndex,
  totalQuestions,
  selectedOption,
  setSelectedOption,
  showSolutionPanel,
  setShowSolutionPanel,
  onPrev,
  onNext,
}) => {
  const [timeLeft, setTimeLeft] = useState(24 * 60 + 37); // Timer at 24:37

  // Live Timer Countdown Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleOptionSelect = (optionKey) => {
    setSelectedOption(optionKey);
    toast.success(`Selected option ${optionKey}`);
  };

  // Circle timer progress SVG values
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const initialTime = 25 * 60;
  const strokeDashoffset =
    circumference - (timeLeft / initialTime) * circumference;

  return (
    <div className="bg-white border border-slate-200 rounded-[20px] p-6 flex flex-col h-full shadow-md">
      {/* Header of Math Practice */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold roboto text-slate-900">
          {currentQuestionData.title}
        </h2>
        <span className="text-sm font-semibold lato text-slate-700">
          Question{" "}
          <span className="text-orange font-bold">
            {currentQuestionData.id} Of {totalQuestions}
          </span>
        </span>
      </div>

      {/* Content: Timer and Question Box */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch flex-1">
        {/* Circular Timer (md:span-4) */}
        <div className="md:col-span-4 bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[220px]">
          {/* SVG Timer */}
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="72"
                cy="72"
                r={radius}
                className="text-slate-200"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
              />
              <circle
                cx="72"
                cy="72"
                r={radius}
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="#3b82f6"
                fill="transparent"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold roboto text-slate-800 tracking-wider">
                {formatTime(timeLeft)}
              </span>
              <span className="text-xs text-slate-500 font-medium lato mt-1">
                Time Left
              </span>
            </div>
          </div>

          {/* Total Time Accumulator */}
          <div className="mt-6 bg-white border border-slate-200 rounded-xl px-4 py-2 flex flex-col items-center space-y-1.5 shadow-sm">
            <span className="text-xs text-slate-500 font-medium lato flex items-center gap-1.5">
              <Clock size={16} />
              Total Time
            </span>
            <span className="text-lg font-bold text-blue-600 roboto">
              04:37:22
            </span>
          </div>
        </div>

        {/* Question Text & Options (md:span-8) */}
        <div className="md:col-span-8 flex flex-col bg-slate-50 border border-slate-200 rounded-2xl p-6 text-left relative min-h-[300px]">
          {/* Question */}
          <h3 className="text-base sm:text-lg font-semibold text-slate-800 lato leading-relaxed">
            {currentQuestionData.id}. {currentQuestionData.text}
          </h3>

          {/* Scalable Equation */}
          {parseMathEquation(currentQuestionData.equation)}

          {/* Options List */}
          <div className="flex flex-col gap-3 mt-auto mb-10">
            {currentQuestionData.options.map((option) => {
              const isSelected = selectedOption === option.key;
              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => handleOptionSelect(option.key)}
                  className={`w-full flex items-center gap-4 py-3 px-4 rounded-xl border transition-all lato text-sm font-semibold ${
                    isSelected
                      ? "bg-[#EBF5E4] border-[#66A331] text-amber-950 shadow-sm"
                      : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100/50 hover:border-slate-300"
                  }`}
                >
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isSelected
                        ? "bg-[#66A331] text-white"
                        : "bg-slate-100 border border-slate-200 text-slate-500"
                    }`}
                  >
                    {option.key}
                  </span>
                  <span className="tracking-wide">{option.val}</span>
                </button>
              );
            })}
          </div>

          {/* Solutions Toggle Button */}
          <button
            type="button"
            onClick={() => setShowSolutionPanel(!showSolutionPanel)}
            className={`absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              showSolutionPanel
                ? "bg-[#4E762B] border border-[#5D9E32] text-white"
                : "bg-slate-200 border border-slate-300 text-slate-700 hover:bg-slate-300"
            }`}
          >
            <img
              src={ICONS?.lightBlub}
              alt="light blub icon"
              className="size-5"
            />
            Solution
          </button>
        </div>
      </div>

      {/* Bottom Actions of Left Column: Pagination buttons */}
      <div className="flex items-center justify-between border-t border-slate-200 pt-6 mt-6">
        <button
          type="button"
          disabled={currentQIndex === 0}
          onClick={onPrev}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm font-bold shadow-sm"
        >
          <ChevronLeft size={16} />
          Previous
        </button>
        <button
          type="button"
          disabled={currentQIndex === totalQuestions - 1}
          onClick={onNext}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/95 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm font-bold shadow-md"
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default MathPracticeSession;
