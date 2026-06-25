import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="w-full bg-white pb-20 select-none">
      <div className="max-w-9xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Inner Banner Card */}
        <div className="bg-[#F5F8FC] rounded-[20px] px-8 py-10 md:px-12 md:py-12 lg:px-16 lg:py-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-sm border border-slate-50/50">
          
          {/* Left Column: Heading and Description */}
          <div className="flex flex-col items-start text-left max-w-3xl">
            <h2 className="text-2xl md:text-3xl lg:text-[34px] font-bold text-[#092449] mb-3.5 lora leading-tight">
              Ready To Start With AI?
            </h2>
            <p className="text-[#47515E] text-xs sm:text-sm md:text-base leading-relaxed roboto font-medium">
              Upload Your Exam Papers, Generate AI-Powered Quizzes, Get Instant Results, 
              And Track Your Performance — All In One Smart Learning Platform.
            </p>
          </div>

          {/* Right Column: CTA Button */}
          <div className="shrink-0 w-full sm:w-auto">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center gap-2.5 bg-[#092449] hover:bg-[#0c2f5d] text-white px-8 py-4 rounded-[6px] text-sm md:text-base font-bold transition-all shadow-md hover:shadow-lg w-full sm:w-auto roboto leading-none active:scale-95"
            >
              <span>Start With AI Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
