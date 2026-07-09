import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ICONS } from "../../assets";

export default function CTA() {
  return (
    <section className="w-full bg-white py-20 select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Outer div for gradient border and drop shadow */}
        <div className="bg-gradient-to-b from-[#10A43B] to-white p-[1px] rounded-[20px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
          {/* Inner div for white background and contents */}
          <div className="bg-white rounded-[19px] px-8 py-6 md:px-12 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-8">
            
            {/* Left Column: Heading and Description */}
            <div className="flex flex-col items-start text-left max-w-2xl">
              <h2 className="text-3xl md:text-[38px] font-extrabold text-[#082042] mb-4 lora leading-tight">
                Ready To Improve <br />
                <span className="text-[#39842B]">Your Math Skills?</span>
              </h2>
              <p className="text-[#47515E] text-sm md:text-base leading-relaxed roboto font-medium">
                Upload Your Exam Papers, Generate AI-Powered Quizzes, Get Instant Results,
                And Track Your Performance — All In One Smart Learning Platform.
              </p>
            </div>

            {/* Right Column: Graduation Cap Icon & CTA Button */}
            <div className="flex flex-col items-center gap-4 shrink-0 w-full md:w-auto">
              <img
                src={ICONS.graduationCap}
                alt="Graduation Cap"
                className="w-44 h-44 object-contain"
                style={{ animationDuration: "3s" }}
              />
              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-2.5 bg-[#10A43B] hover:bg-[#10A43B]/90 text-white px-8 py-4 rounded-[6px] text-sm md:text-base font-bold transition-all shadow-md hover:shadow-lg w-full md:w-auto roboto leading-none active:scale-95"
              >
                <span>Start Free</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
