import SEO from "../../shared/SEO";
import { Gift, Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import {
  useGetBillingPlansQuery,
  useActivateFreeTrialMutation,
  useCheckoutPremiumMutation,
} from "../../../redex/features/subscription/subscription.api";
import { logout } from "../../../redex/features/auth/auth.slice";
import { ICONS } from "../../../assets";

export default function PricingPlanScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: plansData } = useGetBillingPlansQuery();
  const [activateFreeTrial, { isLoading: isFreeLoading }] = useActivateFreeTrialMutation();
  const [checkoutPremium, { isLoading: isPremiumLoading }] = useCheckoutPremiumMutation();

  const plans = plansData?.results || [];
  const freePlan = plans.find((p) => p.code === "free_trial" || Number(p.price) === 0);
  const premiumPlan = plans.find((p) => p.code === "premium");

  const freeFeatures = freePlan && freePlan.description
    ? freePlan.description.split(",").map(f => f.trim()).filter(Boolean)
    : ["Access 2 handpicked topics/quizzes", "Selected By Admin", "No Payment Required"];

  const premiumFeatures = premiumPlan && premiumPlan.description
    ? premiumPlan.description.split(",").map(f => f.trim()).filter(Boolean)
    : ["Access All Topics & Quizzes", "Unlimited Practice", "Detailed Solutions & Explanations", "Track Progress & Performance"];

  const handleSelectPlan = async (plan) => {
    if (plan === "free") {
      try {
        await activateFreeTrial().unwrap();
        toast.success("Free Trial activated successfully!");
        
        // Remove from redux store
        dispatch(logout());
        
        // Redirect to login page
        navigate("/login");
      } catch (error) {
        console.error("Free trial error:", error);
        const errorMsg = error?.data?.detail || error?.data?.message || "Failed to activate Free Trial. Please try again.";
        toast.error(errorMsg);
      }
    } else if (plan === "premium") {
      try {
        const response = await checkoutPremium().unwrap();
        if (response?.order_url) {
          toast.success("Redirecting to secure DimePay checkout...");
          
          // Remove from redux store
          dispatch(logout());
          
          // Redirect to payment URL
          window.location.href = response.order_url;
        } else {
          toast.error("Checkout URL not received from server.");
        }
      } catch (error) {
        console.error("Premium checkout error:", error);
        const errorMsg = error?.data?.detail || error?.data?.message || "Failed to initiate checkout. Please try again.";
        toast.error(errorMsg);
      }
    }
  };

  const isLoading = isFreeLoading || isPremiumLoading;

  return (
    <>
      <SEO
        title="Account Ready || ExcelJM"
        description="Your account is ready! Choose a plan to continue."
      />
      <div className="min-h-screen w-full bg-[#EBF9E9] flex flex-col items-center justify-center p-6 md:p-12 lg:p-2 select-none font-sans animate-in fade-in duration-300">
        
        {/* Header pricing icon */}
        <div className="flex justify-center select-none">
          <img
            src={ICONS.pricingIcon}
            alt="Pricing Icon"
            className="w-40 h-40 object-contain"
          />
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-[38px] font-extrabold text-[#082042] mb-4 text-center lora leading-tight">
          Your Account Is <span className="text-[#32A61D]">Ready!</span>
        </h1>
        <p className="text-[#47515E] text-xs sm:text-sm font-semibold max-w-lg text-center leading-relaxed mb-12 roboto">
          Choose How You Want To Continue Your Learning Journey.<br />
          Start With A Free Trial Or Unlock Everything With A Premium Plan.
        </p>

        {/* Plan Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-[900px] mb-12">
          
          {/* Free Trial Card */}
          <div className="bg-white rounded-[24px] p-8 flex flex-col justify-between border border-slate-100 shadow-sm hover:shadow-md transition-shadow text-left">
            <div>
              {/* Icon header */}
              <div className="flex items-center gap-4 border-b border-slate-100 pb-5 mb-5 select-none">
                <div className="w-14 h-14 rounded-full bg-[#EBF9E9] text-[#39842B] flex items-center justify-center shrink-0">
                  <Gift className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-[#082042] lora">
                    Start <span className="text-[#39842B]">{freePlan?.code_display || "Free Trial"}</span>
                  </h3>
                  <p className="text-slate-400 text-xs font-semibold roboto">Try Excelim With Limited Access.</p>
                </div>
              </div>

              {/* Price block */}
              <div className="mb-6">
                <h4 className="text-2xl font-extrabold text-[#39842B] leading-none mb-1 roboto">
                  Free
                </h4>
                <span className="text-slate-400 text-xs font-bold roboto">No credit card required</span>
              </div>

              {/* Bullets */}
              <ul className="space-y-3.5 mb-8">
                {freeFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm font-semibold text-slate-600 roboto">
                    <div className="w-5 h-5 rounded-full bg-[#EBF9E9] text-[#39842B] flex items-center justify-center shrink-0 select-none">
                      <svg className="w-3.5 h-3.5 stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              disabled={isLoading}
              onClick={() => handleSelectPlan("free")}
              className="w-full bg-[#39842B] hover:bg-[#39842B]/95 text-white py-4 rounded-[8px] font-bold text-sm tracking-wide transition-all active:scale-[0.98] shadow-sm flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed roboto cursor-pointer"
            >
              <span>{isFreeLoading ? "Activating..." : "Start Free Trial"}</span>
              <span className="text-lg leading-none">→</span>
            </button>
          </div>

          {/* Premium Card */}
          <div className="bg-white rounded-[24px] p-8 flex flex-col justify-between border border-slate-100 shadow-sm hover:shadow-md transition-shadow text-left">
            <div>
              {/* Icon header */}
              <div className="flex items-center gap-4 border-b border-slate-100 pb-5 mb-5 select-none">
                <div className="w-14 h-14 rounded-full bg-[#E8F0FA] text-[#0047D2] flex items-center justify-center shrink-0">
                  <Crown className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-[#082042] lora">
                    Go <span className="text-[#0047D2]">{premiumPlan?.code_display || "Premium"}</span>
                  </h3>
                  <p className="text-slate-400 text-xs font-semibold roboto">Unlock all features and accelerate your success.</p>
                </div>
              </div>

              {/* Price block */}
              <div className="mb-6">
                <h4 className="text-2xl font-extrabold text-[#0047D2] leading-none mb-1 roboto">
                  ${premiumPlan?.price ? parseFloat(premiumPlan.price).toFixed(2) : "9.99"}{" "}
                  <span className="text-slate-400 text-sm font-semibold">
                    /{premiumPlan?.billing_period_days || 30} Days
                  </span>
                </h4>
                <span className="text-transparent text-xs font-bold block select-none roboto">Placeholder</span>
              </div>

              {/* Bullets */}
              <ul className="space-y-3.5 mb-8">
                {premiumFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm font-semibold text-slate-600 roboto">
                    <div className="w-5 h-5 rounded-full bg-[#E8F0FA] text-[#0047D2] flex items-center justify-center shrink-0 select-none">
                      <svg className="w-3.5 h-3.5 stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              disabled={isLoading}
              onClick={() => handleSelectPlan("premium")}
              className="w-full bg-[#0047D2] hover:bg-[#0047D2]/95 text-white py-4 rounded-[8px] font-bold text-sm tracking-wide transition-all active:scale-[0.98] shadow-sm flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed roboto cursor-pointer"
            >
              <span>{isPremiumLoading ? "Redirecting..." : "Go Premium Now"}</span>
              <span className="text-lg leading-none">→</span>
            </button>
          </div>

        </div>

        {/* Safe payment branding */}
        <span className="text-[#39842B] font-bold text-[13px] tracking-wide mt-4 roboto">
          Secure & Safe Payment Powered By DimePay
        </span>

      </div>
    </>
  );
}
