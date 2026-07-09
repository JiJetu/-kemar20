export default function QuizStats() {
  const stats = [
    {
      title: "Total Quizzes",
      value: "1,248",
      bg: "bg-[#FCEDEF]",
      icon: (
        <svg className="w-7 h-7 text-[#AD0122]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    },
    {
      title: "Published Quizzes",
      value: "1,000",
      bg: "bg-[#E6F4EA]",
      icon: (
        <svg className="w-7 h-7 text-[#137333]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ),
    },
    {
      title: "Draft Quizzes",
      value: "248",
      bg: "bg-[#FFF4E5]",
      icon: (
        <svg className="w-7 h-7 text-[#B26A00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full roboto select-none">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-white border border-slate-200 rounded-[20px] p-6 flex items-center gap-5 shadow-sm hover:shadow-md transition-shadow select-none text-left"
        >
          {/* Circular Icon Wrapper */}
          <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${stat.bg}`}>
            {stat.icon}
          </div>

          {/* Labels & Counts */}
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-bold text-slate-400 lato">
              {stat.title}
            </span>
            <span className="text-3xl font-extrabold text-slate-800 roboto">
              {stat.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
