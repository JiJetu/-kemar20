import { useState } from "react";
import MathPracticeSession from "../../components/home/MathPracticeSession";
import SolutionPdf from "../../components/home/SolutionPdf";
import Leaderboard from "../../components/home/Leaderboard";

// Question list data
const mockQuestions = [
  {
    id: 1,
    title: "Math Practice Session",
    text: "What Is The Sindnewdi ie Games And The Realot Of The Cooprontation?",
    equation: "x = x^2 / 2^2 + 1/2 + 14",
    options: [
      { key: "A", val: "A. X = -4" },
      { key: "B", val: "B. X = -3" },
      { key: "C", val: "C. X = 3", correct: true },
      { key: "D", val: "D. X = -3" }
    ],
    solution: [
      "x = x^2 / 2^2 + 1/2 + 14",
      "x = x^2 / 4 + 1/2 + 14",
      "4x = x^2 + 2 + 56",
      "x^2 - 4x + 58 = 0",
      "x = 3"
    ],
    correctAnswer: "X = 3"
  },
  {
    id: 2,
    title: "Algebra Challenge",
    text: "Find the positive root of the quadratic equation y² - 5y + 6 = 0:",
    equation: "y^2 - 5y + 6 = 0",
    options: [
      { key: "A", val: "A. y = 1" },
      { key: "B", val: "B. y = 2" },
      { key: "C", val: "C. y = 3", correct: true },
      { key: "D", val: "D. y = 5" }
    ],
    solution: [
      "y^2 - 5y + 6 = 0",
      "(y - 2)(y - 3) = 0",
      "y = 2 or y = 3",
      "Choosing positive value y = 3"
    ],
    correctAnswer: "y = 3"
  }
];

function ExamDetails() {
  const [selectedOption, setSelectedOption] = useState("C"); // Checked option C by default
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [showSolutionPanel, setShowSolutionPanel] = useState(true);

  const currentQuestionData = mockQuestions[currentQIndex];

  return (
    <div className="w-full flex flex-col gap-6 text-slate-100 font-sans pb-10">
      
      {/* Top Main Section: Question & Leaderboard side-by-side */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Column (Question Area) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <MathPracticeSession
            currentQuestionData={currentQuestionData}
            currentQIndex={currentQIndex}
            totalQuestions={mockQuestions.length}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            showSolutionPanel={showSolutionPanel}
            setShowSolutionPanel={setShowSolutionPanel}
            onPrev={() => {
              setCurrentQIndex((p) => p - 1);
              setSelectedOption("C");
            }}
            onNext={() => {
              setCurrentQIndex((p) => p + 1);
              setSelectedOption("C");
            }}
          />

          {/* Solution and PDF Viewer panels */}
          {showSolutionPanel && (
            <SolutionPdf currentQuestionData={currentQuestionData} />
          )}
        </div>

        {/* Right Column (Leaderboard Card) */}
        <div className="lg:col-span-1">
          <Leaderboard />
        </div>

      </div>

    </div>
  );
}

export default ExamDetails;
