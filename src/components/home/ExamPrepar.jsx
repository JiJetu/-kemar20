import { Settings, Zap, Brain } from "lucide-react";
import { IMAGES } from "../../assets";

export default function ExamPrepar() {
  const items = [
    {
      icon: Brain,
      title: "AI Quiz Generation",
      description: "Upload Exam Papers And Get AI-Generated Quizzes With Answers And Solutions In Seconds."
    },
    {
      icon: Zap,
      title: "Instant Results & Solutions",
      description: "Students Receive Instant Scores, Detailed Solutions, And Actionable Feedback Immediately After Completing A Quiz."
    },
    {
      icon: Zap,
      title: "Performance Tracking",
      description: "Monitor Progress Over Time With Advanced Analytics, Performance Insights, And Personalized Learning Recommendations."
    },
    {
      icon: Zap,
      title: "Leaderboard Ranking",
      description: "Compete With Peers, Climb The Leaderboard, And Stay Motivated Through Friendly Competition And Achievement Tracking."
    }
  ];

  return (
    <section id="about" className="w-full bg-white py-20 select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
        
        {/* Left Column: Image */}
        <div className="w-full lg:w-[50%] flex justify-center items-center">
          <img
            src={IMAGES.examPerpar}
            alt="Transforming Exam Papers Into Smarter Learning Experiences"
            className="w-full h-auto object-contain max-w-[550px] lg:max-w-none animate-in fade-in duration-700"
          />
        </div>

        {/* Right Column: Content */}
        <div className="w-full lg:w-[46%] flex flex-col items-start text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 bg-[#F0F5FD] text-[#082042] text-xs font-bold px-4 py-2 rounded-full border border-[#D3E2F8] uppercase tracking-wider mb-5 roboto">
            <Settings className="w-4 h-4 text-[#082042]" />
            <span>ABOUT EXCELLIM</span>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#082042] leading-[1.15] mb-6 lora">
            Transforming Exam Papers <br className="hidden sm:block" />
            Into SmarterLearning <br className="hidden sm:block" />
            <span className="text-[#1C398E]">Experiences</span>
          </h2>

          {/* Description */}
          <p className="text-[#47515E] text-sm md:text-base leading-relaxed roboto font-medium mb-8 max-w-xl">
            ExcellIM Is An AI-Powered Learning Platform That Helps Students Practice Smarter And Achieve Better Results. By Turning Exam Papers Into Interactive Quizzes, We Make Learning More Engaging, Efficient, And Accessible For Everyone.
          </p>

          {/* List of Features */}
          <div className="w-full flex flex-col gap-6 md:gap-8">
            {items.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#1C398E] text-white flex items-center justify-center shrink-0">
                    <Icon className={`w-5 h-5 text-white ${Icon === Zap ? "fill-white" : ""}`} />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-[#082042] text-lg font-bold roboto leading-snug mb-1">
                      {item.title}
                    </h4>
                    <p className="text-[#47515E] text-sm md:text-[15px] font-medium leading-relaxed roboto">
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
