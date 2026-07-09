import { Sparkles, Zap, BarChart3, Target } from "lucide-react";
import { IMAGES } from "../../assets";

export default function ExamPrepar() {
  const items = [
    {
      icon: Sparkles,
      title: "Smart Question Generation",
      description: "AI Generates personalized questions based on your topic and difficulty level."
    },
    {
      icon: Zap,
      title: "Instant Solutions",
      description: "Get step-by-step solutions instantly with clear explanations."
    },
    {
      icon: BarChart3,
      title: "Real-Time Progress",
      description: "Track your performance and identify your strengths & weaknesses."
    },
    {
      icon: Target,
      title: "Exam Ready Practice",
      description: "Practice like real exams and boost your confidence to score higher."
    }
  ];

  return (
    <section 
      id="about" 
      className="w-full py-20 select-none bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${IMAGES.examPreparBG})` }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
        
        {/* Left Column: Image */}
        <div className="w-full lg:w-[50%] flex justify-center items-center">
          <img
            src={IMAGES.examPerpar}
            alt="Learn Mathematics With AI Assistance"
            className="w-full h-auto object-contain max-w-[550px] lg:max-w-none animate-in fade-in duration-700 hover:scale-[1.01] transition-transform"
          />
        </div>

        {/* Right Column: Content */}
        <div className="w-full lg:w-[46%] flex flex-col items-start text-left">
          
          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-extrabold text-[#082042] leading-[1.15] mb-6 lora">
            Learn Mathematics <br className="hidden sm:block" />
            With <span className="text-[#39842B]">AI Assistance</span>
          </h2>

          {/* Description */}
          <p className="text-[#47515E] text-sm md:text-base leading-relaxed roboto font-medium mb-8 max-w-xl">
            Excelim uses advanced ai technology to help you learn, practice, and master mathematics more effectively.
          </p>

          {/* List of Features */}
          <div className="w-full flex flex-col gap-6">
            {items.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-[#EBF9E9] text-[#39842B] flex items-center justify-center shrink-0 shadow-sm border border-slate-100/50">
                    <Icon className="w-6 h-6 text-[#39842B]" />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-[#082042] text-lg font-bold roboto leading-snug mb-1">
                      {item.title}
                    </h4>
                    <p className="text-[#47515E] text-sm font-medium leading-relaxed roboto">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
