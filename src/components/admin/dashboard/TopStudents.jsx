import { Link } from "react-router-dom";

export default function TopStudents() {
  const students = [
    { rank: 1, name: "Pappu Roy", score: "92%", completed: 18 },
    { rank: 2, name: "Pappu Roy", score: "92%", completed: 15 },
    { rank: 3, name: "Pappu Roy", score: "92%", completed: 14 },
    { rank: 4, name: "Pappu Roy", score: "92%", completed: 12 },
    { rank: 5, name: "Pappu Roy", score: "92%", completed: 11 },
    { rank: 6, name: "Pappu Roy", score: "92%", completed: 8 },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-sm flex flex-col gap-5 text-left w-full h-full roboto">
      {/* Header Row */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-[#082042] roboto">
          Top Students
        </h3>
        <Link
          to="/admin/student"
          className="border border-slate-300 hover:border-slate-400 text-slate-700 bg-white hover:bg-slate-50 transition-colors px-4 py-2 rounded-[6px] text-sm font-semibold shadow-sm"
        >
          View All students
        </Link>
      </div>

      {/* Table Section */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-sm border-separate border-spacing-0">
          <thead>
            <tr className="text-slate-500 font-semibold lato text-base">
              <th className="py-3 px-4 text-center font-semibold bg-slate-50 border-y border-l border-slate-100 rounded-l-xl w-16">#</th>
              <th className="py-3 px-6 text-left font-semibold bg-slate-50 border-y border-slate-100">Student Name</th>
              <th className="py-3 px-4 text-center font-semibold bg-slate-50 border-y border-slate-100">Average Score</th>
              <th className="py-3 px-6 text-center font-semibold bg-slate-50 border-y border-r border-slate-100 rounded-r-xl">Quizzes Completed</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {students.map((student) => (
              <tr key={student.rank} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-3.5 px-4 border-b border-slate-100 text-center font-bold text-slate-500 roboto">
                  {student.rank}
                </td>
                <td className="py-3.5 px-6 border-b border-slate-100 text-left font-semibold text-slate-900 roboto">
                  {student.name}
                </td>
                <td className="py-3.5 px-4 border-b border-slate-100 text-center font-bold text-[#66A331] roboto">
                  {student.score}
                </td>
                <td className="py-3.5 px-6 border-b border-slate-100 text-center font-medium text-slate-600 lato">
                  {student.completed}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
