import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, AlertTriangle } from "lucide-react";
import { parseMathEquation } from "../../../../lib/utils/math";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import ExamTimerMetrics from "../../../../components/studentDashboard/examDetails/ExamTimerMetrics";
import QuestionGridPanel from "../../../../components/studentDashboard/examDetails/QuestionGridPanel";
import QuizResultSummary from "../../../../components/studentDashboard/examDetails/QuizResultSummary";

// Question list data (20 questions to populate the grid)
const mockQuestions = [
  {
    id: 1,
    title: "Math Practiceseeions",
    text: "What Is The Sindnewdi ie Games And The Realot Of The Cooprontation?",
    equation: "x = x^2 / 2^2 + 1/2 + 14",
    options: [
      { key: "A", val: "A. X = -4" },
      { key: "B", val: "A. X = -4" },
      { key: "C", val: "C. X = 3", correct: true },
      { key: "D", val: "A. X = -4" }
    ]
  },
  {
    id: 2,
    title: "Math Practiceseeions",
    text: "Solve for the variable y in the linear relationship:",
    equation: "y = 2x + 10",
    options: [
      { key: "A", val: "A. y = 10" },
      { key: "B", val: "B. y = 12" },
      { key: "C", val: "C. y = 14", correct: true },
      { key: "D", val: "D. y = 16" }
    ]
  },
  {
    id: 3,
    title: "Math Practiceseeions",
    text: "Find the value of z in the following algebraic relation:",
    equation: "z = 3^2 + 4^2",
    options: [
      { key: "A", val: "A. z = 25", correct: true },
      { key: "B", val: "B. z = 12" },
      { key: "C", val: "C. z = 7" },
      { key: "D", val: "D. z = 9" }
    ]
  },
  {
    id: 4,
    title: "Math Practiceseeions",
    text: "Solve the fraction equation for x:",
    equation: "x = 1/2 + 3/4",
    options: [
      { key: "A", val: "A. x = 5/4", correct: true },
      { key: "B", val: "B. x = 1/4" },
      { key: "C", val: "C. x = 1" },
      { key: "D", val: "D. x = 3/4" }
    ]
  },
  {
    id: 5,
    title: "Math Practiceseeions",
    text: "Determine the solution of the quadratic equation:",
    equation: "x = x^2 - 6",
    options: [
      { key: "A", val: "A. x = 2" },
      { key: "B", val: "B. x = 3", correct: true },
      { key: "C", val: "C. x = -2" },
      { key: "D", val: "D. x = 4" }
    ]
  },
  {
    id: 6,
    title: "Math Practiceseeions",
    text: "What Is The Sindnewdi ie Games And The Realot Of The Cooprontation?",
    equation: "x = x^2 / 2^2 + 1/2 + 14",
    options: [
      { key: "A", val: "A. X = -4" },
      { key: "B", val: "A. X = -4" },
      { key: "C", val: "C. X = 3", correct: true },
      { key: "D", val: "A. X = -4" }
    ]
  },
  {
    id: 7,
    title: "Math Practiceseeions",
    text: "Find the limit of the expression as n approaches infinity:",
    equation: "L = 1 / n + 5",
    options: [
      { key: "A", val: "A. L = 5", correct: true },
      { key: "B", val: "B. L = 0" },
      { key: "C", val: "C. L = 1" },
      { key: "D", val: "D. L = 6" }
    ]
  },
  {
    id: 8,
    title: "Math Practiceseeions",
    text: "Solve for x in the trigonometric ratio:",
    equation: "x = sin(pi/2) + 2",
    options: [
      { key: "A", val: "A. x = 3", correct: true },
      { key: "B", val: "B. x = 2" },
      { key: "C", val: "C. x = 1" },
      { key: "D", val: "D. x = 0" }
    ]
  },
  {
    id: 9,
    title: "Math Practiceseeions",
    text: "Calculate the area of a square with side length s:",
    equation: "A = s^2",
    options: [
      { key: "A", val: "A. A = 16", correct: true },
      { key: "B", val: "B. A = 8" },
      { key: "C", val: "C. A = 12" },
      { key: "D", val: "D. A = 4" }
    ]
  },
  {
    id: 10,
    title: "Math Practiceseeions",
    text: "Find the derivative of the function f(x):",
    equation: "df = 2x + 3",
    options: [
      { key: "A", val: "A. df = 2", correct: true },
      { key: "B", val: "B. df = 3" },
      { key: "C", val: "C. df = 5" },
      { key: "D", val: "D. df = 1" }
    ]
  },
  {
    id: 11,
    title: "Math Practiceseeions",
    text: "Calculate the slope of the line passing through origin:",
    equation: "m = y / x",
    options: [
      { key: "A", val: "A. m = 1", correct: true },
      { key: "B", val: "B. m = 2" },
      { key: "C", val: "C. m = 0" },
      { key: "D", val: "D. m = 4" }
    ]
  },
  {
    id: 12,
    title: "Math Practiceseeions",
    text: "Find the positive square root of the number:",
    equation: "x = 144 / 12",
    options: [
      { key: "A", val: "A. x = 12", correct: true },
      { key: "B", val: "B. x = 6" },
      { key: "C", val: "C. x = 144" },
      { key: "D", val: "D. x = 24" }
    ]
  },
  {
    id: 13,
    title: "Math Practiceseeions",
    text: "Calculate the simple interest for principal P:",
    equation: "I = P * r * t",
    options: [
      { key: "A", val: "A. I = 100", correct: true },
      { key: "B", val: "B. I = 50" },
      { key: "C", val: "C. I = 200" },
      { key: "D", val: "D. I = 150" }
    ]
  },
  {
    id: 14,
    title: "Math Practiceseeions",
    text: "Evaluate the sum of arithmetic progression:",
    equation: "S = n/2 * (a + l)",
    options: [
      { key: "A", val: "A. S = 50" },
      { key: "B", val: "B. S = 100", correct: true },
      { key: "C", val: "C. S = 150" },
      { key: "D", val: "D. S = 200" }
    ]
  },
  {
    id: 15,
    title: "Math Practiceseeions",
    text: "Find the hypotenuse of a right triangle with legs a and b:",
    equation: "c^2 = a^2 + b^2",
    options: [
      { key: "A", val: "A. c = 5", correct: true },
      { key: "B", val: "B. c = 7" },
      { key: "C", val: "C. c = 6" },
      { key: "D", val: "D. c = 8" }
    ]
  },
  {
    id: 16,
    title: "Math Practiceseeions",
    text: "Solve the basic exponential equation:",
    equation: "y = 2^3 + 1",
    options: [
      { key: "A", val: "A. y = 9", correct: true },
      { key: "B", val: "B. y = 8" },
      { key: "C", val: "C. y = 7" },
      { key: "D", val: "D. y = 10" }
    ]
  },
  {
    id: 17,
    title: "Math Practiceseeions",
    text: "Find the mean of the numbers 4, 8, and 12:",
    equation: "mu = 24 / 3",
    options: [
      { key: "A", val: "A. mu = 8", correct: true },
      { key: "B", val: "B. mu = 6" },
      { key: "C", val: "C. mu = 7" },
      { key: "D", val: "D. mu = 9" }
    ]
  },
  {
    id: 18,
    title: "Math Practiceseeions",
    text: "Find the probability of a coin toss landing heads:",
    equation: "P = 1 / 2",
    options: [
      { key: "A", val: "A. P = 0.5", correct: true },
      { key: "B", val: "B. P = 1.0" },
      { key: "C", val: "C. P = 0.25" },
      { key: "D", val: "D. P = 0.0" }
    ]
  },
  {
    id: 19,
    title: "Math Practiceseeions",
    text: "Solve for the radius of a circle given area A:",
    equation: "r^2 = A / pi",
    options: [
      { key: "A", val: "A. r = 3" },
      { key: "B", val: "B. r = 4", correct: true },
      { key: "C", val: "C. r = 5" },
      { key: "D", val: "D. r = 2" }
    ]
  },
  {
    id: 20,
    title: "Math Practiceseeions",
    text: "Calculate the final velocity v in kinematics:",
    equation: "v = u + a*t",
    options: [
      { key: "A", val: "A. v = 15" },
      { key: "B", val: "B. v = 20", correct: true },
      { key: "C", val: "C. v = 25" },
      { key: "D", val: "D. v = 30" }
    ]
  }
];



function ExamDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const totalCount = mockQuestions.length;

  // Track submission state
  const [isExamSubmitted, setIsExamSubmitted] = useState(() => {
    return localStorage.getItem("exam_completed_" + id) === "true";
  });

  // Initialize state: starting on Question 6 (index 5)
  const [currentQIndex, setCurrentQIndex] = useState(5);
  
  // Set up selected answers array. Populate first 5 questions with mock answers to match mockup index (5 answered, 15 remaining)
  const [answers, setAnswers] = useState(() => {
    const initial = Array(totalCount).fill(null);
    initial[0] = "A";
    initial[1] = "B";
    initial[2] = "C";
    initial[3] = "D";
    initial[4] = "C";
    return initial;
  });

  // Track visited questions to identify skipped ones (initially visited the first 6 questions)
  const [visitedQuestions, setVisitedQuestions] = useState([0, 1, 2, 3, 4, 5]);

  const [timeLeft, setTimeLeft] = useState(24 * 60 + 37); // Start countdown at 24:37
  const [isExamStarted, setIsExamStarted] = useState(false);
  const [showExitModal, setShowExitModal] = useState(true);

  // Transition handler that updates both current index and visited state during user events
  const handleQuestionChange = (newIndex) => {
    setCurrentQIndex(newIndex);
    if (!visitedQuestions.includes(newIndex)) {
      setVisitedQuestions((prev) => [...prev, newIndex]);
    }
  };

  // Main Submit exam action
  const handleSubmitExam = () => {
    setIsExamStarted(false);
    
    // Calculate correct / incorrect answers count
    let correctCount = 0;
    mockQuestions.forEach((q, idx) => {
      const selectedKey = answers[idx];
      const correctKey = q.options.find((o) => o.correct)?.key;
      if (selectedKey === correctKey) {
        correctCount++;
      }
    });
    const incorrectCount = mockQuestions.length - correctCount;
    const accuracy = Math.round((correctCount / mockQuestions.length) * 100);

    // Calculate elapsed time taken
    const totalDuration = 30 * 60; // 30 minutes total time
    const elapsedSeconds = Math.max(0, totalDuration - timeLeft);
    const m = Math.floor(elapsedSeconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (elapsedSeconds % 60).toString().padStart(2, "0");
    const timeTaken = `${m}:${s}`;

    const resultPayload = {
      correctCount,
      incorrectCount,
      accuracy,
      timeTaken,
      rank: 2,
      totalRank: 50,
    };

    localStorage.setItem("exam_result_" + id, JSON.stringify(resultPayload));
    localStorage.setItem("exam_completed_" + id, "true");

    toast.success("Exam results submitted successfully!");
    setIsExamSubmitted(true);
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

  // Page visibility API handler (user switches tab or minimizes window)
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
  }, [isExamStarted, answers]);

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
    navigate("/dashboard"); // Exit silently back to dashboard, no toast
  };

  const currentQuestionData = mockQuestions[currentQIndex];
  const attemptedCount = answers.filter((a) => a !== null).length;
  const remainingCount = totalCount - attemptedCount;

  if (isExamSubmitted) {
    // Calculate or retrieve results
    let results = {
      correctCount: 18,
      incorrectCount: 2,
      accuracy: 90,
      timeTaken: "22:45",
      rank: 2,
      totalRank: 50,
    };

    const savedResult = localStorage.getItem("exam_result_" + id);
    if (savedResult) {
      try {
        results = JSON.parse(savedResult);
      } catch (e) {
        console.error(e);
      }
    }

    return (
      <QuizResultSummary
        results={results}
        totalCount={totalCount}
        mockQuestions={mockQuestions}
        answers={answers}
        onBack={() => navigate("/dashboard")}
      />
    );
  }

  return (
    <div className="w-full flex flex-col pb-10 select-none text-slate-800 font-sans">
      
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
                  className="bg-[#082042] h-full rounded-full transition-all duration-300"
                  style={{ width: `${((currentQIndex + 1) / totalCount) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Text with circle number */}
            <div className="flex items-start gap-4 text-left mt-6">
              <div className="w-10 h-10 rounded-full bg-[#082042] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm mt-0.5">
                {currentQuestionData.id}.
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
                        ? "bg-[#E1EBCF] border-[#66A331] text-[#66A331] font-bold"
                        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all shrink-0 ${
                          isSelected
                            ? "bg-[#66A331] text-white"
                            : "bg-[#F0F5FD] text-[#082042]"
                        }`}
                      >
                        {option.key}
                      </span>
                      <span className="text-sm md:text-base tracking-wide font-semibold roboto">
                        {option.val}
                      </span>
                    </div>
                    {isSelected && (
                      <span className="text-[#66A331] font-extrabold text-base pr-1">✓</span>
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
              className="bg-[#F0F4FA] hover:bg-slate-100 text-[#082042] font-bold px-6 py-2.5 rounded-lg flex items-center gap-1.5 transition-all text-sm disabled:opacity-40 disabled:pointer-events-none select-none cursor-pointer"
            >
              <ChevronLeft size={16} />
              Previous
            </button>

            {currentQIndex === totalCount - 1 ? (
              <button
                type="button"
                onClick={handleSubmitExam}
                className="bg-[#66A331] hover:bg-[#5D9E32] text-white font-bold px-8 py-2.5 rounded-lg flex items-center transition-all text-sm select-none cursor-pointer shadow-md active:scale-95"
              >
                Submit
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleQuestionChange(currentQIndex + 1)}
                className="bg-[#082042] hover:bg-[#1C398E] text-white font-bold px-8 py-2.5 rounded-lg flex items-center gap-1.5 transition-all text-sm select-none cursor-pointer"
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
            mockQuestions={mockQuestions}
            currentQIndex={currentQIndex}
            answers={answers}
            visitedQuestions={visitedQuestions}
            setCurrentQIndex={handleQuestionChange}
          />
        </div>

      </div>

      {/* Warning/Start Modal */}
      {showExitModal && !isExamSubmitted && (
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

export default ExamDetails;
