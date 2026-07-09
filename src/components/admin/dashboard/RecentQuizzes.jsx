import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { toast } from "sonner";

export default function RecentQuizzes({ quizzes = [] }) {
  const quizzesList = Array.isArray(quizzes)
    ? quizzes.map((q) => {
        let formattedDate = "";
        try {
          if (q.created_at) {
            const dateObj = new Date(q.created_at);
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const day = dateObj.getDate();
            const month = months[dateObj.getMonth()];
            const year = dateObj.getFullYear();
            formattedDate = `${day} ${month} ${year},`;
          }
        } catch (e) {
          formattedDate = "";
        }
        return {
          id: q.id,
          name: q.title || "Untitled Quiz",
          questions: q.questions !== undefined ? q.questions : 0,
          date: formattedDate || "22 Jun 2026,",
          status: q.status || (q.is_published ? "Published" : "Draft"),
        };
      })
    : [];

  const handleViewQuiz = (quizName) => {
    toast.info(`Viewing details for: ${quizName}`);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-sm flex flex-col gap-5 text-left w-full h-full">
      {/* Header Row */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-[#082042] roboto">
          Recent Quiz uploads
        </h3>
        <Link
          to="/admin/quiz"
          className="border border-[#0A2648] hover:bg-[#0A2648]/5 text-[#0A2648] bg-white transition-colors px-3 py-1.5 rounded-[6px] text-xs font-bold"
        >
          View All uploads
        </Link>
      </div>

      {/* Table Section */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-sm border-separate border-spacing-0">
          <thead>
            <tr className="text-slate-500 font-semibold lato text-base">
              <th className="py-3 px-6 text-left font-semibold bg-[#E5ECF9]/50 border-y border-l border-[#E5ECF9]/10 rounded-l-xl">Quiz Name</th>
              <th className="py-3 px-4 text-center font-semibold bg-[#E5ECF9]/50 border-y border-[#E5ECF9]/10">Questions</th>
              <th className="py-3 px-4 text-left font-semibold bg-[#E5ECF9]/50 border-y border-[#E5ECF9]/10">Uploaded On</th>
              <th className="py-3 px-4 text-center font-semibold bg-[#E5ECF9]/50 border-y border-[#E5ECF9]/10">Status</th>
              <th className="py-3 px-6 text-center font-semibold bg-[#E5ECF9]/50 border-y border-r border-[#E5ECF9]/10 rounded-r-xl">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {quizzesList.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-8 text-center text-slate-400 font-semibold lato">
                  No recent quiz uploads available.
                </td>
              </tr>
            ) : (
              quizzesList.map((quiz) => (
                <tr key={quiz.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 px-6 border-b border-slate-100 font-semibold text-[#0A2648] roboto">
                    {quiz.name}
                  </td>
                  <td className="py-3.5 px-4 border-b border-slate-100 text-center font-semibold text-slate-700 roboto">
                    {quiz.questions}
                  </td>
                  <td className="py-3.5 px-4 border-b border-slate-100 font-medium text-slate-500 lato">
                    {quiz.date}
                  </td>
                  <td className="py-3.5 px-4 border-b border-slate-100 text-center">
                    {quiz.status === "Published" ? (
                      <span className="inline-block px-2.5 py-0.5 text-xs font-semibold text-[#39842B] bg-[#E2F4DF] rounded border border-[#D1EBD0]">
                        Published
                      </span>
                    ) : (
                      <span className="inline-block px-2.5 py-0.5 text-xs font-semibold text-[#D97706] bg-[#FFFBEB] rounded border border-[#FEF3C7]">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-6 border-b border-slate-100 text-center">
                    <button
                      type="button"
                      onClick={() => handleViewQuiz(quiz.name)}
                      className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors shadow-sm cursor-pointer select-none"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
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
