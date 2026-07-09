import { ShieldCheck, Crown } from "lucide-react";
import { useCheckoutPremiumMutation } from "../../../../redex/features/subscription/subscription.api";
import { toast } from "sonner";

export default function FreeTrialAlertBar({
  title = "Free Trial Active",
  subtitle = "You can access 2 free topics only. upgrade to premium to unlock all topics and quizzes.",
}) {
  const [checkoutPremium, { isLoading }] = useCheckoutPremiumMutation();

  const handleUpgrade = async () => {
    try {
      const response = await checkoutPremium().unwrap();
      if (response?.order_url) {
        toast.success("Redirecting to secure DimePay checkout...");
        window.location.href = response.order_url;
      } else {
        toast.error("Checkout link not received from server.");
      }
    } catch (error) {
      console.error("Upgrade error:", error);
      toast.error("Failed to start checkout. Please try again.");
    }
  };

  return (
    <div className="w-full border border-[#D1EAD0] bg-[#F3FAF2] rounded-[12px] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left transition-all">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-full shrink-0 flex items-center justify-center bg-[#EBF9E9] text-[#39842B]">
          <ShieldCheck className="w-6 h-6 text-[#39842B]" />
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="font-bold text-slate-900 text-lg leading-tight roboto">
            {title}
          </h3>
          <p className="text-slate-500 text-xs sm:text-sm font-semibold mt-0.5 roboto leading-relaxed">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="shrink-0">
        <button
          onClick={handleUpgrade}
          disabled={isLoading}
          className="bg-[#39842B] hover:bg-[#39842B]/95 text-white font-bold text-sm px-5 py-2.5 rounded-[8px] transition-all flex items-center gap-2 shadow-sm roboto disabled:opacity-50 cursor-pointer"
        >
          <Crown className="w-4 h-4 text-white fill-white" />
          <span>{isLoading ? "Upgrading..." : "Upgrade To Premium"}</span>
        </button>
      </div>
    </div>
  );
}
