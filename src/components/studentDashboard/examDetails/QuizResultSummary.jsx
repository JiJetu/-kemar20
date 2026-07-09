import { Check, ChevronLeft, Clock, Target, X } from "lucide-react";
import Leaderboard from "./Leaderboard";
import SolutionPdf from "./SolutionPdf";
import { ICONS } from "../../../assets";
import { parseMathEquation } from "../../../lib/utils/math";
import { useGetQuizResultQuery } from "../../../redex/features/quiz/quiz.api";

// Helper to get step-by-step math derivations for solutions
const getQuestionSolutionSteps = (q) => {
  if (q.id === 1 || q.id === 6) {
    return [
      "x = x^2 / 2^2 + 1/2 + 14",
      "x = x^2 / 4 + 1/2 + 14",
      "4x = x^2 + 2 + 56",
      "x^2 - 4x + 58 = 0",
      "x = 3"
    ];
  }
  
  return [
    q.equation || "x = 3",
    "\\text{Simplify terms and constants}",
    "\\text{Isolate variable on one side}",
    "\\text{Solve for the target value}",
    q.correctText || "solution"
  ];
};

const QuizResultSummary = ({ results, totalCount, mockQuestions, answers, onBack, quizId }) => {
  const { data: quizResult, isLoading } = useGetQuizResultQuery(quizId);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 w-full">
        <div className="w-10 h-10 border-4 border-[#39842B] border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-500 font-medium roboto">Loading quiz results...</p>
      </div>
    );
  }

  // Override results with API response if available
  const apiResults = quizResult ? {
    correctCount: quizResult.score ?? 0,
    incorrectCount: (quizResult.total - quizResult.score) ?? 0,
    accuracy: quizResult.percentage ?? 0,
    timeTaken: quizResult.time_taken ?? results?.timeTaken ?? "00:00",
    rank: quizResult.rank ?? results?.rank ?? 1,
    totalRank: quizResult.total_rank ?? results?.totalRank ?? 1,
  } : results;

  const finalTotalCount = quizResult?.total ?? quizResult?.questions?.length ?? totalCount ?? 10;
  const correctPct = Math.round((apiResults.correctCount / finalTotalCount) * 100) || 0;
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (correctPct / 100) * circumference;

  const displayQuestions = (quizResult?.answers || quizResult?.questions || mockQuestions || []).map((q, idx) => {
    const keys = ["A", "B", "C", "D"];
    const optionsList = (q.options || []).map((opt) => typeof opt === "object" ? opt.val : opt);
    
    let selectedText = "";
    if (q.selected_option !== undefined && q.selected_option !== null) {
      if (typeof q.selected_option === "number" || (!isNaN(q.selected_option) && typeof q.selected_option === "string" && q.selected_option.trim() !== "")) {
        const optIndex = Number(q.selected_option);
        selectedText = optionsList[optIndex] !== undefined ? optionsList[optIndex] : String(q.selected_option);
      } else {
        selectedText = q.selected_option;
      }
    } else if (answers && answers[idx]) {
      const optIndex = keys.indexOf(answers[idx]);
      selectedText = optIndex !== -1 && optionsList[optIndex] !== undefined ? optionsList[optIndex] : answers[idx];
    }
    
    let correctText = "";
    const correctVal = q.correct_answer !== undefined ? q.correct_answer : q.correct_option;
    if (correctVal !== undefined && correctVal !== null) {
      if (typeof correctVal === "number" || (!isNaN(correctVal) && typeof correctVal === "string" && correctVal.trim() !== "")) {
        const optIndex = Number(correctVal);
        correctText = optionsList[optIndex] !== undefined ? optionsList[optIndex] : String(correctVal);
      } else {
        correctText = correctVal;
      }
    } else if (q.options && Array.isArray(q.options) && typeof q.options[0] === "object") {
      const correctOpt = q.options.find(o => o.correct);
      correctText = correctOpt ? correctOpt.val : "";
    }

    const isCorrect = q.is_correct ?? (selectedText === correctText);

    return {
      id: q.question || q.id || (idx + 1),
      text: q.question_text || q.text || "Question",
      selectedText,
      correctText,
      isCorrect,
      steps: q.steps || [],
      explanation: q.explanation || "",
      equation: q.equation || "",
    };
  });

  return (
    <div className="w-full flex flex-col pb-10 select-none text-slate-800 lato text-left px-2">
      {/* Back Link */}
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1 text-[#082042] hover:underline text-sm font-bold mb-4 w-fit cursor-pointer select-none lato"
      >
        <ChevronLeft size={16} />
        Back To Topics
      </button>

      {/* Title block */}
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-[#082042] roboto">Quiz Summary</h1>
        <p className="text-sm text-slate-500 font-medium mt-1 lato">Here's How You Performed In This Quiz.</p>
      </div>

      {/* Performance Metrics Row */}
      <div className="w-full bg-white border border-slate-200 rounded-[20px] p-6 shadow-sm mb-6 flex flex-wrap md:flex-nowrap items-center justify-between gap-6">
        {/* Circle score chart */}
        <div className="flex items-center justify-center shrink-0 w-32 h-32 relative">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r={radius}
              className="text-red-500"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
            />
            <circle
              cx="64"
              cy="64"
              r={radius}
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="#66A331"
              fill="transparent"
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-xl font-extrabold text-[#082042] roboto">
              {apiResults.correctCount}/{finalTotalCount}
            </span>
            <span className="text-[11px] text-[#66A331] font-bold mt-0.5 roboto">
              {correctPct}%
            </span>
            <span className="text-[9px] text-slate-400 font-medium -mt-0.5 uppercase tracking-wider lato">
              score
            </span>
          </div>
        </div>

        <div className="w-[1px] bg-slate-200 h-16 hidden md:block"></div>

        {/* Correct count */}
        <div className="flex flex-col items-center text-center flex-1 min-w-[80px]">
          <div className="w-10 h-10 rounded-xl bg-[#E8F5E9] text-[#66A331] flex items-center justify-center shadow-sm">
            <Check size={24} color="#66A331" />
          </div>
          <span className="text-base font-extrabold text-[#66A331] mt-3 roboto">
            {apiResults.correctCount}
          </span>
          <span className="text-xs text-slate-500 font-bold -mt-0.5 lato">
            correct
          </span>
        </div>

        <div className="w-[1px] bg-slate-200 h-16 hidden md:block"></div>

        {/* Incorrect count */}
        <div className="flex flex-col items-center text-center flex-1 min-w-[80px]">
          <div className="w-10 h-10 rounded-xl bg-[#FFECEE] text-red-500 flex items-center justify-center shadow-sm">
            <X size={24} color="red" />
          </div>
          <span className="text-base font-extrabold text-slate-700 mt-3 roboto">
            {apiResults.incorrectCount}
          </span>
          <span className="text-xs text-slate-500 font-bold -mt-0.5 lato">
            incorrect
          </span>
        </div>

        {/* <div className="w-[1px] bg-slate-200 h-16 hidden md:block"></div> */}

        {/* Time Taken */}
        {/* <div className="flex flex-col items-center text-center flex-1 min-w-[100px]">
          <div className="w-10 h-10 rounded-xl bg-[#E8F0FE] text-[#1A73E8] flex items-center justify-center shadow-sm">
            <Clock size={24} color="#1A73E8" />
          </div>
          <span className="text-base font-extrabold text-slate-800 mt-3 roboto">
            {apiResults.timeTaken}
          </span>
          <span className="text-xs text-slate-500 font-bold -mt-0.5 lato">
            Time Taken
          </span>
        </div> */}

        <div className="w-[1px] bg-slate-200 h-16 hidden md:block"></div>

        {/* Accuracy */}
        <div className="flex flex-col items-center text-center flex-1 min-w-[100px]">
          <div className="w-10 h-10 rounded-xl bg-[#F3E8FF] text-purple-600 flex items-center justify-center shadow-sm">
            <Target size={24} color="purple" />
          </div>
          <span className="text-base font-extrabold text-purple-600 mt-3 roboto">
            {apiResults.accuracy}%
          </span>
          <span className="text-xs text-slate-500 font-bold -mt-0.5 lato">
            Accuracy
          </span>
        </div>

        <div className="w-[1px] bg-slate-200 h-16 hidden md:block"></div>

        {/* Rank Badge */}
        <div className="flex items-center justify-between bg-[#FFF8E7] border border-orange-100 rounded-xl p-4 flex-1 min-w-[200px] h-20 shadow-sm relative overflow-hidden">
          <div className="flex flex-col text-left">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider lato">
              Your Rank
            </span>
            <span className="text-[26px] font-extrabold text-orange-500 leading-none mt-1 roboto">
              {apiResults.rank} / {apiResults.totalRank}
            </span>
          </div>
          <img
            src={ICONS.crown}
            alt="Crown"
            className="w-14 h-12 object-contain drop-shadow-[0_2px_4px_rgba(253,186,116,0.3)] shrink-0"
          />
        </div>
      </div>

      {/* 2-Column Split: Solutions & Papers on left, Leaderboard on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full mb-6">
        {/* Left: Question Solutions & Previous Papers (Col-span 8) */}
        <div className="lg:col-span-8 flex flex-col gap-6 w-full">
          <div className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-sm flex flex-col max-h-[750px]">
            <h3 className="text-lg font-bold text-[#082042] border-b border-slate-100 pb-3 mb-4 roboto">
              Question Solutions
            </h3>
            
            <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-4 custom-scrollbar">
              {displayQuestions.map((q, idx) => {
                const isCorrect = q.isCorrect;

                return (
                  <div
                    key={q.id}
                    className="border border-slate-200 rounded-xl p-4 flex flex-col gap-3 hover:border-slate-300 transition-all text-left bg-[#FCFDFE]"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${
                            isCorrect ? "bg-[#66A331]" : "bg-red-500"
                          }`}
                        >
                          {isCorrect ? "✓" : "✕"}
                        </span>
                        <span className="text-xs font-bold text-slate-400 lato">
                          {idx + 1}
                        </span>
                        <h4 className="text-[#082042] text-sm sm:text-base font-bold roboto">
                          {q.text}
                        </h4>
                      </div>
                    </div>

                    {/* Solutions info */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-slate-100 pt-2 text-xs font-bold lato">
                      {/* Your Answer */}
                      <span className={isCorrect ? "text-[#66A331]" : "text-red-500"}>
                        Your Answer : {q.selectedText ? q.selectedText : "Not Attempted"}
                      </span>
                      {/* Correct Answer */}
                      <span className="text-[#66A331]">
                        Correct Answer : {q.correctText || "N/A"}
                      </span>
                    </div>

                    {/* Math Equation Resolution */}
                    <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 mt-2">
                      <span className="text-xs font-bold text-[#66A331] uppercase tracking-wider block mb-2 font-mono">
                        solution:
                      </span>
                      {q.steps && q.steps.length > 0 ? (
                        <div className="flex flex-col gap-2 font-sans text-xs text-slate-700">
                          {q.steps.map((step, sIdx) => (
                            <div key={sIdx} className="flex items-start gap-2 leading-relaxed">
                              <span className="text-[#66A331] font-bold shrink-0">{sIdx + 1}.</span>
                              <span>{parseMathEquation(step)}</span>
                            </div>
                          ))}
                        </div>
                      ) : q.explanation ? (
                        <p className="text-xs text-slate-700 leading-relaxed font-sans font-medium">{q.explanation}</p>
                      ) : (
                        <div className="flex flex-col gap-2 font-mono text-xs text-slate-700">
                          {getQuestionSolutionSteps(q).map((step, sIdx) => (
                            <div key={sIdx} className="flex items-center gap-2">
                              <span className="text-slate-400 shrink-0">{sIdx === 0 ? "Equation:" : `Step ${sIdx}:`}</span>
                              {parseMathEquation(step, true)}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Previous Exam Papers (Stacked in the Left Column) */}
          <SolutionPdf pdfUrl={quizResult?.reference_pdf} />
        </div>

        {/* Right: Leaderboard (Col-span 4) */}
        <div className="lg:col-span-4 flex">
          <Leaderboard quizId={quizId} />
        </div>
      </div>
    </div>
  );
};

export default QuizResultSummary;
