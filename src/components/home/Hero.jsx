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
    <div className="relative w-full min-h-screen bg-white select-none flex items-center overflow-hidden">
      {/* Background Image Container (Layered behind content, extends under the absolute navbar) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden hidden lg:block">
        <img
          src={IMAGES.heroBanner}
          alt="Hero Background"
          className="absolute bottom-0 right-0 w-full lg:w-auto h-auto lg:h-full object-contain object-bottom lg:object-right-bottom z-0 animate-in fade-in duration-700"
          style={{
            // aspectRatio: "1600/1011",
            // clipPath: "inset(1.5% 2% 5% 1.5%)",
          }}
        />
      </div>

      {/* Main Content Container (Layered above the absolute background) */}
      <div className="px-6 md:px-12 lg:px-24 w-full relative z-10 pt-28 pb-10 md:pt-36 md:pb-24 flex flex-col lg:flex-row items-center justify-start">
        
        {/* Left Column: Heading, description, actions, trust index */}
        <div className="relative z-10 w-full lg:w-[46%] flex flex-col items-start text-left animate-in fade-in slide-in-from-left duration-500">
          
          {/* Pill Badge */}
          <span className="inline-flex items-center bg-[#EBF2FC] text-[#2B6CB0] text-xs md:text-sm font-semibold px-4 py-1.5 rounded-full border border-[#BEE3F8] mb-6 tracking-wide roboto">
            AI Powered Learning & Assessment
          </span>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl xl:text-[56px] font-bold text-[#082042] leading-[1.12] mb-6 font-serif tracking-tight lora">
            Learn Smarter <br /> <span className="text-[#01127D]">Achive More.</span>
          </h1>

          {/* Description */}
          <p className="text-[#47515E] text-sm md:text-base leading-relaxed mb-8 max-w-lg lato font-medium roboto">
            ExcellIM is an AI-powered quiz and assessment platform that helps students practice, test their knowledge, and improve performance with instant results and solutions.
          </p>

          {/* Buttons */}
          <div className="flex items-center w-full sm:w-auto">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center bg-[#082042] hover:bg-[#0c2f5d] text-white px-7 py-3.5 rounded-lg text-sm  xl:text-base font-bold transition-all shadow-md hover:shadow-lg gap-2 leading-none"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center justify-center bg-[#F1F5F9] hover:bg-slate-200 text-[#082042] px-7 py-3.5 rounded-lg text-sm  xl:text-base font-bold transition-all ml-4 leading-none"
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
    </div>
  );
}
