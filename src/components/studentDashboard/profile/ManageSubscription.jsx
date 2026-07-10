import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Crown, CheckCircle2, ChevronLeft, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import SEO from "../../shared/SEO";
import { 
  useGetSubscriptionStatusQuery,
  useCancelSubscriptionMutation,
  useGetBillingPlansQuery
} from "../../../redex/features/subscription/subscription.api";

export default function ManageSubscription() {
  const navigate = useNavigate();
  const { data: subStatus, isLoading } = useGetSubscriptionStatusQuery();
  const { data: plansData } = useGetBillingPlansQuery();
  const [cancelSubscription, { isLoading: isCancelling }] = useCancelSubscriptionMutation();
  const [showCancelModal, setShowCancelModal] = useState(false);
  
  const isSubscribed = subStatus?.is_premium === true || subStatus?.is_active === true || subStatus?.plan === "premium";

  useEffect(() => {
    if (!isLoading && subStatus && !isSubscribed) {
      toast.error("You must have an active premium plan to access subscription management.");
      navigate("/dashboard/profile", { replace: true });
    }
  }, [isLoading, subStatus, isSubscribed, navigate]);

  const handleCancelSubscription = () => {
    setShowCancelModal(true);
  };

  const confirmCancelSubscription = async () => {
    setShowCancelModal(false);
    try {
      await cancelSubscription().unwrap();
      toast.success("Subscription cancelled successfully.");
    } catch (err) {
      console.error("Cancel subscription error:", err);
      toast.error(err?.data?.detail || err?.data?.message || "Failed to cancel subscription. Please try again.");
    }
  };

  if (isLoading || !isSubscribed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <div className="w-10 h-10 border-4 border-[#0047D2] border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-500 font-medium roboto">Verifying subscription status...</p>
      </div>
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

  const premiumPlan = plansData?.results?.find((p) => p.code === "premium");
  const premiumFeatures = premiumPlan && premiumPlan.description
    ? premiumPlan.description.split(",").map(f => f.trim()).filter(Boolean)
    : ["Access All Topics & Quizzes", "Unlimited Practice", "Detailed Solutions & Explanations", "Track Progress & Performance"];

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
              disabled={isCancelling}
              className="bg-white hover:bg-slate-50 border border-slate-100 text-[#0047D2] font-bold text-xs sm:text-sm px-5 py-2.5 rounded-[8px] transition-all flex items-center gap-1.5 shadow-sm roboto cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{isCancelling ? "Cancelling..." : "Cancel Subscription"}</span>
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
                  {premiumPlan?.billing_period_days ? `${premiumPlan.billing_period_days} Days` : "30 Days"}
                </span>
              </div>
              <div className="text-right sm:text-left">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Amount
                </span>
                <span className="text-sm sm:text-base font-medium text-[#082042] roboto">
                  {premiumPlan?.price ? `$${parseFloat(premiumPlan.price).toFixed(2)}` : "$9.99"}
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
            {premiumFeatures.map((feat, idx) => (
              <li key={idx} className="flex items-center gap-3 text-sm font-semibold text-slate-600 roboto">
                <CheckCircle2 className="w-5 h-5 text-[#0047D2] shrink-0" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Cancellation Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 flex flex-col items-center text-center shadow-lg animate-in fade-in zoom-in-95 duration-200">
            
            {/* Warning Icon */}
            <div className="w-16 h-16 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-500 mb-4 select-none animate-bounce">
              <AlertTriangle className="w-8 h-8 stroke-[1.5]" />
            </div>

            {/* Title */}
            <h3 className="text-[#082042] text-xl font-bold mb-2 lora">
              Cancel Subscription?
            </h3>

            {/* Description */}
            <p className="text-slate-505 text-xs md:text-sm font-semibold leading-relaxed mb-6 roboto">
              Are you sure you want to cancel your active premium subscription? You will retain premium access until the end of your current billing period.
            </p>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 w-full justify-center">
              <button
                type="button"
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-[#082042] font-bold text-xs md:text-sm transition-all flex-1 cursor-pointer select-none"
              >
                No, Keep
              </button>
              <button
                type="button"
                onClick={confirmCancelSubscription}
                className="px-4 py-2.5 rounded-lg bg-red-500 hover:bg-red-650 text-white font-bold text-xs md:text-sm transition-all flex-1 cursor-pointer select-none shadow-sm active:scale-95"
              >
                Yes, Cancel
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
