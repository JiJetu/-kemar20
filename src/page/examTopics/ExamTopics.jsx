import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Calculator, 
  Search, 
  Clock, 
  ArrowRight, 
  GraduationCap,
  Sparkles
} from "lucide-react";

// Simplified Exam Topics data
const mockTopics = [
  {
    id: 1,
    title: "Math Practice Session",
    description: "Practice standard algebraic equations, quadratic root calculations, and equation balancing.",
    questionsCount: 10,
    duration: 20
  },
  {
    id: 2,
    title: "Algebra Challenge",
    description: "Deep dive into linear equations, expressions, factoring, and function graphs.",
    questionsCount: 15,
    duration: 30
  },
  {
    id: 3,
    title: "Geometry Practice",
    description: "Master areas, volumes, coordinate geometry, and triangle similarity theorems.",
    questionsCount: 12,
    duration: 25
  },
  {
    id: 4,
    title: "Trigonometry Basics",
    description: "Calculate sine, cosine, tangent values, and prove simple trigonometric identities.",
    questionsCount: 8,
    duration: 15
  }
];

const ExamTopics = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filtering Logic (Search only)
  const filteredTopics = mockTopics.filter((topic) =>
    topic.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    topic.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col gap-6 text-slate-100 pb-12 select-none px-2">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#001131] border border-[#192B4C] rounded-[20px] p-6 shadow-lg relative overflow-hidden">
        {/* Glow backdrop decorative effect */}
        <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-primary/10 rounded-full blur-[60px] pointer-events-none" />
        
        <div className="flex items-start gap-4">
          <div className="bg-primary/10 border border-primary/35 text-primary p-3 rounded-xl hidden sm:flex items-center justify-center shrink-0">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div className="flex flex-col text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 roboto">
              Exam Practice Topics <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" />
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1 lato">
              Select a topic below to start your practice session and challenge the leaderboard.
            </p>
          </div>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="bg-[#001131] border border-[#192B4C] rounded-[20px] p-4 shadow-lg flex items-center relative">
        <span className="absolute left-7 text-slate-400">
          <Search className="w-5 h-5" />
        </span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search exam topics..."
          className="w-full bg-[#031435] border border-[#192B4C] focus:border-primary rounded-xl pl-12 pr-4 py-3 text-sm text-white focus:outline-none transition-all placeholder-slate-500 font-medium lato"
        />
      </div>

      {/* Grid List of Topics */}
      {filteredTopics.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {filteredTopics.map((topic) => (
            <div
              key={topic.id}
              className="bg-[#001131] border border-[#192B4C] rounded-[20px] p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg flex flex-col justify-between gap-5 relative overflow-hidden group"
            >
              {/* Decorative background circle */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-lg pointer-events-none" />

              <div className="flex flex-col gap-2 text-left">
                {/* Title */}
                <h4 className="text-lg font-bold text-white leading-snug group-hover:text-primary transition-colors flex items-center gap-2.5 roboto">
                  <Calculator className="w-5 h-5 text-primary shrink-0" />
                  {topic.title}
                </h4>
                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed lato">
                  {topic.description}
                </p>
              </div>

              {/* Bottom stats and action button */}
              <div className="flex items-center justify-between border-t border-[#192B4C] pt-4 mt-auto">
                {/* Stats */}
                <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 lato">
                  <span className="flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-primary" /> {topic.questionsCount} Qs
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-primary" /> {topic.duration} Mins
                  </span>
                </div>

                {/* Start Practice button */}
                <Link
                  to={`/exam-details/${topic.id}`}
                  className="bg-primary hover:bg-[#4d8229] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 lato"
                >
                  Start Practice <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[#001131] border border-[#192B4C] rounded-[20px] p-12 text-center shadow-lg w-full">
          <GraduationCap className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h4 className="text-lg font-bold text-white roboto">No Topics Found</h4>
          <p className="text-sm text-slate-400 mt-1 max-w-md mx-auto lato">
            We couldn't find any exam topics matching your current search.
          </p>
        </div>
      )}

    </div>
  );
};

export default ExamTopics;
