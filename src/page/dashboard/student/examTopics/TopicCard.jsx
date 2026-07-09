import { Link } from "react-router-dom";
import { GraduationCap, Clock, ArrowRight, Crown, BookOpen, Lock } from "lucide-react";

export default function TopicCard({ topic, isSubscribed, onLockClick }) {
  const isLocked = !isSubscribed && topic.isPremium;

  return (
    <div className="bg-white border border-slate-100 rounded-[12px] p-6 flex flex-col justify-between gap-5 relative overflow-hidden group transition-all">
      {/* Premium Corner Triangle Badge for locked premium cards */}
      {isLocked && (
        <div className="absolute top-0 right-0 w-10 h-10 pointer-events-none z-10 select-none">
          {/* CSS Triangle */}
          <div className="absolute top-0 right-0 w-0 h-0 border-t-[36px] border-t-[#082042] border-l-[36px] border-l-transparent"></div>
          {/* Crown Icon */}
          <Crown className="absolute top-1.5 right-1.5 w-3 h-3 text-white fill-white" />
        </div>
      )}

      <div className="flex flex-col gap-4 text-left">
        {/* Header Row: Icon on left, Title + Tag on right */}
        <div className="flex items-center gap-4">
          {/* Book / Lock square icon */}
          <div className={`w-11 h-11 rounded-[8px] border flex items-center justify-center shrink-0 ${
            isLocked 
              ? "bg-[#F1F3F5] border-slate-200/50 text-[#A0AEC0]" 
              : "bg-[#EBF9E9] border-[#39842B]/10 text-[#39842B]"
          }`}>
            {isLocked ? <Lock className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
          </div>

          <div className="flex flex-col text-left">
            <h4 className="text-base font-bold text-slate-900 leading-snug roboto">
              {topic.title}
            </h4>
            {/* Tag label */}
            <div>
              <span className={`inline-block text-[10px] font-bold px-2.5 py-0.5 mt-1 rounded-[4px] tracking-wider ${
                isLocked 
                  ? "bg-[#F1F3F6] text-[#718096]" 
                  : "bg-[#EBF9E9] text-[#39842B]"
              }`}>
                {isLocked ? "Premium" : "Free"}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-500 leading-relaxed roboto font-medium">
          {topic.description}
        </p>
      </div>

      {/* Bottom stats and action button */}
      <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
        {/* Stats */}
        <div className="flex items-center gap-3.5 text-[11px] font-bold text-slate-400 roboto">
          <span className="flex items-center gap-1">
            <GraduationCap className="w-3.5 h-3.5 text-slate-400" /> {topic.questionsCount} Qs
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" /> {topic.duration} Mins
          </span>
        </div>

        {/* Unlocked Practice or Locked Premium button */}
        {isLocked ? (
          <button
            type="button"
            onClick={onLockClick}
            className="px-4 py-2 rounded-[8px] text-xs font-bold bg-[#A3AED0] text-white flex items-center gap-1.5 cursor-not-allowed select-none roboto"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Premium</span>
          </button>
        ) : (
          <Link
            to={`/dashboard/exam-details/${topic.id}`}
            state={{ isAttempted: topic.isAttempted }}
            className={`px-4 py-2 rounded-[8px] text-xs font-bold text-white transition-all shadow-sm flex items-center gap-1.5 roboto active:scale-[0.98] ${
              topic.isAttempted
                ? "bg-[#082042] hover:bg-[#082042]/95"
                : "bg-[#39842B] hover:bg-[#39842B]/95"
            }`}
          >
            <span>{topic.isAttempted ? "View Results" : "Start Practice"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
}
