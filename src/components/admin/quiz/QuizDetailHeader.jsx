export default function QuizDetailHeader({
  title,
  subject,
  duration,
  createdAt,
  questionsCount,
  status,
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-sm flex items-center justify-between w-full select-none">
      <div className="flex items-center gap-5">
        {/* Clipboard checklist icon wrapper */}
        <div className="w-16 h-16 rounded-xl bg-[#082042] flex items-center justify-center text-white shrink-0 shadow-sm">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>

        <div className="flex flex-col text-left">
          <h2 className="text-2xl font-bold text-[#082042] roboto leading-tight">
            {title}
          </h2>
          <div className="text-slate-400 text-sm font-semibold lato flex items-center gap-1.5 mt-0.5">
            <span>{subject}</span>
            <span>•</span>
            <span>{duration}</span>
            <span>•</span>
            <span>Created At {createdAt}</span>
          </div>
          <div className="mt-2.5 self-start">
            <span className="inline-block px-3 py-1 text-xs font-bold text-[#66A331] bg-[#EBF5E4] rounded-md border border-[#66A331]/20 lato">
              {questionsCount} Questions Generated
            </span>
          </div>
        </div>
      </div>

      {/* Right side Status badge */}
      <div>
        {status === "Published" ? (
          <span className="inline-block px-5 py-2 text-sm font-bold text-[#66A331] bg-[#EBF5E4] rounded-lg border border-[#66A331]/25 lato">
            Published
          </span>
        ) : (
          <span className="inline-block px-5 py-2 text-sm font-bold text-[#E65100] bg-[#FFF0E6] rounded-lg border border-[#E65100]/25 lato">
            Draft
          </span>
        )}
      </div>
    </div>
  );
}
