import { useNavigate } from "react-router-dom";
import { Crown, CheckCircle2, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import SEO from "../../shared/SEO";
import { useGetSubscriptionStatusQuery } from "../../../redex/features/subscription/subscription.api";

export default function ManageSubscription() {
  const navigate = useNavigate();
  const { data: subStatus, isLoading } = useGetSubscriptionStatusQuery();
  const isSubscribed = subStatus?.is_premium === true || subStatus?.is_active === true || subStatus?.plan === "premium";

  const handleCancelSubscription = () => {
    toast.info("Please contact ExcelJM support to process plan cancellations.");
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <div className="w-10 h-10 border-4 border-[#0047D2] border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-500 font-medium roboto">Retrieving subscription status...</p>
      </div>
    );
  }

  if (!isSubscribed) {
    return (
      <>
        <SEO
          title="Manage Subscription || ExcelJM"
          description="View and manage your active premium subscription settings."
        />
        <div className="max-w-md mx-auto px-4 py-16 flex flex-col items-center text-center gap-6 font-sans">
          <div className="p-4 bg-slate-100 rounded-full text-slate-400">
            <Crown className="w-12 h-12" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">No Active Premium Plan</h2>
          <p className="text-slate-500 text-sm">
            Upgrade to premium to unlock all topics, quizzes, and learning tools.
          </p>
          <button
            onClick={() => navigate("/dashboard/profile")}
            className="bg-[#39842B] hover:bg-[#39842B]/95 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-md cursor-pointer"
          >
            Upgrade Now
          </button>
        </div>
      </>
    );
  }

  const formatPlanName = (plan) => {
    if (!plan) return "N/A";
    return plan.split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  };

  const formatStatusName = (status) => {
    if (!status) return "N/A";
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
    } catch {
      return "N/A";
    }
  };

  return (
    <>
      <SEO
        title="Manage Subscription || ExcelJM"
        description="View and manage your active premium subscription settings."
      />
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-6 text-slate-800 select-none text-left font-sans animate-in fade-in duration-300">
        
        {/* Top Header Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <button
            onClick={() => navigate("/dashboard/profile")}
            className="self-start border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs px-3.5 py-2 rounded-[8px] transition-all flex items-center gap-1.5 shadow-sm bg-white cursor-pointer select-none"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back To Account</span>
          </button>
        </div>

        {/* Page Title & Subtitle */}
        <div className="text-center flex flex-col gap-1.5 mb-2">
          <h2 className="text-3xl font-medium text-[#082042] tracking-tight roboto">
            Manage Subscription
          </h2>
          <p className="text-sm text-slate-400 font-semibold roboto">
            View And Manage Your Premium Subscription
          </p>
        </div>

        {/* Subscription Status Card */}
        <div className="w-full border border-blue-100 bg-[#F0F6FF] rounded-[12px] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full shrink-0 flex items-center justify-center bg-[#0047D2] text-white shadow-md select-none">
              <Crown className="w-6 h-6 text-white fill-white" />
            </div>
            <div className="flex flex-col justify-center text-left">
              <h3 className="font-bold text-slate-900 text-lg leading-tight roboto">
                Premium Active
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm font-semibold mt-0.5 roboto leading-relaxed">
                You Have Full Access To All Topics, Quizzes And Premium Features
              </p>
            </div>
          </div>

          <div className="shrink-0">
            <button
              onClick={handleCancelSubscription}
              className="bg-white hover:bg-slate-50 border border-slate-100 text-[#0047D2] font-bold text-xs sm:text-sm px-5 py-2.5 rounded-[8px] transition-all flex items-center gap-1.5 shadow-sm roboto cursor-pointer"
            >
              <span>Cancel Subscription</span>
              <span className="text-sm font-medium leading-none">→</span>
            </button>
          </div>
        </div>

        {/* Subscription Details Card */}
        <div className="bg-white border border-slate-100 rounded-[16px] p-6 sm:p-8 shadow-sm text-left">
          <h3 className="text-lg font-bold text-[#082042] mb-6 roboto">
            Subscription Details
          </h3>

          <div className="flex flex-col gap-4">
            {/* Row 1: Plan & Status */}
            <div className="grid grid-cols-2 gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Plan
                </span>
                <span className="text-sm sm:text-base font-medium text-[#082042] roboto">
                  {formatPlanName(subStatus?.plan)}
                </span>
              </div>
              <div className="text-right sm:text-left">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Status
                </span>
                <span className="text-sm sm:text-base font-medium text-[#0047D2] roboto">
                  {formatStatusName(subStatus?.status)}
                </span>
              </div>
            </div>

            {/* Row 2: Payment Method & Next Billing Date */}
            <div className="grid grid-cols-2 gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Payment Method
                </span>
                <span className="text-sm sm:text-base font-medium text-[#082042] roboto">
                  {subStatus?.plan === "premium" ? "DimePay Secure Billing" : "N/A"}
                </span>
              </div>
              <div className="text-right sm:text-left">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Next Billing Date
                </span>
                <span className="text-sm sm:text-base font-medium text-[#082042] roboto">
                  {formatDate(subStatus?.current_period_end)}
                </span>
              </div>
            </div>

            {/* Row 3: Billing Cycle & Amount */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Billing Cycle
                </span>
                <span className="text-sm sm:text-base font-medium text-[#082042] roboto">
                  {subStatus?.plan === "premium" ? "Monthly" : "N/A"}
                </span>
              </div>
              <div className="text-right sm:text-left">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Amount
                </span>
                <span className="text-sm sm:text-base font-medium text-[#082042] roboto">
                  {subStatus?.plan === "premium" ? "$9.99/Month" : "$0.00"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* What's Included Card */}
        <div className="bg-white border border-slate-100 rounded-[16px] p-6 sm:p-8 shadow-sm text-left">
          <h3 className="text-lg font-bold text-[#082042] mb-6 roboto">
            What's Included
          </h3>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <li className="flex items-center gap-3 text-sm font-semibold text-slate-600 roboto">
              <CheckCircle2 className="w-5 h-5 text-[#0047D2] shrink-0" />
              <span>Access All Topics & Quizzes</span>
            </li>
            <li className="flex items-center gap-3 text-sm font-semibold text-slate-600 roboto">
              <CheckCircle2 className="w-5 h-5 text-[#0047D2] shrink-0" />
              <span>Unlimited Practice</span>
            </li>
            <li className="flex items-center gap-3 text-sm font-semibold text-slate-600 roboto">
              <CheckCircle2 className="w-5 h-5 text-[#0047D2] shrink-0" />
              <span>Detailed Solutions & Explanations</span>
            </li>
            <li className="flex items-center gap-3 text-sm font-semibold text-slate-600 roboto">
              <CheckCircle2 className="w-5 h-5 text-[#0047D2] shrink-0" />
              <span>Track Progress & Performance</span>
            </li>
          </ul>
        </div>

      </div>
    </>
  );
}
