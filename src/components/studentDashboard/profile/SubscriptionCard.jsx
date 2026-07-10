import { Crown, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetSubscriptionStatusQuery } from "../../../redex/features/subscription/subscription.api";

const SubscriptionCard = ({
  isPremiumSubscribed,
  isCheckoutLoading,
  handleSubscribe,
}) => {
  const navigate = useNavigate();
  const { data: subStatus } = useGetSubscriptionStatusQuery();

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
    } catch {
      return "N/A";
    }
  };

  return isPremiumSubscribed ? (
    /* Premium Member Banner */
    <div className="w-full border border-blue-200 bg-[#F0F6FF] rounded-[12px] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left transition-all">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-full shrink-0 flex items-center justify-center bg-[#0047D2] text-white shadow-md">
          <Crown className="w-6 h-6 text-white fill-white" />
        </div>
        <div className="flex flex-col text-left">
          <h3 className="font-bold text-slate-900 text-lg leading-tight roboto mb-1">
            Premium Member
          </h3>
          {subStatus?.current_period_end && (
            <span className="text-xs font-bold text-[#0047D2] mb-1.5 block">
              Renewal Date: {formatDate(subStatus.current_period_end)}
            </span>
          )}
          <p className="text-slate-400 text-xs font-semibold roboto leading-relaxed">
            You Have Full Access To All Topics, Quizzes And Premium Features
          </p>
        </div>
      </div>

      <div className="shrink-0">
        <button
          type="button"
          onClick={() => navigate("/dashboard/manage-subscription")}
          className="bg-white hover:bg-slate-50 border border-slate-100 text-[#0047D2] font-bold text-xs sm:text-sm px-5 py-2.5 rounded-[8px] transition-all flex items-center gap-1.5 shadow-sm roboto cursor-pointer select-none"
        >
          <span>Manage Subscription</span>
          <span className="text-sm font-medium leading-none">→</span>
        </button>
      </div>
    </div>
  ) : (
    /* Free Trial Active Box */
    <div className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-md text-left">
      <h3 className="text-lg font-bold text-slate-900 mb-4 font-sans">Subscription Plan</h3>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="p-3 rounded-full flex items-center justify-center w-12 h-12 shrink-0 shadow-md bg-[#EBF9E9] text-[#39842B]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold text-slate-800 roboto">
              Free Trial Active
            </span>
            <span className="text-xs sm:text-sm text-slate-500 mt-1 roboto font-medium">
              You can access 2 free topics only. Upgrade to premium to unlock all topics and quizzes.
            </span>
          </div>
        </div>

        <div className="flex items-center w-full md:w-auto justify-end gap-6 border-t border-slate-100 md:border-t-0 pt-4 md:pt-0 shrink-0">
          <button
            type="button"
            disabled={isCheckoutLoading}
            onClick={handleSubscribe}
            className="bg-[#39842B] hover:bg-[#39842B]/95 text-white font-bold text-sm px-5 py-2.5 rounded-[8px] transition-all flex items-center gap-2 shadow-sm roboto cursor-pointer select-none disabled:opacity-50"
          >
            <Crown className="w-4 h-4 text-white fill-white" />
            <span>{isCheckoutLoading ? "Upgrading..." : "Upgrade To Premium"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCard;
