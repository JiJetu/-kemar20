import { ArrowUp } from "lucide-react";
import { ICONS } from "../../../assets";

// Leaderboard mock data
const podiumData = [
  {
    rank: 2,
    name: "Pappu",
    score: 26,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    rank: 1,
    name: "Pappu",
    score: 38,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    rank: 3,
    name: "Pappu",
    score: 22,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
];

const rankingsList = Array.from({ length: 14 }, (_, i) => ({
  rank: i + 1,
  name: "Pappu",
  score: 38,
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
}));

const Leaderboard = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-[20px] p-6 flex flex-col h-full min-h-[500px] shadow-md">
      {/* Podium Area */}
      <div className="flex items-end justify-center pt-8 pb-4 border-b border-slate-200 mb-6 select-none relative">
        {/* Rank 2 (Gazi - Left) */}
        <div className="flex flex-col items-center z-10 w-[100px]">
          {/* Badge 2 */}
          <div className="w-8 h-8 rounded-full border-2 border-slate-300 bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-800 shadow-sm mb-2">
            2
          </div>
          {/* Avatar Area */}
          <img
            src={podiumData[0].avatar}
            alt={podiumData[0].name}
            className="w-16 h-16 rounded-full border border-slate-200 object-cover shadow-md"
          />
          {/* Name (with bottom margin to make space for the absolute score) */}
          <span className="text-sm font-semibold text-slate-800 truncate text-center w-full lato mt-2 mb-12">
            {podiumData[0].name}
          </span>
          {/* 3D Silver Cylinder Container */}
          <div className="relative flex flex-col items-center w-[100px]">
            {/* Cylinder Body (Left-tilted highlight, positioned at z-index 1) */}
            <div
              style={{
                position: "relative",
                zIndex: 1,
                width: "100px",
                height: "65px",
                borderBottomLeftRadius: "50% 10px",
                borderBottomRightRadius: "50% 10px",
                background:
                  "linear-gradient(to right, #1a2533 0%, #2b3d52 15%, #5e84a8 30%, #a2c4e3 40%, #769bc2 55%, #476585 75%, #111a24 100%)",
              }}
            ></div>
            {/* Flat Ellipse Cap (Drawn AFTER body to be layered on top, z-index 2) */}
            <div
              style={{
                position: "absolute",
                zIndex: 2,
                width: "100px",
                height: "10px",
                top: "-5px",
                left: "0",
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg, #ffffff 0%, #dbebff 50%, #9cbcdb 100%)",
                border: "1px solid rgba(80, 111, 140, 0.4)",
                boxShadow:
                  "inset 0 -1.5px 2px rgba(255, 255, 255, 0.95), inset 0 1.5px 2px rgba(0, 0, 0, 0.3)",
              }}
            ></div>
            {/* Score (3D effect sitting on cylinder, z-index 3) */}
            <span
              className="absolute z-[3] text-[38px] font-extrabold text-[#E3F2FD] roboto tracking-tighter leading-none w-full text-center"
              style={{
                top: "-43px",
                left: "-3px",
                textShadow:
                  "1px 1px 0 #6085a6, 2px 2px 0 #506f8c, 3px 3px 0 #415a73, 4px 4px 0 #324659, 5px 5px 0 #23313f, 6px 6px 0 #141c26, 8px 8px 10px rgba(0,0,0,0.8)",
              }}
            >
              {podiumData[0].score}
            </span>
            {/* Soft Contact Bottom Shadow */}
            <div
              className="absolute -bottom-[5px] blur-[3px] bg-black/60 rounded-full z-0"
              style={{
                width: "104px",
                height: "10px",
                left: "-2px",
              }}
            ></div>
          </div>
        </div>

        {/* Rank 1 (Pappu - Center) */}
        <div className="flex flex-col items-center z-20 w-[130px] -mx-3">
          {/* Crown Icon */}
          <img
            src={ICONS.crown}
            alt="Crown"
            className="w-10 h-8 object-contain mb-2 drop-shadow-[0_2px_4px_rgba(253,186,116,0.5)]"
          />
          {/* Avatar Area */}
          <img
            src={podiumData[1].avatar}
            alt={podiumData[1].name}
            className="w-20 h-20 rounded-full border-4 border-[#ECC658] object-cover shadow-lg"
          />
          {/* Name (with bottom margin to make space for the absolute score) */}
          <span className="text-sm font-bold text-slate-900 truncate text-center w-full lato mt-2 mb-16">
            {podiumData[1].name}
          </span>
          {/* 3D Gold Cylinder Container */}
          <div className="relative flex flex-col items-center w-[130px]">
            {/* Cylinder Body (Left-tilted highlight, positioned at z-index 1) */}
            <div
              style={{
                position: "relative",
                zIndex: 1,
                width: "130px",
                height: "110px",
                borderBottomLeftRadius: "50% 12px",
                borderBottomRightRadius: "50% 12px",
                background:
                  "linear-gradient(to right, #6b4008 0%, #9c6814 15%, #d4aa37 30%, #f7e297 40%, #e5b94c 55%, #bd8c24 75%, #573202 100%)",
              }}
            ></div>
            {/* Flat Ellipse Cap (Drawn AFTER body to be layered on top, z-index 2) */}
            <div
              style={{
                position: "absolute",
                zIndex: 2,
                width: "130px",
                height: "13px",
                top: "-6.5px",
                left: "0",
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg, #fff3cc 0%, #f5cf62 50%, #d4aa37 100%)",
                border: "1px solid rgba(179, 134, 0, 0.4)",
                boxShadow:
                  "inset 0 -1.5px 2px rgba(255, 255, 255, 0.85), inset 0 1.5px 2px rgba(0, 0, 0, 0.3)",
              }}
            ></div>
            {/* Score (3D effect sitting on cylinder, z-index 3) */}
            <span
              className="absolute z-[3] text-[48px] font-extrabold text-[#FFD54F] roboto tracking-tighter leading-none w-full text-center"
              style={{
                top: "-52px",
                left: "-3px",
                textShadow:
                  "1px 1px 0 #b38600, 2px 2px 0 #997300, 3px 3px 0 #806000, 4px 4px 0 #664d00, 5px 5px 0 #4d3a00, 6px 6px 0 #332700, 8px 8px 10px rgba(0,0,0,0.8)",
              }}
            >
              {podiumData[1].score}
            </span>
            {/* Soft Contact Bottom Shadow */}
            <div
              className="absolute -bottom-[6px] blur-[4px] bg-black/70 rounded-full z-0"
              style={{
                width: "134px",
                height: "12px",
                left: "-2px",
              }}
            ></div>
          </div>
        </div>

        {/* Rank 3 (Joti - Right) */}
        <div className="flex flex-col items-center z-10 w-[100px]">
          {/* Badge 3 */}
          <div className="w-8 h-8 rounded-full border-2 border-[#b57c32] bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-800 shadow-sm mb-2">
            3
          </div>
          {/* Avatar Area */}
          <img
            src={podiumData[2].avatar}
            alt={podiumData[2].name}
            className="w-16 h-16 rounded-full border border-slate-200 object-cover shadow-md"
          />
          {/* Name (with bottom margin to make space for the absolute score) */}
          <span className="text-sm font-semibold text-slate-800 truncate text-center w-full lato mt-2 mb-12">
            {podiumData[2].name}
          </span>
          {/* 3D Bronze Cylinder Container */}
          <div className="relative flex flex-col items-center w-[100px]">
            {/* Cylinder Body (Left-tilted highlight, positioned at z-index 1) */}
            <div
              style={{
                position: "relative",
                zIndex: 1,
                width: "100px",
                height: "50px",
                borderBottomLeftRadius: "50% 10px",
                borderBottomRightRadius: "50% 10px",
                background:
                  "linear-gradient(to right, #501f0a 0%, #8c3f1a 25%, #c76a34 45%, #ffa675 50%, #c76a34 55%, #8c3f1a 75%, #331204 100%)",
              }}
            ></div>
            {/* Flat Ellipse Cap (Drawn AFTER body to be layered on top, z-index 2) */}
            <div
              style={{
                position: "absolute",
                zIndex: 2,
                width: "100px",
                height: "10px",
                top: "-5px",
                left: "0",
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg, #ffebd9 0%, #fca272 50%, #d9783e 100%)",
                border: "1px solid rgba(133, 65, 22, 0.4)",
                boxShadow:
                  "inset 0 -1.5px 2px rgba(255, 255, 255, 0.85), inset 0 1.5px 2px rgba(0, 0, 0, 0.3)",
              }}
            ></div>
            {/* Score (3D effect sitting on cylinder, z-index 3) */}
            <span
              className="absolute z-[3] text-[38px] font-extrabold text-[#FFB74D] roboto tracking-tighter leading-none w-full text-center"
              style={{
                top: "-43px",
                left: "-3px",
                textShadow:
                  "1px 1px 0 #9c4c1a, 2px 2px 0 #854116, 3px 3px 0 #6e3612, 4px 4px 0 #572b0e, 5px 5px 0 #401f0a, 6px 6px 0 #291406, 8px 8px 10px rgba(0,0,0,0.8)",
              }}
            >
              {podiumData[2].score}
            </span>
            {/* Soft Contact Bottom Shadow */}
            <div
              className="absolute -bottom-[5px] blur-[3px] bg-black/60 rounded-full z-0"
              style={{
                width: "104px",
                height: "10px",
                left: "-2px",
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Leaderboard scrollable list */}
      <div className="flex-1 flex flex-col gap-2.5">
        {rankingsList.slice(0, 5).map((rank) => (
          <div
            key={rank.rank}
            className="bg-slate-50/60 hover:bg-slate-50 border border-slate-200 rounded-xl py-2 px-4 flex items-center justify-between transition-all"
          >
            <div className="flex items-center gap-3">
              <span className="w-5 text-base font-bold text-slate-800 text-center roboto">
                {rank.rank}
              </span>
              <img
                src={rank.avatar}
                alt={rank.name}
                className="w-8 h-8 rounded-full object-cover border border-slate-200"
              />
              <span className="text-sm font-semibold text-slate-800 tracking-wide">
                {rank.name}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-slate-600">
                {rank.score}
              </span>
              <span className="text-green-500 text-xs font-bold ">
                <ArrowUp className="text-green-500 w-5 h-5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* View Full Leaderboard Button */}
      <button
        type="button"
        className="w-full mt-4 py-2.5 bg-[#E8F0FE] hover:bg-[#D4E4FC] text-[#1A73E8] font-bold rounded-xl text-xs sm:text-sm transition-all tracking-wide shadow-sm"
      >
        View Full Leaderboard
      </button>
    </div>
  );
};

export default Leaderboard;
