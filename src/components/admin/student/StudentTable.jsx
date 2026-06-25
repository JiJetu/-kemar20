import { Eye, Trash2 } from "lucide-react";

export default function StudentTable({ students, onView, onDelete }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm border-separate border-spacing-0">
          <thead>
            <tr className="text-slate-500 font-semibold lato text-sm">
              <th className="py-3 pl-6 pr-4 text-center font-semibold bg-slate-50 border-y border-l border-slate-100 rounded-l-xl w-[6%]">
                #
              </th>
              <th className="py-3 px-4 text-left font-semibold bg-slate-50 border-y border-slate-100 w-[28%]">
                Student Name
              </th>
              <th className="py-3 px-4 text-center font-semibold bg-slate-50 border-y border-slate-100 w-[15%]">
                Quizzes Taken
              </th>
              <th className="py-3 px-4 text-center font-semibold bg-slate-50 border-y border-slate-100 w-[15%]">
                Average Sccore
              </th>
              <th className="py-3 px-4 text-center font-semibold bg-slate-50 border-y border-slate-100 w-[10%]">
                Status
              </th>
              <th className="py-3 px-4 text-center font-semibold bg-slate-50 border-y border-slate-100 w-[16%]">
                Join Date
              </th>
              <th className="py-3 pl-4 pr-6 text-center font-semibold bg-slate-50 border-y border-r border-slate-100 rounded-r-xl w-[10%]">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {students.map((student) => {
              const scoreNum = parseInt(student.score);
              const isPassing = scoreNum >= 70;
              const isActive = student.status === "Active";

              return (
                <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                  {/* Rank / # */}
                  <td className="py-4 pl-6 pr-4 border-b border-slate-100 text-center font-bold text-slate-500 roboto">
                    {student.rank}
                  </td>

                  {/* Student Name & Email */}
                  <td className="py-4 px-4 border-b border-slate-100 text-left">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900 roboto">
                        {student.name}
                      </span>
                      <span className="text-xs text-slate-400 lato mt-0.5">
                        {student.email}
                      </span>
                    </div>
                  </td>

                  {/* Quizzes Taken */}
                  <td className="py-4 px-4 border-b border-slate-100 text-center font-semibold text-slate-700 roboto">
                    {student.quizzesTaken}
                  </td>

                  {/* Average Score */}
                  <td className={`py-4 px-4 border-b border-slate-100 text-center font-bold roboto ${
                    isPassing ? "text-[#66A331]" : "text-red-500"
                  }`}>
                    {student.score}
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-4 border-b border-slate-100 text-center">
                    {isActive ? (
                      <span className="inline-block px-3 py-1 text-xs font-bold text-[#66A331] bg-[#EBF5E4] rounded-full border border-[#66A331]/20 select-none">
                        Active
                      </span>
                    ) : (
                      <span className="inline-block px-3 py-1 text-xs font-bold text-[#E65100] bg-[#FFF0E6] rounded-full border border-[#E65100]/20 select-none">
                        Inactive
                      </span>
                    )}
                  </td>

                  {/* Join Date */}
                  <td className="py-4 px-4 border-b border-slate-100 text-center font-semibold text-slate-800 roboto">
                    {student.joinDate}
                  </td>

                  {/* Actions */}
                  <td className="py-4 pl-4 pr-6 border-b border-slate-100 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => onView(student)}
                        className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors shadow-sm"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(student.id)}
                        className="p-1.5 rounded-lg border border-slate-200 hover:bg-red-50 text-slate-500 hover:text-red-600 transition-colors shadow-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {students.length === 0 && (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-400 font-medium font-sans">
                  No students found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
  );
}
