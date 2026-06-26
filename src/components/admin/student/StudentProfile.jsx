import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Eye } from "lucide-react";
import { toast } from "sonner";
import { ICONS } from "../../../assets/index";

// Mock student data generator (must stay identical to StudentManagement.jsx)
const generateMockStudents = () => {
  const baseStudents = [
    { name: "Pappu roy", email: "pappuroy6393@gmai.com", quizzesTaken: 20, score: "92%", status: "Active", joinDate: "May 20, 2025", subject: "Artificial Intelligence" },
    { name: "Pappu roy", email: "pappuroy6393@gmai.com", quizzesTaken: 10, score: "89%", status: "Inactive", joinDate: "May 20, 2025", subject: "Programming" },
    { name: "Pappu roy", email: "pappuroy6393@gmai.com", quizzesTaken: 5, score: "85%", status: "Active", joinDate: "May 20, 2025", subject: "Artificial Intelligence" },
    { name: "Pappu roy", email: "pappuroy6393@gmai.com", quizzesTaken: 2, score: "82%", status: "Active", joinDate: "May 20, 2025", subject: "Data Science" },
    { name: "Pappu roy", email: "pappuroy6393@gmai.com", quizzesTaken: 5, score: "78%", status: "Active", joinDate: "May 20, 2025", subject: "Programming" },
    { name: "Pappu roy", email: "pappuroy6393@gmai.com", quizzesTaken: 4, score: "75%", status: "Active", joinDate: "May 20, 2025", subject: "Artificial Intelligence" },
    { name: "Pappu roy", email: "pappuroy6393@gmai.com", quizzesTaken: 2, score: "73%", status: "Active", joinDate: "May 20, 2025", subject: "Data Science" },
    { name: "Pappu roy", email: "pappuroy6393@gmai.com", quizzesTaken: 25, score: "70%", status: "Inactive", joinDate: "May 20, 2025", subject: "Programming" },
    { name: "Pappu roy", email: "pappuroy6393@gmai.com", quizzesTaken: 5, score: "70%", status: "Active", joinDate: "May 20, 2025", subject: "Artificial Intelligence" },
    { name: "Pappu roy", email: "pappuroy6393@gmai.com", quizzesTaken: 4, score: "70%", status: "Inactive", joinDate: "May 20, 2025", subject: "Programming" },
    { name: "Pappu roy", email: "pappuroy6393@gmai.com", quizzesTaken: 7, score: "70%", status: "Active", joinDate: "May 20, 2025", subject: "Data Science" },
    { name: "Pappu roy", email: "pappuroy6393@gmai.com", quizzesTaken: 2, score: "40%", status: "Inactive", joinDate: "May 20, 2025", subject: "Artificial Intelligence" },
  ];

  const list = [];
  for (let i = 0; i < 156; i++) {
    const base = baseStudents[i % baseStudents.length];
    list.push({
      id: i + 1,
      rank: i + 1,
      name: i < 12 ? base.name : `${base.name} #${i + 1}`,
      email: i < 12 ? base.email : `pappuroy${i + 1}@gmail.com`,
      quizzesTaken: base.quizzesTaken,
      score: base.score,
      status: base.status,
      joinDate: base.joinDate,
      subject: base.subject,
    });
  }
  return list;
};

// Quiz attempts list matching the mockup image
const quizAttempts = [
  { id: 1, name: "Math Dinam Exam", subject: "Math", score: "10/20", rank: { val: 1, label: "1st" }, date: "May 20, 2025" },
  { id: 2, name: "Math Dinam Exam", subject: "Math", score: "10/20", rank: { val: 2, label: "2nd" }, date: "May 20, 2025" },
  { id: 3, name: "Math Dinam Exam", subject: "Math", score: "10/20", rank: { val: 6, label: "6th" }, date: "May 20, 2025" },
  { id: 4, name: "Math Dinam Exam", subject: "Math", score: "10/20", rank: { val: 6, label: "6th" }, date: "May 20, 2025" },
  { id: 5, name: "Math Dinam Exam", subject: "Math", score: "10/20", rank: { val: 3, label: "3rd" }, date: "May 20, 2025" },
  { id: 6, name: "Math Dinam Exam", subject: "Math", score: "10/20", rank: { val: 6, label: "6th" }, date: "May 20, 2025" },
  { id: 7, name: "Math Dinam Exam", subject: "Math", score: "10/20", rank: { val: 2, label: "2nd" }, date: "May 20, 2025" },
  { id: 8, name: "Math Dinam Exam", subject: "Math", score: "10/20", rank: { val: 2, label: "2nd" }, date: "May 20, 2025" },
  { id: 9, name: "Math Dinam Exam", subject: "Math", score: "10/20", rank: { val: 6, label: "6th" }, date: "May 20, 2025" },
  { id: 10, name: "Math Dinam Exam", subject: "Math", score: "10/20", rank: { val: 2, label: "2nd" }, date: "May 20, 2025" },
  { id: 11, name: "Math Dinam Exam", subject: "Math", score: "10/20", rank: { val: 2, label: "2nd" }, date: "May 20, 2025" },
  { id: 12, name: "Math Dinam Exam", subject: "Math", score: "10/20", rank: { val: 2, label: "2nd" }, date: "May 20, 2025" },
];

