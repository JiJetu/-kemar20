import SEO from "../shared/SEO";
import { Gift, Crown } from "lucide-react";

export default function PricingPlanScreen({ toast }) {
  return (
    <>
      <SEO
        title="Account Ready || ExcelJM"
        description="Your account is ready! Choose a plan to continue."
      />
      <div className="min-h-screen w-full bg-[#EBF9E9] flex flex-col items-center justify-center p-6 md:p-12 lg:p-16 select-none font-sans">
        
        {/* Header check icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-[#EBF9E9] border-8 border-white shadow-md flex items-center justify-center relative">
            <div className="w-14 h-14 rounded-full bg-[#32A61D] flex items-center justify-center text-white">
              <svg className="w-8 h-8 stroke-[3.5px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-[38px] font-extrabold text-[#082042] mb-4 text-center lora leading-tight">
          {/* Your Account Is <span className="text-[#32A61D]">Ready!</span> */}
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
              <div className="flex items-center gap-4 border-b border-slate-100 pb-5 mb-5">
                <div className="w-14 h-14 rounded-full bg-[#EBF9E9] text-[#39842B] flex items-center justify-center shrink-0">
                  <Gift className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-[#082042]">
                    Start <span className="text-[#39842B]">Free Trial</span>
                  </h3>
                  <p className="text-slate-400 text-xs font-semibold">Try Excelim With Limited Access.</p>
                </div>
              </div>

              {/* Price block */}
              <div className="mb-6">
                <h4 className="text-2xl font-extrabold text-[#39842B] leading-none mb-1">
                  2 Free Topics / Quizess
                </h4>
                <span className="text-slate-400 text-xs font-bold">Handpicked by our experts</span>
              </div>

              {/* Bullets */}
              <ul className="space-y-3.5 mb-8">
                <li className="flex items-center gap-3 text-sm font-semibold text-slate-600">
                  <div className="w-5 h-5 rounded-full bg-[#EBF9E9] text-[#39842B] flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5 stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Access 2 handpicked topics/quizzes</span>
                </li>
                <li className="flex items-center gap-3 text-sm font-semibold text-slate-600">
                  <div className="w-5 h-5 rounded-full bg-[#EBF9E9] text-[#39842B] flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5 stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Selected By Admin</span>
                </li>
                <li className="flex items-center gap-3 text-sm font-semibold text-slate-600">
                  <div className="w-5 h-5 rounded-full bg-[#EBF9E9] text-[#39842B] flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5 stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>No Payment Required</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => {
                toast.success("Welcome! Starting free trial...");
                window.location.href = "/student";
              }}
              className="w-full bg-[#39842B] hover:bg-[#39842B]/95 text-white py-4 rounded-[8px] font-bold text-sm tracking-wide transition-all active:scale-[0.98] shadow-sm flex items-center justify-center gap-1.5"
            >
              <span>Start Free Trial</span>
              <span className="text-lg leading-none">→</span>
            </button>
          </div>

          {/* Premium Card */}
          <div className="bg-white rounded-[24px] p-8 flex flex-col justify-between border border-slate-100 shadow-sm hover:shadow-md transition-shadow text-left">
            <div>
              {/* Icon header */}
              <div className="flex items-center gap-4 border-b border-slate-100 pb-5 mb-5">
                <div className="w-14 h-14 rounded-full bg-[#E8F0FA] text-[#0047D2] flex items-center justify-center shrink-0">
                  <Crown className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-[#082042]">
                    Go <span className="text-[#0047D2]">Premium</span>
                  </h3>
                  <p className="text-slate-400 text-xs font-semibold">Unlock all features and accelerate your success</p>
                </div>
              </div>

              {/* Price block */}
              <div className="mb-6">
                <h4 className="text-2xl font-extrabold text-[#0047D2] leading-none mb-1">
                  $9.99 <span className="text-slate-400 text-sm font-semibold">/Month</span>
                </h4>
                <span className="text-transparent text-xs font-bold block select-none">Placeholder</span>
              </div>

              {/* Bullets */}
              <ul className="space-y-3.5 mb-8">
                <li className="flex items-center gap-3 text-sm font-semibold text-slate-600">
                  <div className="w-5 h-5 rounded-full bg-[#E8F0FA] text-[#0047D2] flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5 stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Access All Topics & Quizzes</span>
                </li>
                <li className="flex items-center gap-3 text-sm font-semibold text-slate-600">
                  <div className="w-5 h-5 rounded-full bg-[#E8F0FA] text-[#0047D2] flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5 stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Unlimited Practice</span>
                </li>
                <li className="flex items-center gap-3 text-sm font-semibold text-slate-600">
                  <div className="w-5 h-5 rounded-full bg-[#E8F0FA] text-[#0047D2] flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5 stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Detailed Solutions & Explanations</span>
                </li>
                <li className="flex items-center gap-3 text-sm font-semibold text-slate-600">
                  <div className="w-5 h-5 rounded-full bg-[#E8F0FA] text-[#0047D2] flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5 stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Track Progress & Performance</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => {
                toast.success("Redirecting to Premium payment...");
                window.location.href = "/student";
              }}
              className="w-full bg-[#0047D2] hover:bg-[#0047D2]/95 text-white py-4 rounded-[8px] font-bold text-sm tracking-wide transition-all active:scale-[0.98] shadow-sm flex items-center justify-center gap-1.5"
            >
              <span>Go Premium Now</span>
              <span className="text-lg leading-none">→</span>
            </button>
          </div>

        </div>

        {/* Safe payment branding */}
        <span className="text-[#39842B] font-bold text-[13px] tracking-wide mt-4">
          Secure & Safe Payment Power By Stripe
        </span>

      </div>
    </>
  );
}
