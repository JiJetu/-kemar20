import { Link } from "react-router-dom";

export default function TopStudents({ students = [] }) {
  const studentsList = Array.isArray(students)
    ? students.map((s, idx) => ({
        rank: idx + 1,
        name: s.student_name || "Student",
        score: s.average_score !== undefined ? `${s.average_score}%` : "0%",
        completed: s.quizzes_completed || 0,
      }))
    : [];

  return (
    <div className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-sm flex flex-col gap-5 text-left w-full h-full roboto">
      {/* Header Row */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-[#082042] roboto">
          Top Students
        </h3>
        <Link
          to="/admin/student"
          className="border border-[#0A2648] hover:bg-[#0A2648]/5 text-[#0A2648] bg-white transition-colors px-3 py-1.5 rounded-[6px] text-xs font-bold"
        >
          View All students
        </Link>
      </div>

      {/* Table Section */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-sm border-separate border-spacing-0">
          <thead>
            <tr className="text-slate-500 font-semibold lato text-base">
              <th className="py-3 px-4 text-center font-semibold bg-[#E5ECF9]/50 border-y border-l border-[#E5ECF9]/10 rounded-l-xl w-16">#</th>
              <th className="py-3 px-6 text-left font-semibold bg-[#E5ECF9]/50 border-y border-[#E5ECF9]/10">Student Name</th>
              <th className="py-3 px-4 text-center font-semibold bg-[#E5ECF9]/50 border-y border-[#E5ECF9]/10">Average Score</th>
              <th className="py-3 px-6 text-center font-semibold bg-[#E5ECF9]/50 border-y border-r border-[#E5ECF9]/10 rounded-r-xl">Quizzes Completed</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {studentsList.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-8 text-center text-slate-400 font-semibold lato">
                  No top student records available.
                </td>
              </tr>
            ) : (
              studentsList.map((student) => (
                <tr key={student.rank} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 px-4 border-b border-slate-100 text-center font-bold text-[#0A2648] roboto">
                    {student.rank}
                  </td>
                  <td className="py-3.5 px-6 border-b border-slate-100 text-left font-semibold text-[#0A2648] roboto">
                    {student.name}
                  </td>
                  <td className="py-3.5 px-4 border-b border-slate-100 text-center font-bold text-[#66A331] roboto">
                    {student.score}
                  </td>
                  <td className="py-3.5 px-6 border-b border-slate-100 text-center font-semibold text-slate-700 lato">
                    {student.completed}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
