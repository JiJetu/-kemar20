import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useGetStudentDetailsQuery } from "../../../redex/features/admin/admin.api";
import LoadingSpinner from "../../shared/LoadingSpinner";

const formatDate = (isoString) => {
  if (!isoString) return "N/A";
  try {
    const dateObj = new Date(isoString);
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const day = dateObj.getDate();
    const month = months[dateObj.getMonth()];
    const year = dateObj.getFullYear();
    return `${day} ${month} ${year}`;
  } catch (e) {
    return isoString;
  }
};

const getOrdinalSuffix = (num) => {
  if (!num) return "N/A";
  const n = Number(num);
  const j = n % 10;
  const k = n % 100;
  if (j === 1 && k !== 11) {
    return n + "st";
  }
  if (j === 2 && k !== 12) {
    return n + "nd";
  }
  if (j === 3 && k !== 13) {
    return n + "rd";
  }
  return n + "th";
};

export default function StudentProfile() {
  const { id } = useParams();
  const { data: student, isLoading } = useGetStudentDetailsQuery(id);

  if (isLoading) {
    return <LoadingSpinner message="Loading student profile..." />;
  }

  if (!student) {
    return (
      <div className="bg-white border border-slate-200 rounded-[20px] p-8 text-center shadow-sm w-full min-h-[300px] flex flex-col items-center justify-center">
        <p className="text-slate-500 font-bold roboto">Student Profile Not Found</p>
        <Link to="/admin/student" className="text-[#0A2648] hover:underline text-sm font-semibold mt-2">
          &larr; Back to Student Directory
        </Link>
      </div>
    );
  }

  const displayName = student.student_name || student.full_name || "Student";
  const displayEmail = student.email || "";
  const displayStudentId = `St ${student.id}`;

  const handleViewQuiz = (attempt) => {
    toast.info(`Viewing details for: ${attempt.quiz_name}`);
  };

  const attemptsList = Array.isArray(student.quizzes) ? student.quizzes : [];

  return (
    <div className="w-full flex flex-col gap-6 text-left">
      {/* Back navigation */}
      <div className="flex items-center">
        <Link
          to="/admin/student"
          className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-[#0A2648] transition-colors"
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
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200";
            }}
            alt={displayName}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-slate-100 object-cover select-none pointer-events-none"
          />
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-[#082042] roboto mb-4 leading-none">
              {displayName}
            </h2>
            <div className="grid grid-cols-[100px_1fr] gap-y-2.5 text-sm text-slate-800">
              <span className="text-slate-400 font-semibold lato">Student Id</span>
              <span className="font-semibold text-slate-700 roboto">{displayStudentId}</span>

              <span className="text-slate-400 font-semibold lato">Email</span>
              <span className="font-semibold text-slate-700 roboto">{displayEmail}</span>

              <span className="text-slate-400 font-semibold lato">Phone</span>
              <span className="font-semibold text-slate-700 roboto">{student.phone || "N/A"}</span>

              <span className="text-slate-400 font-semibold lato">Status</span>
              <div className="lato">
                {student.is_active ? (
                  <span className="inline-block px-3 py-0.5 text-xs font-semibold text-[#39842B] bg-[#E2F4DF] rounded border border-[#D1EBD0] select-none">
                    {student.status || "Active"}
                  </span>
                ) : (
                  <span className="inline-block px-3 py-0.5 text-xs font-semibold text-[#C5221F] bg-[#FCE8E6] rounded border border-[#FAD2CF] select-none">
                    {student.status || "Inactive"}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="hidden md:block w-[1px] bg-slate-200 self-stretch mx-8" />

        {/* Right Section: Join Date & Plan Status */}
        <div className="flex flex-col justify-center md:pl-8 min-w-[240px]">
          <div className="grid grid-cols-[115px_1fr] gap-y-4 text-sm text-slate-800">
            <span className="text-slate-400 font-semibold lato self-center">Join Date</span>
            <span className="font-bold text-slate-700 roboto self-center">{formatDate(student.join_date)}</span>

            <span className="text-slate-400 font-semibold lato self-center">Plan Status</span>
            <div className="lato self-center">
              {student.plan_status?.toLowerCase() === "premium" ? (
                <span className="inline-block px-3 py-1 text-xs font-bold text-[#1967D2] bg-[#E8F0FE] rounded border border-[#D2E3FC] select-none">
                  Premium
                </span>
              ) : (
                <span className="inline-block px-4 py-1 text-xs font-bold text-[#5F6368] bg-[#F1F3F4] rounded border border-[#DADCE0] select-none">
                  {student.plan_status || "Free"}
                </span>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* 2x2 Grid of Detail Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        
        {/* Card 1: Personal Information */}
        <div className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-sm text-left">
          <h3 className="text-xl font-bold text-[#082042] mb-6 roboto">
            Personal Information
          </h3>
          <div className="grid grid-cols-[105px_1fr] gap-y-3.5 text-sm text-slate-800">
            <span className="text-slate-400 font-semibold lato">Full Name</span>
            <span className="font-semibold text-slate-700 roboto">{student.full_name || displayName}</span>

            <span className="text-slate-400 font-semibold lato">School</span>
            <span className="font-semibold text-slate-700 roboto">{student.school || "N/A"}</span>

            <span className="text-slate-400 font-semibold lato">Class/Form</span>
            <span className="font-semibold text-slate-700 roboto">{student.class_form || student.student_class || "N/A"}</span>

            <span className="text-slate-400 font-semibold lato">Time Slot</span>
            <span className="font-semibold text-slate-700 roboto">{student.time_slot || "N/A"}</span>
          </div>
        </div>

        {/* Card 2: Parent Information */}
        <div className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-sm text-left">
          <h3 className="text-xl font-bold text-[#082042] mb-6 roboto">
            Parent Information
          </h3>
          <div className="grid grid-cols-[115px_1fr] gap-y-3.5 text-sm text-slate-800">
            <span className="text-slate-400 font-semibold lato">Parent Name</span>
            <span className="font-semibold text-slate-700 roboto">{student.parent_full_name || "N/A"}</span>

            <span className="text-slate-400 font-semibold lato">Parent Email</span>
            <span className="font-semibold text-slate-700 roboto">{student.parent_email || "N/A"}</span>

            <span className="text-slate-400 font-semibold lato">Parent Phone</span>
            <span className="font-semibold text-slate-700 roboto">{student.parent_contact_number || "N/A"}</span>
          </div>
        </div>

        {/* Card 3: Subscription Information */}
        <div className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-sm text-left">
          <h3 className="text-xl font-bold text-[#082042] mb-6 roboto">
            Subscription Information
          </h3>
          <div className="grid grid-cols-[135px_1fr] gap-y-3.5 text-sm text-slate-800">
            <span className="text-slate-400 font-semibold lato">Plan Type</span>
            <span className="font-semibold text-slate-700 roboto">{student.subscription?.plan_type || student.plan_status || "Free"}</span>

            <span className="text-slate-400 font-semibold lato">Registration Date</span>
            <span className="font-semibold text-slate-700 roboto">{formatDate(student.subscription?.registration_date)}</span>

            <span className="text-slate-400 font-semibold lato">Expiry Date</span>
            <span className="font-semibold text-slate-700 roboto">{formatDate(student.subscription?.expiry_date)}</span>

            <span className="text-slate-400 font-semibold lato">Payment Method</span>
            <span className="font-semibold text-slate-700 roboto">{student.payment?.payment_method || "N/A"}</span>

            <span className="text-slate-400 font-semibold lato">Payment Status</span>
            <span className={`font-bold ${student.payment?.status === "success" ? "text-green-600" : "text-red-500"}`}>
              {student.payment?.payment_status || "N/A"}
            </span>
          </div>
        </div>

        {/* Card 4: Quick Summary */}
        <div className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-sm text-left">
          <h3 className="text-xl font-bold text-[#082042] mb-6 roboto">
            Quick Summary
          </h3>
          <div className="grid grid-cols-[145px_1fr] gap-y-3.5 text-sm text-slate-800">
            <span className="text-slate-400 font-semibold lato">Total Quizzes Taken</span>
            <span className="font-semibold text-slate-700 roboto">{student.quick_summary?.total_quizzes_taken || 0}</span>

            <span className="text-slate-400 font-semibold lato">Average Score</span>
            <span className="font-semibold text-[#66A331] roboto">{student.quick_summary?.average_score !== undefined ? `${student.quick_summary.average_score}%` : "0%"}</span>
          </div>
        </div>
      </div>

      {/* Quiz Attempts Table Card */}
      <div className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-sm w-full overflow-hidden">
        <h3 className="text-xl font-bold text-[#082042] mb-5 roboto text-left">Quiz Attempts</h3>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm border-separate border-spacing-0">
            <thead>
              <tr className="text-slate-500 font-semibold lato text-sm">
                <th className="py-3 px-6 text-left font-semibold bg-[#E5ECF9]/50 border-y border-l border-[#E5ECF9]/10 rounded-l-xl text-slate-600">
                  Quiz Name
                </th>
                <th className="py-3 px-4 text-center font-semibold bg-[#E5ECF9]/50 border-y border-[#E5ECF9]/10 text-slate-600">
                  Score
                </th>
                <th className="py-3 px-4 text-center font-semibold bg-[#E5ECF9]/50 border-y border-[#E5ECF9]/10 text-slate-600">
                  Rank
                </th>
                <th className="py-3 px-4 text-center font-semibold bg-[#E5ECF9]/50 border-y border-[#E5ECF9]/10 text-slate-600">
                  Date
                </th>
                {/* <th className="py-3 px-6 text-center font-semibold bg-[#E5ECF9]/50 border-y border-r border-[#E5ECF9]/10 rounded-r-xl text-slate-600">
                  Action
                </th> */}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {attemptsList.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-slate-400 font-semibold lato">
                    No quiz attempts logged for this student.
                  </td>
                </tr>
              ) : (
                attemptsList.map((attempt) => (
                  <tr key={attempt.id} className="hover:bg-slate-50/50 transition-colors">
                    {/* Quiz Name */}
                    <td className="py-4 px-6 border-b border-slate-100 text-left font-semibold text-[#0A2648] roboto">
                      {attempt.quiz_name}
                    </td>

                    {/* Score */}
                    <td className="py-4 px-4 border-b border-slate-100 text-center font-semibold text-[#0047D2] roboto">
                      {attempt.score} / {attempt.total}
                    </td>

                    {/* Rank */}
                    <td className="py-4 px-4 border-b border-slate-100 text-center font-medium text-slate-600 roboto">
                      {Number(attempt.rank) === 1 && (
                        <div className="flex items-center justify-center gap-1">
                          <span className="text-yellow-500">👑</span>
                          <span className="font-semibold text-amber-500 leading-none">{getOrdinalSuffix(attempt.rank)}</span>
                        </div>
                      )}
                      {Number(attempt.rank) === 2 && (
                        <div className="flex items-center justify-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-[#0A2648] text-white flex items-center justify-center text-xs font-bold roboto">
                            2
                          </span>
                          <span className="font-semibold text-slate-700 leading-none">{getOrdinalSuffix(attempt.rank)}</span>
                        </div>
                      )}
                      {Number(attempt.rank) === 3 && (
                        <div className="flex items-center justify-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-[#7C2D12] text-white flex items-center justify-center text-xs font-bold roboto">
                            3
                          </span>
                          <span className="font-semibold text-slate-700 leading-none">{getOrdinalSuffix(attempt.rank)}</span>
                        </div>
                      )}
                      {Number(attempt.rank) > 3 && (
                        <span className="text-slate-500 font-medium leading-none">{getOrdinalSuffix(attempt.rank)}</span>
                      )}
                      {!attempt.rank && <span className="text-slate-400 font-medium leading-none">-</span>}
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 border-b border-slate-100 text-center text-slate-500 lato font-medium">
                      {formatDate(attempt.submitted_at)}
                    </td>

                    {/* Action */}
                    {/* <td className="py-4 px-6 border-b border-slate-100 text-center">
                      <div className="flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => handleViewQuiz(attempt)}
                          className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors shadow-sm cursor-pointer select-none"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td> */}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
