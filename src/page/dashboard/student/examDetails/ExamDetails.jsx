import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, AlertTriangle } from "lucide-react";
import { parseMathEquation } from "../../../../lib/utils/math";
import { toast } from "sonner";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import ExamTimerMetrics from "../../../../components/studentDashboard/examDetails/ExamTimerMetrics";
import QuestionGridPanel from "../../../../components/studentDashboard/examDetails/QuestionGridPanel";
import QuizResultSummary from "../../../../components/studentDashboard/examDetails/QuizResultSummary";
import FreeTrialAlertBar from "../examTopics/FreeTrialAlertBar";
import LoadingSpinner from "../../../../components/shared/LoadingSpinner";
import {
  useGetQuizDetailsQuery,
  useSubmitQuizMutation,
  useGetQuizResultQuery,
} from "../../../../redex/features/quiz/quiz.api";
import { useGetSubscriptionStatusQuery } from "../../../../redex/features/subscription/subscription.api";

// Main ExamDetails container (controls loading router)
export default function ExamDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const { data: quizDetails, isLoading: isQuizLoading } = useGetQuizDetailsQuery(id);
  const { data: subStatus } = useGetSubscriptionStatusQuery();
  const [submitQuiz, { isLoading: isSubmitting }] = useSubmitQuizMutation();
  const { isSuccess: isResultSuccess } = useGetQuizResultQuery(id, { skip: !id });

  const isSubscribed = subStatus?.is_premium === true || subStatus?.is_active === true || subStatus?.plan === "premium";

  // Track submission state via local state (for active session submits)
  const [isExamSubmitted, setIsExamSubmitted] = useState(false);

  const hasAttempted = location.state?.isAttempted || quizDetails?.is_attempted || isResultSuccess || isExamSubmitted;

  if (isQuizLoading || isSubmitting) {
    return (
      <LoadingSpinner 
        message={isQuizLoading ? "Loading exam questions..." : "Submitting answers..."} 
        minHeight="min-h-[50vh]"
      />
    );
  }

  // Derive questions array
  const questions = (quizDetails?.questions || []).map((q, qIdx) => {
    const keys = ["A", "B", "C", "D"];
    const options = (q.options || []).map((opt, optIdx) => ({
      key: keys[optIdx] || String(optIdx),
      val: opt,
    }));
    return {
      id: q.id,
      question_no: q.question_no || (qIdx + 1),
      text: q.question_text || "",
      options,
    };
  });

  const totalCount = questions.length;

  if (hasAttempted) {
    return (
      <QuizResultSummary
        results={{
          correctCount: 0,
          incorrectCount: 0,
          accuracy: 0,
          timeTaken: "00:00",
          rank: 1,
          totalRank: 1,
        }}
        totalCount={totalCount}
        mockQuestions={questions}
        answers={[]}
        onBack={() => navigate("/dashboard")}
        quizId={id}
      />
    );
  }

  return (
    <ActiveExamSession
      key={quizDetails.id}
      id={id}
      quizDetails={quizDetails}
      questions={questions}
      isSubscribed={isSubscribed}
      submitQuiz={submitQuiz}
      setIsExamSubmitted={setIsExamSubmitted}
    />
  );
}

