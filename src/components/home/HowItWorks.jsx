import { Settings } from "lucide-react";
import { ICONS } from "../../assets";
import SectionHeader from "../shared/SectionHeader";

export default function HowItWorks() {
  const steps = [
    {
      step: "Step 1",
      title: "Create Your Account",
      description: "Sign up easily with your email and create your account to get started",
      theme: "blue",
      icon: (
        <div className="w-28 h-28 rounded-full border border-[#DBEAFE] bg-[#EFF6FF] flex items-center justify-center relative shadow-sm group-hover:scale-105 transition-transform duration-300">
            <img src={ICONS.howItWork1} alt="Create Account" className="w-40 h-40 object-contain" />
   
        </div>
      )
    },
    {
      step: "Step 2",
      title: "Choose A Math Topic",
      description: "Select your math topic or chapter and start practicing with AI generated questions",
      theme: "green",
      icon: (
        <div className="w-28 h-28 rounded-full border border-[#DCFCE7] bg-[#F0FDF4] flex items-center justify-center relative shadow-sm group-hover:scale-105 transition-transform duration-300">
            <img src={ICONS.howItWork2} alt="Choose Math Topic" className="w-60 h-60 object-contain" />
         
        </div>
      )
    },
    {
      step: "Step 3",
      title: "Take AI Timed Quiz",
      description: "Attempt a timed quiz in exam mode and test your knowledge under real exam conditions",
      theme: "blue",
      icon: (
        <div className="w-28 h-28 rounded-full border border-[#DBEAFE] bg-[#EFF6FF] flex items-center justify-center relative shadow-sm group-hover:scale-105 transition-transform duration-300">
            <img src={ICONS.howItWork3} alt="Take Quiz" className="w-60 h-60 object-contain" />
         
        </div>
      )
    },
    {
      step: "Step 4",
      title: "View Results & Leaderboard",
      description: "Get instant results, analyze your performance, and see your rank on the leaderboard.",
      theme: "green",
      icon: (
        <div className="w-28 h-28 rounded-full border border-[#DCFCE7] bg-[#F0FDF4] flex items-center justify-center relative shadow-sm group-hover:scale-105 transition-transform duration-300">
            <img src={ICONS.howItWork4} alt="View Results" className="w-40 h-40 object-contain" />
        </div>
      )
    }
  ];

  return (
    <section id="how-it-works" className="w-full bg-white pb-20 pt-40 select-none">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <SectionHeader
          badge={[
            "How ",
            { text: "it works", className: "text-[#39842B]" }
          ]}
          icon={Settings}
          title={[
            "Learn.Practice.",
            { text: "ExcelJM", className: "text-primary font-extrabold" }
          ]}
          description="Exceljm makes math learning simple and effective. Follow 4 easy steps to improve your skills and achieve your goals"
        />

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-8 mt-16">
          {steps.map((step, idx) => (
            <div 
              key={idx}
              className="bg-white border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] rounded-[24px] py-10 px-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md hover:border-slate-200 group"
            >
              {/* Icon Circle */}
              <div className="mb-6 flex items-center justify-center">
                {step.icon}
              </div>

              {/* Step Pill Badge */}
              <span className={`inline-flex items-center text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-wide roboto border ${
                step.theme === "blue" 
                  ? "bg-[#EFF6FF] text-[#2B6CB0] border-[#DBEAFE]" 
                  : "bg-[#F0FDF4] text-[#39842B] border-[#DCFCE7]"
              }`}>
                {step.step}
              </span>

              {/* Title */}
              <h3 className="text-lg font-bold text-[#082042] mb-3 roboto tracking-wide">
                {step.title}
              </h3>

              {/* Horizontal line divider */}
              <div className={`w-12 h-1 rounded-full mb-4 ${
                step.theme === "blue" ? "bg-[#2B6CB0]" : "bg-[#39842B]"
              }`} />

              {/* Description */}
              <p className="text-slate-500 text-xs md:text-sm leading-relaxed max-w-[240px] mx-auto lato font-medium">
                {step.description}
              </p>
            </div>
          ))}
        </div>



      </div>
    </section>
  );
}
