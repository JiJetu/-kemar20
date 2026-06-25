import React, { useState } from "react";
import { Settings, Plus, Minus } from "lucide-react";
import SectionHeader from "../shared/SectionHeader";

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqItems = [
    {
      number: "01",
      question: "How Does ExcellIM Generate Quizzes?",
      answer: "ExcellIM Uses Advanced AI To Analyze Uploaded Exam Papers And Automatically Generate Quiz Questions, Accurate Answers, And Detailed Solutions Within Seconds."
    },
    {
      number: "02",
      question: "Can Students View Solutions After Completing A Quiz?",
      answer: "Yes! Students can access correct answers, dynamic score stats, and step-by-step solutions instantly after completing any practice quiz."
    },
    {
      number: "03",
      question: "Can Admins Edit AI-Generated Quizzes?",
      answer: "Absolutely. Admins have a dedicated review panel where they can modify generated questions, add choices, edit explanations, or publish sheets directly to students."
    },
    {
      number: "04",
      question: "What File Formats Are Supported?",
      answer: "We support standard PDF, DOC, and DOCX document uploads for automated question and assessment generation."
    },
    {
      number: "05",
      question: "Does The Platform Support Rankings?",
      answer: "Yes, ExcellIM features a dynamic leaderboard ranking system showing top scores, averages, and rankings to motivate learning progress."
    },
    {
      number: "06",
      question: "Can Previous Year Exam Papers Be Used?",
      answer: "Yes! Uploading previous year papers, homework files, or textbook templates is the easiest way to generate accurate diagnostic practice sheets."
    }
  ];

  return (
    <section id="faq" className="w-full bg-white py-20 select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col items-center">
        {/* Header */}
        <SectionHeader
          badge="FAQ"
          icon={Settings}
          title={[
            "Frequently ",
            { text: "Asked ", className: "text-[#1C398E]" },
            "Questions"
          ]}
          description="Everything you need to know about excellim."
        />

        {/* FAQ Accordion List */}
        <div className="w-full max-w-4xl border-t border-slate-200 mt-16">
          {faqItems.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                className="border-b border-slate-200 py-6 w-full cursor-pointer group transition-colors"
              >
                {/* Question Row */}
                <div className="flex items-start justify-between gap-4 w-full">
                  <div className="flex items-start gap-4">
                    {/* Index Number */}
                    <span className="text-[#082042]/70 font-semibold text-sm sm:text-base md:text-lg shrink-0 w-8 text-left mt-0.5 group-hover:text-[#1C398E] transition-colors">
                      {item.number}
                    </span>
                    {/* Question text */}
                    <h4 className="text-[#082042] text-sm sm:text-base md:text-lg font-bold text-left group-hover:text-[#1C398E] transition-colors leading-snug">
                      {item.question}
                    </h4>
                  </div>

                  {/* Toggle Circle Icon */}
                  <div className="shrink-0 ml-4">
                    <div
                      className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                        isOpen
                          ? "border-[#5D9E32] bg-[#5D9E32]/5 text-[#5D9E32]"
                          : "border-[#082042] text-[#082042] hover:border-[#1C398E] hover:text-[#1C398E]"
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="w-4 h-4 stroke-[3px]" />
                      ) : (
                        <Plus className="w-4 h-4 stroke-[3px]" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Answer Collapsible Block */}
                {isOpen && (
                  <div className="pl-12 pr-12 mt-3 animate-in slide-in-from-top-2 duration-200">
                    <p className="text-[#47515E] font-medium text-xs sm:text-sm md:text-base leading-relaxed text-left max-w-3xl roboto">
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
