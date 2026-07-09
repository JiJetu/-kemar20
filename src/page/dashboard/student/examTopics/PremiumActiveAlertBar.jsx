import { Crown } from "lucide-react";

export default function PremiumActiveAlertBar({ onCancel }) {
  return (
    <div className="w-full border border-blue-100 bg-[#F0F6FF] rounded-[12px] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left transition-all">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-full shrink-0 flex items-center justify-center bg-blue-100 text-[#0047D2]">
          <Crown className="w-6 h-6 text-yellow-500 fill-yellow-500" />
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="font-bold text-slate-900 text-lg leading-tight roboto">
            Premium Active
          </h3>
          <p className="text-slate-500 text-xs sm:text-sm font-semibold mt-0.5 roboto leading-relaxed">
            You have full access to all topics and quizzes. Thank you for studying with ExcelJM!
          </p>
        </div>
      </div>

      <div className="shrink-0">
        <button
          onClick={onCancel}
          className="border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-sm px-5 py-2.5 rounded-[8px] transition-all roboto"
        >
          Cancel Subscription
        </button>
      </div>
    </div>
  );
}
