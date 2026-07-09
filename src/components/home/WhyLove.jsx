import { Sparkles, Check } from "lucide-react";
import SectionHeader from "../shared/SectionHeader";
import { ICONS, IMAGES } from "../../assets";

export default function WhyLove() {
  const rows = [
    {
      index: "01",
      title: "AI Quiz Generation",
      image: IMAGES.loveExcellM1,
      theme: "blue",
      bullets: [
        "Upload Any Exam Paper",
        "AI Automatically Extracts Questions",
        "Generates Answers & Solutions",
        "Ready In Seconds",
      ],
      isImageLeft: true,
    },
    {
      index: "02",
      title: "Instant Score & Analysis",
      image: IMAGES.loveExcellM2,
      theme: "green",
      bullets: [
        "Get Instant Score After Every Quiz",
        "Detailed Performance Breakdown",
        "Identify Strong & Weak Topics",
        "Track Improvement Over Time",
      ],
      isImageLeft: false,
    },
    {
      index: "03",
      title: "Performance Tracking",
      image: IMAGES.loveExcellM3,
      theme: "blue",
      bullets: [
        "Track Your Performance Over Time",
        "Visual Insight With Graphics",
        "Understand Your Progress",
        "Focus On Weak Areas",
      ],
      isImageLeft: true,
    },
    {
      index: "04",
      title: "Leaderboard & Ranking",
      image: IMAGES.loveExcellM4,
      theme: "green",
      bullets: [
        "Compete With Students Across The Nation",
        "Real-Time Leaderboard Updates",
        "See Your Rank & Improve",
        "Stay Motivated Every Day",
      ],
      isImageLeft: false,
    },
  ];

  return (
    <section id="features" className="w-full bg-white py-20 select-none">
      <div className="px-6 md:px-12 lg:px-24 flex flex-col items-center">
        {/* Heading */}
        <SectionHeader
          badge={[
            "Explore ",
            { text: "Features", className: "text-primary" }
          ]}
          icon={Sparkles}
          title="Why Students Love Excelim"
          description="Excellim makes exam preparation smarter, faster, and more effective with powerful tools designed for real results"
        />

        {/* Space separator */}
        <div className="mb-16" />

        {/* 4 Alternating Layout Rows */}
        <div className="w-full flex flex-col gap-12 md:gap-16 lg:gap-20">
          {rows.map((row, idx) => {
            return (
              <div
                key={idx}
                className={`w-full rounded-[32px] p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 ${
                  row.theme === "blue" ? "bg-[#DCE8FD]" : "bg-[#EBF9E9]"
                } ${row.isImageLeft ? "" : "lg:flex-row-reverse"}`}
              >
                {/* Image Column */}
                <div className="w-full lg:w-[48%] flex justify-center">
                  <div className="bg-white p-4 md:p-6 rounded-[24px] shadow-sm border border-slate-100/50 w-full max-w-[540px]">
                    <img
                      src={row.image}
                      alt={row.title}
                      className="w-full h-auto object-contain rounded-2xl"
                    />
                  </div>
                </div>

                {/* Text Column */}
                <div className="w-full lg:w-[42%] flex flex-col items-start text-left">
                  {/* Step Index Header */}
                  <div className="flex items-center gap-3.5 mb-5">
                    <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center shadow-sm shrink-0 ${
                      row.theme === "blue" ? "bg-[#D0DFFF] text-[#1C398E]" : "bg-[#D1EBD0] text-[#39842B]"
                    }`}>
                      <img src={ICONS.botIcon} alt={row.title} className="w-8 h-8" />
                    </div>
                    <span className={`font-bold  text-[18px] md:text-[20px] tracking-wide ${
                      row.theme === "blue" ? "text-secondary" : "text-primary"
                    }`}>
                      {row.index}
                    </span>
                    <div className={`w-12 h-[2px] ${
                      row.theme === "blue" ? "bg-blue-200" : "bg-emerald-200"
                    }`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-[#082042] text-2xl md:text-3xl font-extrabold mb-5 roboto tracking-wide leading-tight">
                    {row.title}
                  </h3>

                  {/* Bullet points */}
                  <ul className="space-y-4 w-full">
                    {row.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-center gap-3.5">
                        <div className={`w-5 h-5 rounded-full text-white flex items-center justify-center shrink-0 shadow-sm ${
                          row.theme === "blue" ? "bg-secondary" : "bg-[#39842B]"
                        }`}>
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
