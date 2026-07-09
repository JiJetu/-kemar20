import { ICONS } from "../../../assets";
import { DollarSign } from "lucide-react";

export default function StatusCards({ totalRevenue = 0, totalStudents = 0, totalQuizUploads = 0 }) {
  const cards = [
    {
      title: "Total Revenue",
      value: `$${Number(totalRevenue).toLocaleString()}`,
      icon: <DollarSign className="w-6 h-6 text-[#D97706]" />,
      iconBg: "bg-[#FFF8E7] border border-orange-100",
    },
    {
      title: "Total Students",
      value: Number(totalStudents).toLocaleString(),
      iconImage: ICONS.studentIcons,
      iconBg: "bg-[#E5ECF9]",
    },
    {
      title: "Total Quiz Uploads",
      value: Number(totalQuizUploads).toLocaleString(),
      iconImage: ICONS.quizIcons,
      iconBg: "bg-[#EBF9E9]",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full roboto">
      {cards.map((card) => {
        return (
          <div
            key={card.title}
            className="bg-white border border-slate-200 rounded-[20px] p-6 flex items-center gap-5 shadow-sm hover:shadow-md transition-shadow select-none text-left"
          >
            {/* Circular Icon */}
            <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${card.iconBg}`}>
              {card.icon ? card.icon : <img src={card.iconImage} alt="icon" className="w-7 h-7" />}
            </div>

            {/* Labels */}
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold text-slate-400 lato">
                {card.title}
              </span>
              <span className="text-3xl font-extrabold text-[#082042] roboto">
                {card.value}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
