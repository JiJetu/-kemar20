import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { toast } from "sonner";

export default function RecentQuizzes() {
  const quizzes = [
    { id: 1, name: "Machine Learning Basics", subject: "Artificial Intelligence", questions: 20, date: "22 Jun 2026,", status: "Draft" },
    { id: 2, name: "Python Programming Quiz", subject: "Programming", questions: 15, date: "22 Jun 2026,", status: "Draft" },
    { id: 3, name: "Data Science Practice Test", subject: "Artificial Intelligence", questions: 15, date: "22 Jun 2026,", status: "Published" },
    { id: 4, name: "Deep Learning Evaluation", subject: "Artificial Intelligence", questions: 20, date: "22 Jun 2026,", status: "Published" },
    { id: 5, name: "Deep Learning Evaluation", subject: "Data Science", questions: 14, date: "22 Jun 2026,", status: "Published" },
    { id: 6, name: "Deep Learning Evaluation", subject: "Artificial Intelligence", questions: 10, date: "22 Jun 2026,", status: "Published" },
  ];

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
          to="/admin/upload-exam"
          className="border border-slate-300 hover:border-slate-400 text-slate-700 bg-white hover:bg-slate-50 transition-colors px-4 py-2 rounded-[6px] text-sm font-semibold shadow-sm"
        >
          View All uploads
        </Link>
      </div>

      {/* Table Section */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-sm border-separate border-spacing-0">
          <thead>
            <tr className="text-slate-500 font-semibold lato text-base">
              <th className="py-3 px-6 text-left font-semibold bg-slate-50 border-y border-l border-slate-100 rounded-l-xl">Quiz Name</th>
              <th className="py-3 px-4 text-center font-semibold bg-slate-50 border-y border-slate-100">Questions</th>
              <th className="py-3 px-4 text-left font-semibold bg-slate-50 border-y border-slate-100">Uploaded On</th>
              <th className="py-3 px-4 text-center font-semibold bg-slate-50 border-y border-slate-100">Status</th>
              <th className="py-3 px-6 text-center font-semibold bg-slate-50 border-y border-r border-slate-100 rounded-r-xl">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {quizzes.map((quiz) => (
              <tr key={quiz.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-3.5 px-6 border-b border-slate-100 font-semibold text-slate-900 roboto">
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
                    <span className="inline-block px-3 py-1 text-xs font-bold text-[#66A331] bg-[#EBF5E4] rounded-full border border-[#66A331]/20">
                      Published
                    </span>
                  ) : (
                    <span className="inline-block px-3 py-1 text-xs font-bold text-[#C48012] bg-[#FFF8E1] rounded-full border border-[#C48012]/20">
                      Draft
                    </span>
                  )}
                </td>
                <td className="py-3.5 px-6 border-b border-slate-100 text-center">
                  <button
                    type="button"
                    onClick={() => handleViewQuiz(quiz.name)}
                    className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors shadow-sm"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