export default function StudentProfile() {
  const { id } = useParams();
  const students = generateMockStudents();
  const student = students.find((s) => s.id === parseInt(id)) || students[0];

  // Format student details dynamically to match standard display conventions
  const displayName = student.name
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const displayEmail = student.email
    .replace("gmai.com", "gmail.com")
    .replace("pappuroy", "pappyroy");

  // Dynamic St ID display based on database ID to match mockup St 52142 (for student #1)
  const displayStudentId = `St 52${141 + student.id}`;

  const handleViewQuiz = (attempt) => {
    toast.info(`Viewing details for: ${attempt.name}`);
  };

  return (
    <div className="w-full flex flex-col gap-6 text-left">
      {/* Back navigation */}
      <div className="flex items-center">
        <Link
          to="/admin/student"
          className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-[#66A331] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Students</span>
        </Link>
      </div>

      {/* Profile Header Summary Card */}
      <div className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-sm flex flex-col md:flex-row items-center md:items-stretch gap-6 md:gap-0">
        
        {/* Left Section: Avatar, Name, and Metadata */}
        <div className="flex items-center gap-6 flex-1">
          <img
            src={"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80"}
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200";
            }}
            alt={displayName}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-slate-100 object-cover"
          />
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-[#082042] roboto mb-4 leading-none">
              {displayName}
            </h2>
            <div className="grid grid-cols-[100px_1fr] gap-y-2.5 text-sm text-slate-800">
              <span className="text-slate-400 font-medium lato">Student Id</span>
              <span className="font-semibold text-slate-700 roboto">{displayStudentId}</span>

              <span className="text-slate-400 font-medium lato">Email</span>
              <span className="font-semibold text-slate-700 roboto">{displayEmail}</span>

              <span className="text-slate-400 font-medium lato">Status</span>
              <div className="lato">
                <span className={`inline-block px-3 py-0.5 text-xs font-bold rounded-full border ${
                  student.status === "Active"
                    ? "text-[#66A331] bg-[#EBF5E4] border-[#66A331]/20"
                    : "text-[#E65100] bg-[#FFF0E6] border-[#E65100]/20"
                }`}>
                  {student.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="hidden md:block w-[1px] bg-slate-200 self-stretch mx-8" />

        {/* Right Section: Score Stats Summary */}
        <div className="flex flex-col justify-center md:pl-8 min-w-[200px]">
          <div className="grid grid-cols-[115px_1fr] gap-y-3 text-sm text-slate-800">
            <span className="text-slate-400 font-medium lato">Total Quizzes</span>
            <span className="font-semibold text-slate-700 roboto">{student.quizzesTaken}</span>

            <span className="text-slate-400 font-medium lato">Average Score</span>
            <span className="font-semibold text-slate-700 roboto">{student.score}</span>
          </div>
        </div>

      </div>

      {/* Quiz Attempts Table Card */}
      <div className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-sm w-full overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm border-separate border-spacing-0">
            <thead>
              <tr className="text-slate-500 font-semibold lato text-sm">
                <th className="py-3 px-6 text-left font-semibold bg-[#EAEFF8] rounded-l-xl text-slate-600">
                  Quiz Name
                </th>
                <th className="py-3 px-4 text-center font-semibold bg-[#EAEFF8] text-slate-600">
                  Score
                </th>
                <th className="py-3 px-4 text-center font-semibold bg-[#EAEFF8] text-slate-600">
                  Rank
                </th>
                <th className="py-3 px-4 text-center font-semibold bg-[#EAEFF8] text-slate-600">
                  Date
                </th>
                <th className="py-3 px-6 text-center font-semibold bg-[#EAEFF8] rounded-r-xl text-slate-600">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {quizAttempts.map((attempt) => (
                <tr key={attempt.id} className="hover:bg-slate-50/50 transition-colors">
                  {/* Quiz Name */}
                  <td className="py-4 px-6 border-b border-slate-100 text-left font-semibold text-slate-800 roboto">
                    {attempt.name}
                  </td>

                  {/* Score */}
                  <td className="py-4 px-4 border-b border-slate-100 text-center font-semibold roboto">
                    {attempt.score}
                  </td>

                  {/* Rank */}
                  <td className="py-4 px-4 border-b border-slate-100 text-center font-medium text-slate-600 roboto">
                    {attempt.rank.val === 1 && (
                      <div className="flex items-center justify-center gap-1.5">
                        <img src={ICONS.crown} alt="Crown" className="w-5 h-5 object-contain" />
                        <span className="font-semibold text-amber-500 leading-none">{attempt.rank.label}</span>
                      </div>
                    )}
                    {attempt.rank.val === 2 && (
                      <div className="flex items-center justify-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-[#1A365D] text-white flex items-center justify-center text-xs font-bold roboto">
                          2
                        </span>
                        <span className="font-semibold text-slate-700 leading-none">{attempt.rank.label}</span>
                      </div>
                    )}
                    {attempt.rank.val === 3 && (
                      <div className="flex items-center justify-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-[#7C2D12] text-white flex items-center justify-center text-xs font-bold roboto">
                          3
                        </span>
                        <span className="font-semibold text-slate-700 leading-none">{attempt.rank.label}</span>
                      </div>
                    )}
                    {attempt.rank.val > 3 && (
                      <span className="text-slate-500 font-medium leading-none">{attempt.rank.label}</span>
                    )}
                  </td>

                  {/* Date */}
                  <td className="py-4 px-4 border-b border-slate-100 text-center text-slate-500 lato font-medium">
                    {attempt.date}
                  </td>

                  {/* Action */}
                  <td className="py-4 px-6 border-b border-slate-100 text-center">
                    <div className="flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => handleViewQuiz(attempt)}
                        className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors shadow-sm"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
