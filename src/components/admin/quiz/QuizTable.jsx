import { Eye, Trash2 } from "lucide-react";

export default function QuizTable({ quizzes, onView, onDeleteRequest }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm border-separate border-spacing-0">
        <thead>
          <tr className="text-slate-500 font-semibold lato text-sm bg-[#EAEFF8]">
            <th className="py-3 px-6 text-center font-semibold bg-[#EAEFF8] rounded-l-xl w-[8%]">
              #
            </th>
            <th className="py-3 px-4 text-left font-semibold bg-[#EAEFF8] w-[35%]">
              Quiz Title
            </th>
            <th className="py-3 px-4 text-center font-semibold bg-[#EAEFF8] w-[12%]">
              Questions
            </th>
            <th className="py-3 px-4 text-center font-semibold bg-[#EAEFF8] w-[13%]">
              Duration
            </th>
            <th className="py-3 px-4 text-center font-semibold bg-[#EAEFF8] w-[13%]">
              Status
            </th>
            <th className="py-3 px-4 text-center font-semibold bg-[#EAEFF8] w-[13%]">
              Created at
            </th>
            <th className="py-3 px-6 text-center font-semibold bg-[#EAEFF8] rounded-r-xl w-[10%]">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {quizzes.map((quiz, idx) => (
            <tr key={quiz.id} className="hover:bg-slate-50/50 transition-colors">
              {/* Row number */}
              <td className="py-4 px-6 border-b border-slate-100 text-center text-slate-800 roboto font-semibold">
                {idx + 1}
              </td>

              {/* Title */}
              <td className="py-4 px-4 border-b border-slate-100 text-left font-semibold text-slate-800 roboto">
                {quiz.title}
              </td>

              {/* Questions */}
              <td className="py-4 px-4 border-b border-slate-100 text-center font-bold text-slate-700 roboto">
                {quiz.questions}
              </td>

              {/* Duration */}
              <td className="py-4 px-4 border-b border-slate-100 text-center font-semibold text-slate-700 roboto">
                {quiz.duration}
              </td>

              {/* Status */}
              <td className="py-4 px-4 border-b border-slate-100 text-center">
                {quiz.status === "Published" ? (
                  <span className="inline-block px-3 py-1 text-xs font-bold text-[#66A331] bg-[#EBF5E4] rounded-full border border-[#66A331]/20 lato">
                    Published
                  </span>
                ) : (
                  <span className="inline-block px-3 py-1 text-xs font-bold text-[#E65100] bg-[#FFF0E6] rounded-full border border-[#E65100]/20 lato">
                    Draft
                  </span>
                )}
              </td>

              {/* Created Date */}
              <td className="py-4 px-4 border-b border-slate-100 text-center text-slate-500 font-medium lato">
                {quiz.createdAt}
              </td>

              {/* Action Buttons */}
              <td className="py-4 px-6 border-b border-slate-100 text-center">
                <div className="flex items-center justify-center gap-2">
                  {/* View Details Button */}
                  <button
                    type="button"
                    onClick={() => onView(quiz)}
                    className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors shadow-sm cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={() => onDeleteRequest(quiz)}
                    className="p-1.5 rounded-lg border border-slate-200 hover:bg-red-50 text-red-500 hover:text-red-700 transition-colors shadow-sm cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
