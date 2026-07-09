import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Countdown timer
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          navigate("/dashboard");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="w-full flex items-center justify-center py-12 px-4 select-none min-h-[70vh] font-sans">
      <div className="bg-white border border-slate-100 rounded-[32px] p-8 md:p-12 shadow-xl w-full max-w-lg text-center animate-in zoom-in-95 duration-300 relative overflow-hidden flex flex-col items-center">
        
        {/* Decorative Top Gradient bar */}
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#66A331] to-[#39842B]" />

        {/* Animated Green Checkmark Wrapper */}
        <div className="w-20 h-20 rounded-full bg-[#EBF9E9] border border-[#39842B]/10 flex items-center justify-center text-[#39842B] mb-6 animate-bounce">
          <CheckCircle2 className="w-12 h-12 stroke-[1.5]" />
        </div>

        {/* Success Header */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#0A2648] lora leading-tight mb-3">
          Payment Successful!
        </h1>

        {/* Subtitle */}
        <p className="text-slate-500 text-sm md:text-base font-semibold roboto leading-relaxed max-w-sm mb-8">
          Thank you for your purchase. Your premium plan is now active! You now have unlimited access to all practice topics and quizzes.
        </p>

        {/* Countdown Indicator */}
        <div className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 mb-6 flex flex-col items-center gap-1.5 shadow-inner">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider lato">
            System Redirect
          </span>
          <span className="text-sm text-slate-650 font-bold roboto">
            Redirecting to Dashboard in <span className="text-[#39842B] text-base">{countdown}</span> seconds...
          </span>
        </div>

        {/* Quick Skip button */}
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="w-full bg-[#39842B] hover:bg-[#39842B]/95 text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
        >
          <span>Go to Dashboard Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
}
