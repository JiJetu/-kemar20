import { 
  Settings, 
  Upload, 
  Cpu, 
  Clock, 
  Trophy, 
  Check, 
  ListChecks, 
  HelpCircle, 
  MousePointer} from "lucide-react";
import SectionHeader from "../shared/SectionHeader";
import { IMAGES } from "../../assets";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Upload Exam Paper",
      description: "Admin uploads previous year exam papers or question PDFs.",
      illustration: (
        <div className="w-full h-full bg-[#F5F8FC] flex items-center justify-center relative overflow-hidden">
          {/* Decorative Grid Lines */}
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:12px_12px]" />
          
          {/* Left Floating Document */}
          <div className="absolute left-[15%] top-[18%] bg-white border border-slate-100 rounded-lg p-2 w-16 h-20 shadow-sm flex flex-col justify-between -rotate-12 transform-gpu transition-all duration-300 hover:rotate-0 hover:translate-y-[-4px]">
            <div className="space-y-1">
              <div className="w-8 h-1.5 bg-slate-200 rounded-sm" />
              <div className="w-10 h-1.5 bg-slate-100 rounded-sm" />
              <div className="w-6 h-1.5 bg-slate-100 rounded-sm" />
            </div>
            <span className="bg-red-100 text-red-600 font-bold text-[8px] px-1 py-0.5 rounded uppercase self-start roboto">PDF</span>
          </div>

          {/* Right Floating Document */}
          <div className="absolute right-[15%] top-[18%] bg-white border border-slate-100 rounded-lg p-2 w-16 h-20 shadow-sm flex flex-col justify-between rotate-12 transform-gpu transition-all duration-300 hover:rotate-0 hover:translate-y-[-4px]">
            <div className="space-y-1">
              <div className="w-10 h-1.5 bg-slate-200 rounded-sm" />
              <div className="w-6 h-1.5 bg-slate-100 rounded-sm" />
              <div className="w-8 h-1.5 bg-slate-100 rounded-sm" />
            </div>
            <span className="bg-blue-100 text-blue-600 font-bold text-[8px] px-1 py-0.5 rounded uppercase self-start roboto">DOC</span>
          </div>

          {/* Central Upload Cloud */}
          <div className="bg-[#2B6CB0] text-white p-4 rounded-2xl shadow-[0_8px_16px_rgba(43,108,176,0.3)] w-14 h-14 flex items-center justify-center z-10 transform-gpu hover:scale-110 transition-transform duration-300">
            <Upload className="w-6 h-6 animate-pulse" />
          </div>
        </div>
      )
    },
    {
      number: "02",
      title: "AI Generates Quiz",
      description: "AI automatically extracts questions, generates answers, and prepares solutions.",
      illustration: (
        <div className="w-full h-full bg-[#F5F8FC] flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:12px_12px]" />
          
          {/* Circuit Lines Background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
            <div className="w-32 h-[2px] bg-[#2B6CB0]" />
            <div className="w-[2px] h-32 bg-[#2B6CB0] absolute" />
          </div>

          {/* Floating Badges */}
          <div className="absolute left-[18%] top-[18%] bg-emerald-500 text-white rounded-lg p-1.5 shadow-sm w-7 h-7 flex items-center justify-center z-20 animate-bounce duration-1000">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div className="absolute right-[18%] top-[15%] bg-purple-500 text-white rounded-lg p-1.5 shadow-sm w-7 h-7 flex items-center justify-center z-20 animate-pulse">
            <ListChecks className="w-4 h-4" />
          </div>
          <div className="absolute right-[22%] bottom-[20%] bg-amber-500 text-white rounded-lg p-1.5 shadow-sm w-7 h-7 flex items-center justify-center z-20 hover:scale-110 transition-transform">
            <Check className="w-4 h-4" />
          </div>

          {/* Central AI Processor */}
          <div className="bg-[#082042] text-white font-bold px-4 py-3 rounded-2xl shadow-[0_8px_20px_rgba(8,32,66,0.35)] z-10 flex flex-col items-center justify-center w-14 h-14 border border-slate-700/50 hover:rotate-6 transition-transform">
            <Cpu className="w-4 h-4 text-emerald-400 mb-0.5 animate-spin" style={{ animationDuration: '6s' }} />
            <span className="text-[10px] tracking-widest roboto font-black">AI</span>
          </div>
        </div>
      )
    },
    {
      number: "03",
      title: "Students Take Quiz",
      description: "Students practice with a clean, timed quiz experience on web or mobile.",
      illustration: (
        <div className="w-full h-full bg-[#F5F8FC] flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:12px_12px]" />
          
          {/* Quiz Card Viewport */}
          <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-3 w-40 h-28 flex flex-col relative transform-gpu hover:translate-y-[-2px] transition-transform duration-300">
            {/* Mock Header */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-1.5">
              <span className="text-[8px] font-bold text-slate-800 uppercase tracking-wide">Quiz</span>
              <div className="flex gap-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
              </div>
            </div>
            {/* Options list */}
            <div className="space-y-1.5 relative">
              {/* Selected state item */}
              <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-md py-1 px-1.5 flex items-center gap-1.5 text-[8px] font-semibold">
                <div className="w-2 h-2 rounded-full bg-emerald-400 flex items-center justify-center">
                  <Check className="w-1 h-1 text-white" />
                </div>
                <span>Option A - Correct</span>
              </div>
              {/* Normal item */}
              <div className="bg-slate-50 border border-slate-100 rounded-md py-1 px-1.5 flex items-center gap-1.5 text-[8px]">
                <div className="w-2 h-2 rounded-full bg-slate-200" />
                <span className="text-slate-500">Option B - Incorrect</span>
              </div>
            </div>

            {/* Mouse Pointer Cursor Overlay */}
            <div className="absolute right-[30%] bottom-[20%] text-slate-700 animate-pulse pointer-events-none">
              <MousePointer className="w-4 h-4 fill-slate-700" />
            </div>
          </div>

          {/* Floating Blue stopwatch clock */}
          <div className="absolute right-[12%] bottom-[12%] bg-[#2B6CB0] text-white rounded-full p-2 shadow-md z-10 w-9 h-9 flex items-center justify-center animate-pulse">
            <Clock className="w-5 h-5" />
          </div>
        </div>
      )
    },
    {
      number: "04",
      title: "Instant Results & Ranking",
      description: "Get scores, solutions, performance insights, and leaderboard rankings instantly.",
      illustration: (
        <div className="w-full h-full bg-[#F5F8FC] flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:12px_12px]" />
          
          {/* Floating Score Badge */}
          <div className="absolute left-[10%] top-[15%] bg-white border border-slate-100 rounded-xl shadow-sm p-1.5 px-2 flex items-center gap-1.5 z-10 transform-gpu hover:scale-105 transition-transform duration-200">
            <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Check className="w-2.5 h-2.5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[6px] text-slate-400 uppercase leading-none font-bold">Score</span>
              <span className="text-[10px] font-bold text-slate-800 leading-none">95%</span>
            </div>
          </div>

          {/* Golden Trophy on the right */}
          <div className="absolute right-[12%] top-[12%] bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-xl p-2 w-9 h-9 flex items-center justify-center shadow-sm z-10 animate-bounce duration-1000">
            <Trophy className="w-5 h-5" />
          </div>

          {/* Leaderboard Ranks Container */}
          <div className="absolute right-[10%] bottom-[15%] bg-white border border-slate-100 rounded-lg p-1.5 w-24 flex flex-col gap-1 shadow-sm z-10">
            <div className="flex items-center justify-between text-[7px] border-b border-slate-50 pb-0.5">
              <span className="font-bold text-slate-400 uppercase">Rankings</span>
            </div>
            <div className="flex items-center gap-1 text-[7px]">
              <span className="font-bold text-amber-500">1</span>
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=30&h=30&q=80" className="w-3.5 h-3.5 rounded-full object-cover" alt="" />
              <span className="text-slate-700 font-medium truncate w-8">Papon</span>
              <span className="font-bold text-slate-500 ml-auto">950</span>
            </div>
            <div className="flex items-center gap-1 text-[7px]">
              <span className="font-bold text-slate-400">2</span>
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=30&h=30&q=80" className="w-3.5 h-3.5 rounded-full object-cover" alt="" />
              <span className="text-slate-700 font-medium truncate w-8">Roy</span>
              <span className="font-bold text-slate-500 ml-auto">880</span>
            </div>
          </div>

          {/* Visual Bar Chart on bottom-left */}
          <div className="absolute left-[10%] bottom-[15%] w-16 h-12 flex items-end gap-1 bg-white border border-slate-100 rounded-lg p-1.5 shadow-sm z-10">
            <div className="w-2.5 h-[35%] bg-slate-200 rounded-sm" />
            <div className="w-2.5 h-[65%] bg-slate-300 rounded-sm" />
            <div className="w-2.5 h-[100%] bg-[#2B6CB0] rounded-sm animate-pulse" />
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="how-it-works" className="w-full bg-white py-20 select-none">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Reusable Section Header Component */}
        <SectionHeader
          badge="How It Works"
          icon={Settings}
          title={[
            "How ",
            { text: "ExcellIM", className: "text-[#1C398E]" },
            " Works"
          ]}
          description="Turn exam papers into interactive quizzes in minutes. upload, generate, practice, and track performance — all powered by ai."
        />

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-8 mt-16">
          {steps.map((step, idx) => (
            <div 
              key={idx}
              className="bg-white border border-[#E8F0FA] rounded-[20px] shadow-sm relative pt-12 pb-8 px-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md hover:border-[#D0E2F8] group"
            >
              {/* Step Index Badge (Centered on the top border line) */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#082042] text-white flex items-center justify-center font-bold text-sm z-10 border-4 border-white shadow-sm transition-transform duration-300 group-hover:scale-110">
                {step.number}
              </div>

              {/* Illustration Frame */}
              <div className="w-full h-40 rounded-xl overflow-hidden mb-6 border border-slate-100">
                {step.illustration}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-[#082042] mb-3 roboto tracking-wide">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-slate-500 text-xs md:text-sm leading-relaxed max-w-[240px] mx-auto lato font-medium">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="max-w-2xl mx-auto mt-20 px-6">
          <div className="bg-white border border-[#E5EDF6] rounded-2xl md:rounded-full px-6 py-4 md:py-3.5 flex flex-col md:flex-row items-center justify-center gap-3.5 shadow-sm text-center">
            {/* Logo */}
            <div className="flex items-center gap-1 shrink-0">
              <img src={IMAGES.logo} className="h-10 w-auto object-contain" alt="ExcelJM Logo" />
            </div>
            {/* Text description */}
            <p className="text-[#082042] text-xs sm:text-sm font-semibold roboto">
              ExcellIM makes exam preparation <span className="text-[#5D9E32] font-bold">smarter, faster</span>, and <span className="text-[#5D9E32] font-bold">more effective</span> for everyone.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
