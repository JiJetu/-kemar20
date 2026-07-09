import { useState } from "react";
import { GraduationCap } from "lucide-react";
import { toast } from "sonner";
import FreeTrialAlertBar from "./FreeTrialAlertBar";
import TopicCard from "./TopicCard";
import PremiumActiveAlertBar from "./PremiumActiveAlertBar";
import { useGetSubscriptionStatusQuery } from "../../../../redex/features/subscription/subscription.api";
import { useGetQuizzesQuery } from "../../../../redex/features/quiz/quiz.api";
import Pagination from "../../../../components/shared/Pagination";
import LoadingSpinner from "../../../../components/shared/LoadingSpinner";

export default function ExamTopics() {
  const [page, setPage] = useState(1);
  const { data: subStatus, isLoading: isSubLoading } = useGetSubscriptionStatusQuery();
  const { data: quizzesData, isLoading: isQuizzesLoading } = useGetQuizzesQuery(page);

  const isSubscribed = subStatus?.is_premium === true || subStatus?.is_active === true || subStatus?.plan === "premium";

  const isLoading = isSubLoading || isQuizzesLoading;

  if (isLoading) {
    return <LoadingSpinner message="Loading practice topics..." minHeight="min-h-[40vh]" />;
  }

  const topics = (quizzesData?.results || []).map((q) => ({
    id: q.id,
    title: q.title && q.title !== "string" ? q.title : `${q.chapter} - ${q.topic}`,
    description: q.description && q.description !== "string" ? q.description : `Practice questions for chapter ${q.chapter}, topic ${q.topic}.`,
    questionsCount: q.question_count || q.num_questions || 0,
    duration: q.time_limit || 30,
    isPremium: q.is_premium_required || false,
  }));

  const totalPages = quizzesData?.count ? Math.ceil(quizzesData.count / 10) : 1;

  return (
    <div className="w-full flex flex-col gap-6 text-slate-800 pb-12 select-none px-2 font-sans animate-in fade-in duration-300">
      
      {/* Page Title Row */}
      <div className="flex items-center gap-4 text-left select-none mt-2">
        <div className="w-14 h-14 rounded-[12px] bg-[#EBF9E9] border border-[#39842B]/10 flex items-center justify-center shrink-0">
          <GraduationCap className="w-7 h-7 text-[#39842B]" />
        </div>
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-slate-900 lora leading-none mb-1">
            Exam Practice Topics
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm font-semibold roboto">
            Select a topic below to start your practice session and challenge the leaderboard.
          </p>
        </div>
      </div>

      {/* Subscription Alert Bar */}
      {!isSubscribed && (
        <FreeTrialAlertBar />
      )}

      {/* Grid List of Topics */}
      {topics.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-[12px] p-8 text-center text-slate-500 font-medium">
          No practice topics available at the moment.
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-2">
            {topics.map((topic) => (
              <TopicCard
                key={topic.id}
                topic={topic}
                isSubscribed={isSubscribed}
                onLockClick={() => toast.error("Please upgrade to Premium to start this practice session!")}
              />
            ))}
          </div>

          {quizzesData?.count > 10 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </div>
      )}

    </div>
  );
}
