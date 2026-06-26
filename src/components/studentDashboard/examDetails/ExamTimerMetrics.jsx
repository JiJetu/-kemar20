import { Clock } from "lucide-react";

export default function ExamTimerMetrics({
  title,
  timeLeft,
  attemptedCount,
  totalCount,
  remainingCount
}) {
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Progress ring variables
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const totalSessionTime = 30 * 60; // 30 minutes
  const strokeDashoffset = circumference - (timeLeft / totalSessionTime) * circumference;

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 flex flex-col items-center shadow-sm w-full select-none">
      {/* Header */}
      <h2 className="text-[#082042] text-xl font-bold mb-6 text-center roboto w-full border-b border-slate-50 pb-3">
        {title}
      </h2>

      {/* Circular Countdown Dial */}
      <div className="relative w-36 h-36 flex items-center justify-center mb-8">
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
            stroke="#082042"
            fill="transparent"
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">
            Time Left
          </span>
          <span className="text-3xl font-extrabold text-[#082042] tracking-wider roboto">
            {formatTime(timeLeft)}
          </span>
          <span className="text-[10px] text-slate-500 font-medium lowercase tracking-wide mt-0.5">
            min &nbsp;&nbsp;&nbsp; sec
          </span>
        </div>
      </div>

      {/* Metrics Rows */}
      <div className="w-full flex flex-col gap-3">
        {/* Total Time */}
        <div className="bg-[#F0F4FA] rounded-xl py-3.5 px-4 flex items-center justify-between">
          <span className="text-[#47515E] text-sm font-semibold flex items-center gap-2 roboto">
            <Clock size={16} className="text-[#47515E]" />
            Total Time
          </span>
          <span className="text-[#082042] text-base font-bold roboto">
            30:00
          </span>
        </div>

        {/* Attempted */}
        <div className="bg-[#F0F4FA] rounded-xl py-3.5 px-4 flex items-center justify-between">
          <span className="text-[#47515E] text-sm font-semibold flex items-center gap-2 roboto">
            <Clock size={16} className="text-[#47515E]" />
            Attempted
          </span>
          <span className="text-[#082042] text-base font-bold roboto">
            {attemptedCount} <span className="text-slate-400 font-medium">/ {totalCount}</span>
          </span>
        </div>

        {/* Remaining */}
        <div className="bg-[#F0F4FA] rounded-xl py-3.5 px-4 flex items-center justify-between">
          <span className="text-[#47515E] text-sm font-semibold flex items-center gap-2 roboto">
            <Clock size={16} className="text-[#47515E]" />
            Remaining
          </span>
          <span className="text-[#082042] text-base font-bold roboto">
            {remainingCount}
          </span>
        </div>
      </div>
    </div>
  );
}
