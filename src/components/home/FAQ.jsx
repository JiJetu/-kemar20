import { useState } from "react";
import { Settings, Plus, Minus } from "lucide-react";
import { ICONS } from "../../assets";

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqItems = [
    {
      number: "01",
      question: "How Does ExcellIM Generate Quizzes?",
      answer: "Excellim uses advanced ai to analyze uploaded exam papers and automatically generate quiz questions, accurate answers, and detailed solutions within seconds."
    },
    {
      number: "02",
      question: "Is This Platform Suitable For All Grades",
      answer: "Yes, our platform is designed for math learners across all grades, offering custom difficulty settings and generated content that adapts dynamically."
    },
    {
      number: "03",
      question: "Can I Track My Progress?",
      answer: "Absolutely! Students get complete performance metrics, score cards, and diagnostic tracking analytics to review progress over time."
    },
    {
      number: "04",
      question: "Are The Solutions Explained Step By Step",
      answer: "Yes! Every generated question comes with a step-by-step detailed math solution showing all logic, steps, and explanations."
    },
    {
      number: "05",
      question: "Does The Platform Support Rankings?",
      answer: "Yes, the platform has real-time leaderboard rankings where you can view average scores, question stats, and compete with other peers."
    },
    {
      number: "06",
      question: "Can Previous Year Exam Papers Be Used?",
      answer: "Yes! You can upload previous years' exam papers, homework worksheets, or templates in PDF/document formats to generate custom math practice."
    }
  ];

  return (
    <section id="faq" className="w-full bg-white py-20 select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-20">
        
        {/* Left Column: Title & Illustration */}
        <div className="w-full lg:w-[36%] flex flex-col items-start text-left select-none">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 bg-white text-[#082042] text-xs font-bold px-4 py-2 rounded-full border border-slate-200 tracking-wide mb-5 roboto">
            <Settings className="w-4 h-4 text-[#082042]" />
            <span>FAQ</span>
          </div>

          {/* Title */}
          <h2 className="text-[36px] md:text-[44px] lg:text-[48px] font-extrabold text-[#082042] leading-[1.1] mb-2 lora">
            Frequently <br />
            <span className="text-[#32A61D]">Asked</span> <br />
            Questions
          </h2>

          {/* Gradient Divider Line */}
          <div className="w-44 h-1.5 bg-gradient-to-r from-transparent via-[#32A61D] to-transparent rounded-full my-6" />

          {/* Description */}
          <p className="text-[#47515E] text-sm md:text-base leading-relaxed roboto font-medium mb-8 max-w-sm">
            Upload Your Exam Papers, Generate AI-Powered Quizzes, Get Instant Results, And Track Your Performance — All In One Smart Learning Platform.
          </p>

          {/* Illustration */}
          <div className="w-full flex justify-start items-center">
            <img 
              src={ICONS.faqChat} 
              alt="FAQ Chat" 
              className="w-[260px] h-auto object-contain mt-4"
            />
          </div>
        </div>

        {/* Right Column: FAQ Accordion List */}
        <div className="w-full lg:w-[58%] border-t border-b border-slate-100 divide-y divide-slate-100">
          {faqItems.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                className="py-5 w-full cursor-pointer group transition-colors"
              >
                {/* Question Row */}
                <div className="flex items-start justify-between gap-4 w-full">
                  <div className="flex items-start gap-4">
                    {/* Index Number */}
                    <span className="text-[#082042]/70 font-semibold text-sm sm:text-base md:text-lg shrink-0 w-8 text-left mt-0.5 group-hover:text-primary transition-colors">
                      {item.number}
                    </span>
                    {/* Question text */}
                    <h4 className="text-[#082042] text-sm sm:text-base md:text-lg font-bold text-left group-hover:text-primary transition-colors leading-snug">
                      {item.question}
                    </h4>
                  </div>

                  {/* Toggle Circle Icon */}
                  <div className="shrink-0 ml-4">
                    <div className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center transition-all bg-white shadow-sm">
                      {isOpen ? (
                        <Minus className="w-4 h-4 text-[#32A61D] stroke-[3px]" />
                      ) : (
                        <Plus className="w-4 h-4 text-slate-400 stroke-[3px]" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Answer Collapsible Block */}
                {isOpen && (
                  <div className="pl-12 pr-12 mt-3 animate-in slide-in-from-top-2 duration-200">
                    <p className="text-slate-500 font-medium text-xs sm:text-sm md:text-base leading-relaxed text-left max-w-2xl roboto">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