// Inner active session component (initializes states cleanly on mount via key-resetting)
function ActiveExamSession({
  id,
  quizDetails,
  questions,
  isSubscribed,
  submitQuiz,
  setIsExamSubmitted,
}) {
  const navigate = useNavigate();
  const totalCount = questions.length;

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState(() => Array(totalCount).fill(null));
  const [visitedQuestions, setVisitedQuestions] = useState([0]);
  const [timeLeft, setTimeLeft] = useState(() => (quizDetails.time_limit || 30) * 60);
  const [isExamStarted, setIsExamStarted] = useState(false);
  const [showExitModal, setShowExitModal] = useState(true);

  // Sync answers with mutable ref to prevent stale closures in event listeners
  const answersRef = useRef(answers);
  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  const handleQuestionChange = (newIndex) => {
    setCurrentQIndex(newIndex);
    if (!visitedQuestions.includes(newIndex)) {
      setVisitedQuestions((prev) => [...prev, newIndex]);
    }
  };

  const handleSubmitExam = async () => {
    setIsExamStarted(false);

    try {
      const formattedAnswers = questions.map((q, idx) => {
        const selectedKey = answersRef.current[idx];
        const keys = ["A", "B", "C", "D"];
        const optionIndex = keys.indexOf(selectedKey);
        
        return {
          question: q.id,
          selected_option: optionIndex !== -1 ? optionIndex : null,
        };
      });

      await submitQuiz({ id, answers: formattedAnswers }).unwrap();
      setIsExamSubmitted(true);
      toast.success("Exam results submitted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit exam. Please try again.");
    }
  };

  // Countdown timer effect
  useEffect(() => {
    if (!isExamStarted) return;
    
    if (timeLeft === 0) {
      toast.error("Time is up! Submitting exam.");
      const submitTimeout = setTimeout(() => {
        handleSubmitExam();
      }, 0);
      return () => clearTimeout(submitTimeout);
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isExamStarted, timeLeft]);

  // Page visibility API handler
  useEffect(() => {
    if (!isExamStarted) return;
    
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        console.log("User changed tab or minimized the page. Auto-submitting exam...");
        handleSubmitExam();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isExamStarted]);

  const handleOptionSelect = (optionKey) => {
    const newAnswers = [...answers];
    newAnswers[currentQIndex] = optionKey;
    setAnswers(newAnswers);
    toast.success(`Selected option ${optionKey}`);
  };

  const handleStayAndContinue = () => {
    if (!isExamStarted) {
      setIsExamStarted(true);
    }
    setShowExitModal(false);
  };

  const handleExitExam = () => {
    setShowExitModal(false);
    navigate("/dashboard");
  };

  const attemptedCount = answers.filter((a) => a !== null).length;
  const remainingCount = totalCount - attemptedCount;
  const currentQuestionData = questions[currentQIndex] || { title: "", text: "", options: [], equation: "" };

  return (
    <div className="w-full flex flex-col pb-10 select-none text-slate-800 font-sans gap-6">
      
      {/* Reusable Free Trial Alert Bar if unsubscribed */}
      {!isSubscribed && (
        <FreeTrialAlertBar 
          title="free trial active" 
          subtitle="You Can Access 2 Free Topic/Quizzes Only" 
        />
      )}

      {/* Back to Topics Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="self-start border border-slate-200 hover:bg-slate-50 text-[#47515E] font-bold text-xs md:text-sm px-4 py-2 rounded-[8px] transition-all flex items-center gap-1.5 shadow-sm bg-white cursor-pointer select-none"
      >
        <span>← Back To Topics</span>
      </button>

      {/* 3-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch w-full">
        
        {/* Left Column: Timer & Metrics (Col-span 3) */}
        <div className="lg:col-span-3 flex">
          <ExamTimerMetrics
            title={currentQuestionData.title}
            timeLeft={timeLeft}
            attemptedCount={attemptedCount}
            totalCount={totalCount}
            remainingCount={remainingCount}
          />
        </div>

        {/* Middle Column: Question Content (Col-span 6) */}
        <div className="lg:col-span-6 bg-white border border-slate-100 rounded-3xl p-6 flex flex-col justify-between shadow-sm min-h-[500px]">
          <div>
            {/* Question title & count header */}
            <div className="flex flex-col gap-2 mb-4 text-left">
              <h3 className="text-[#47515E] text-lg font-semibold roboto">
                Question {currentQIndex + 1} Of {totalCount}
              </h3>
              {/* Progress Bar */}
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#39842B] h-full rounded-full transition-all duration-300"
                  style={{ width: `${((currentQIndex + 1) / totalCount) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Text with circle number */}
            <div className="flex items-start gap-4 text-left mt-6">
              <div className="w-10 h-10 rounded-full bg-[#39842B] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm mt-0.5 animate-in zoom-in duration-300">
                {currentQuestionData.question_no || currentQuestionData.id}.
              </div>
              <h4 className="text-[#082042] text-base sm:text-[17px] font-bold leading-relaxed roboto">
                {currentQuestionData.text}
              </h4>
            </div>

            {/* Scalable Equation */}
            <div className="w-full py-4 flex justify-center">
              {parseMathEquation(currentQuestionData.equation)}
            </div>

            {/* Options List */}
            <div className="flex flex-col gap-4 mt-6">
              {currentQuestionData.options.map((option) => {
                const isSelected = answers[currentQIndex] === option.key;
                return (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => handleOptionSelect(option.key)}
                    className={`w-full flex items-center justify-between py-3.5 px-4 rounded-xl border transition-all text-left ${
                      isSelected
                        ? "bg-[#EBF9E9]/60 border-[#39842B] text-[#39842B] font-bold"
                        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all shrink-0 ${
                          isSelected
                            ? "bg-[#39842B] text-white"
                            : "bg-white border border-slate-200 text-slate-500"
                        }`}
                      >
                        {option.key}
                      </span>
                      <span className="text-sm md:text-base tracking-wide font-semibold roboto">
                        {option.val}
                      </span>
                    </div>
                    {isSelected && (
                      <span className="text-[#39842B] font-extrabold text-base pr-1">✓</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Buttons (Bottom) */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-6 mt-8">
            <button
              type="button"
              disabled={currentQIndex === 0}
              onClick={() => handleQuestionChange(currentQIndex - 1)}
              className="bg-[#F1F3F6] hover:bg-slate-200 text-[#718096] font-bold px-6 py-2.5 rounded-[8px] flex items-center gap-1.5 transition-all text-sm disabled:opacity-40 disabled:pointer-events-none select-none cursor-pointer"
            >
              <ChevronLeft size={16} />
              Previous
            </button>

            {currentQIndex === totalCount - 1 ? (
              <button
                type="button"
                onClick={handleSubmitExam}
                className="bg-[#39842B] hover:bg-[#39842B]/90 text-white font-bold px-8 py-2.5 rounded-[8px] flex items-center transition-all text-sm select-none cursor-pointer shadow-sm active:scale-95"
              >
                Submit
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleQuestionChange(currentQIndex + 1)}
                className="bg-[#39842B] hover:bg-[#39842B]/95 text-white font-bold px-8 py-2.5 rounded-[8px] flex items-center gap-1.5 transition-all text-sm select-none cursor-pointer"
              >
                Next
                <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Question List Jump Grid (Col-span 3) */}
        <div className="lg:col-span-3 flex">
          <QuestionGridPanel
            mockQuestions={questions}
            currentQIndex={currentQIndex}
            answers={answers}
            visitedQuestions={visitedQuestions}
            setCurrentQIndex={handleQuestionChange}
          />
        </div>

      </div>

      {/* Warning/Start Modal */}
      {showExitModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 flex flex-col items-center text-center shadow-lg animate-in fade-in zoom-in duration-200">
            
            {/* Warning Icon */}
            <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-500 mb-4">
              <AlertTriangle className="w-8 h-8 stroke-[1.5px]" />
            </div>

            {/* Title */}
            <h3 className="text-[#082042] text-xl font-bold mb-2 lora">
              Wait Don't Leave Yet
            </h3>

            {/* Description */}
            <p className="text-[#47515E] text-xs md:text-sm font-medium leading-relaxed mb-6 roboto leading-snug">
              Leaving Now Will End Your Current Exam Session. Once You Exit, You Won't Be Able To Resume Or Recover Your Progress.
            </p>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 w-full justify-center">
              <button
                type="button"
                onClick={handleStayAndContinue}
                className="px-4 py-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-[#082042] font-semibold text-xs md:text-sm transition-all flex-1 cursor-pointer"
              >
                Stay & Continue
              </button>
              <button
                type="button"
                onClick={handleExitExam}
                className="px-4 py-2.5 rounded-lg border border-red-200 hover:bg-red-50 text-red-500 font-semibold text-xs md:text-sm transition-all flex-1 cursor-pointer"
              >
                Exit And Exam
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
