import { ICONS } from "../../../assets/index";

export default function QuizLeaderboard({ attemptsCount = 45 }) {
  return (
    <div className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-sm flex flex-col gap-5 w-full select-none">
      {/* Header Label */}
      <div className="text-slate-700 font-bold text-sm md:text-base lato">
        Total Students Attempted : <span className="text-[#66A331] font-extrabold roboto ml-0.5">{attemptsCount}</span>
      </div>

      {/* Podiums row */}
      <div className="flex flex-row items-end justify-center gap-4 sm:gap-6 max-w-2xl mx-auto pt-4 pb-2 w-full">
        {/* Rank 2 (Left) */}
        <div className="flex-1 bg-white border border-slate-200 rounded-[20px] p-5 shadow-sm flex flex-col items-center justify-center h-[185px] text-center">
          <div className="relative mb-2">
            <div className="w-6 h-6 bg-[#082042] text-white rounded-full flex items-center justify-center font-bold text-xs absolute -top-3 left-1/2 -translate-x-1/2 border-2 border-white roboto z-10">
              2
            </div>
            <img
              src="https://randomuser.me/api/portraits/men/85.jpg"
              alt="Joti Das"
              className="w-20 h-20 rounded-full object-cover border-[2.5px] border-[#FFA000] relative"
            />
          </div>
          <span className="font-bold text-slate-800 text-sm lato mb-1">Joti Das</span>
          <span className="text-lg font-bold text-slate-800 roboto">16/20</span>
          <span className="text-xs font-bold text-[#137333] lato mt-0.5">Score 95%</span>
        </div>

        {/* Rank 1 (Center - taller & light blue-grey card) */}
        <div className="flex-1 bg-[#FCEDEF] border border-[#FCEDEF] rounded-[20px] p-5 shadow-sm flex flex-col items-center justify-center h-[220px] text-center">
          <div className="relative mb-2">
            {/* Crown Icon Asset */}
            <img
              src={ICONS.crown}
              alt="Crown"
              className="w-8 h-8 absolute -top-6 left-1/2 -translate-x-1/2 object-contain z-10"
            />
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Pappu"
              className="w-24 h-24 rounded-full object-cover border-[2.5px] border-[#FFA000] relative"
            />
          </div>
          <span className="font-bold text-slate-800 text-sm lato mb-1">Pappu</span>
          <span className="text-2xl font-extrabold text-slate-800 roboto">18/20</span>
          <span className="text-xs font-bold text-[#137333] lato mt-0.5">Score 98%</span>
        </div>

        {/* Rank 3 (Right) */}
        <div className="flex-1 bg-white border border-slate-200 rounded-[20px] p-5 shadow-sm flex flex-col items-center justify-center h-[185px] text-center">
          <div className="relative mb-2">
            <div className="w-6 h-6 bg-[#B45309] text-white rounded-full flex items-center justify-center font-bold text-xs absolute -top-3 left-1/2 -translate-x-1/2 border-2 border-white roboto z-10">
              3
            </div>
            <img
              src="https://randomuser.me/api/portraits/men/85.jpg"
              alt="Joti Das"
              className="w-20 h-20 rounded-full object-cover border-[2.5px] border-[#FFA000] relative"
            />
          </div>
          <span className="font-bold text-slate-800 text-sm lato mb-1">Joti Das</span>
          <span className="text-lg font-bold text-slate-800 roboto">14/20</span>
          <span className="text-xs font-bold text-[#137333] lato mt-0.5">Score 90%</span>
        </div>
      </div>
    </div>
  );
}


