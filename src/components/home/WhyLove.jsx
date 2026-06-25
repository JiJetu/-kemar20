import { Settings, Bot, Zap, Check } from "lucide-react";
import SectionHeader from "../shared/SectionHeader";
import { IMAGES } from "../../assets";

export default function WhyLove() {
  const rows = [
    {
      index: "01",
      icon: Bot,
      title: "AI Quiz Generation",
      image: IMAGES.loveExcellM1,
      bullets: [
        "Upload Any Exam Paper",
        "AI Automatically Extracts Questions",
        "Generates Answers & Solutions",
        "Ready In Seconds"
      ],
      isImageLeft: true
    },
    {
      index: "02",
      icon: Zap,
      title: "Instant Results",
      image: IMAGES.loveExcellM2,
      bullets: [
        "Students Get Instant Results",
        "View Correct Answers & Solutions",
        "Know Your Score Immediately",
        "Save Time, Improve Faster"
      ],
      isImageLeft: false
    },
    {
      index: "03",
      icon: Bot,
      title: "Performance Tracking",
      image: IMAGES.loveExcellM3,
      bullets: [
        "Track Your Progress Over Time",
        "View Detailed Performance Analytics",
        "Identify Strengths And Weaknesses",
        "Improve With Data-Driven Insights"
      ],
      isImageLeft: true
    },
    {
      index: "04",
      icon: Zap,
      title: "Leaderboard Ranking",
      image: IMAGES.loveExcellM4,
      bullets: [
        "Compare Your Performance With Others",
        "See Your Position On The Leaderboard",
        "Stay Motivated With Healthy Competition",
        "Track Ranking Improvements Over Time"
      ],
      isImageLeft: false
    }
  ];

  return (
    <section id="features" className="w-full bg-white py-20 select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col items-center">
        {/* Heading */}
        <SectionHeader
          badge="FEATURES"
          icon={Settings}
          title={[
            { text: "Why Students ", className: "text-[#1C398E]" },
            "Love Excellm"
          ]}
          description="Powerful AI Tools That Make Exam Practice Smarter, Faster, And More Effective."
        />

        {/* Small blue line decor under description */}
        <div className="w-14 h-[3px] bg-[#1C398E] rounded-full mt-5 mb-16" />

        {/* 4 Alternating Layout Rows */}
        <div className="w-full flex flex-col gap-10 md:gap-16 lg:gap-20">
          {rows.map((row, idx) => {
            const Icon = row.icon;
            return (
              <div
                key={idx}
                className={`flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 ${
                  row.isImageLeft ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Image Column */}
                <div className="w-full lg:w-[50%] flex justify-center">
                  <img
                    src={row.image}
                    alt={row.title}
                    className="w-full h-auto object-contain max-w-[480px] rounded-xl hover:scale-[1.02] transition-transform duration-300 shadow-sm border border-slate-50/50"
                  />
                </div>

                {/* Text Column */}
                <div className="w-full lg:w-[42%] flex flex-col items-start text-left">
                  {/* Step Index Header */}
                  <div className="flex items-center gap-3.5 mb-5">
                    <div className="w-10 h-10 rounded-[12px] bg-[#EBF2FC] text-[#1C398E] flex items-center justify-center shadow-sm shrink-0">
                      <Icon className="w-5 h-5 text-[#1C398E]" />
                    </div>
                    <span className="font-bold text-[#082042] text-[18px] md:text-[20px] tracking-wide">
                      {row.index}
                    </span>
                    <div className="w-14 h-[2px] bg-slate-200" />
                  </div>

                  {/* Title */}
                  <h3 className="text-[#082042] text-2xl md:text-3xl font-extrabold mb-5 roboto tracking-wide">
                    {row.title}
                  </h3>

                  {/* Bullet points */}
                  <ul className="space-y-4 w-full">
                    {row.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-center gap-3.5">
                        <div className="w-5 h-5 bg-[#1C398E] rounded-full text-white flex items-center justify-center shrink-0 shadow-sm">
                          <Check className="w-3.5 h-3.5 text-white stroke-[3.5px]" />
                        </div>
                        <span className="text-[#47515E] font-bold text-sm sm:text-base roboto tracking-wide">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}