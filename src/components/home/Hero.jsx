import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { IMAGES } from "../../assets";

export default function Hero() {
  const trustAvatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80",
  ];

  return (
    <div className="relative w-full lg:min-h-screen bg-white select-none flex items-center">
      {/* Background Image Container (Layered behind content, extends under the absolute navbar) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden hidden lg:block">
        <img
          src={IMAGES.heroBanner}
          alt="Hero Background"
          className="w-full h-full object-fill z-0 animate-in fade-in duration-700"
        />
        {/* Smooth white gradient overlay to cover top-left dots and circles */}
        <div className="absolute top-0 left-0 w-64 h-48 bg-gradient-to-br from-white via-white to-transparent z-10" />
      </div>

      {/* Main Content Container (Layered above the absolute background) */}
      <div className="px-6 md:px-12 lg:px-24 w-full relative z-10 pt-28 pb-10 md:pt-36 md:pb-24 flex flex-col lg:flex-row items-center justify-start">
        
        {/* Left Column: Heading, description, actions, trust index */}
        <div className="relative z-10 w-full lg:w-[46%] lg:max-w-[440px] flex flex-col items-start text-left animate-in fade-in slide-in-from-left duration-500">
          
          {/* Pill Badge */}
          <span className="inline-flex items-center bg-[#FFFFFF] text-[#39842B] text-xs md:text-sm font-semibold px-4 py-1.5 rounded-full border border-[#39842B] mb-6 tracking-wide roboto">
            AI Powered Learning & Assessment
          </span>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl xl:text-[56px] font-bold text-[#082042] leading-[1.12] mb-6 font-serif tracking-tight lora">
            Learn Smarter <br /> <span className="text-[#39842B]">Achieve More.</span>
          </h1>

          {/* Description */}
          <p className="text-[#47515E] text-sm md:text-base leading-relaxed mb-8 max-w-lg lato font-medium nunito">
            ExcellIM is an AI-powered quiz and assessment platform that helps students practice, test their knowledge, and improve performance with instant results and solutions.
          </p>

          {/* Buttons */}
          <div className="flex items-center w-full sm:w-auto">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center bg-[#092449] text-white px-7 py-3.5 rounded-lg text-sm  xl:text-base font-bold transition-all shadow-md hover:shadow-lg gap-2 leading-none"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center justify-center bg-[#FFFFFF] text-[#1C398E] border border-[#E6E6E6] px-7 py-3.5 rounded-lg text-sm  xl:text-base font-bold transition-all ml-4 leading-none"
            >
              Explore Features
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center mt-8">
            <div className="flex -space-x-3">
              {trustAvatars.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`User ${idx + 1}`}
                  className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-sm shrink-0"
                />
              ))}
            </div>
            <p className="text-slate-400 text-xs md:text-sm font-medium lato text-left ml-4 leading-snug">
              Trusted by <span className="text-[#C48012] font-bold">500+ fami</span> students and educators
            </p>
          </div>

        </div>
        
        {/* Right spacing area on desktop (background sits absolute behind it) */}
        <div className="hidden lg:block lg:w-[54%] pointer-events-none" />

      </div>

      {/* Floating Stats Card overlapping Hero and HowItWorks */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20 w-[90%] max-w-6xl bg-white rounded-[20px] border border-[#E6E8EC] shadow-[0_12px_40px_rgba(0,0,0,0.06)] py-6 md:py-8 px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0">
          {/* Card 1 */}
          <div className="flex flex-col items-center justify-center text-center py-2 md:border-r border-slate-100">
            <span className="text-3xl md:text-[38px] font-bold text-[#39842B] mb-2 leading-none">5,000+</span>
            <span className="text-[#47515E] text-xs md:text-sm xl:text-base font-semibold">Students</span>
          </div>
          {/* Card 2 */}
          <div className="flex flex-col items-center justify-center text-center py-2 border-l border-slate-100 md:border-l-0 md:border-r">
            <span className="text-3xl md:text-[38px] font-bold text-[#39842B] mb-2 leading-none">50,000+</span>
            <span className="text-[#47515E] text-xs md:text-sm xl:text-base font-semibold">Questions practiced</span>
          </div>
          {/* Card 3 */}
          <div className="flex flex-col items-center justify-center text-center py-2 border-t md:border-t-0 md:border-r border-slate-100">
            <span className="text-3xl md:text-[38px] font-bold text-[#39842B] mb-2 leading-none">10,000+</span>
            <span className="text-[#47515E] text-xs md:text-sm xl:text-base font-semibold">Questions practiced</span>
          </div>
          {/* Card 4 */}
          <div className="flex flex-col items-center justify-center text-center py-2 border-t border-l border-slate-100 md:border-t-0 md:border-l-0">
            <span className="text-3xl md:text-[38px] font-bold text-[#39842B] mb-2 leading-none">95%</span>
            <span className="text-[#47515E] text-xs md:text-sm xl:text-base font-semibold">Student satisfaction</span>
          </div>
        </div>
      </div>
    </div>
  );
}
