import { ICONS } from "../../../assets";

export default function StatusCards() {
  const cards = [
    {
      title: "Total Students",
      value: "1,248",
      iconImage: ICONS.studentIconsBlack,
      
      iconBg: "bg-[#C1D8F4]",
    },
    {
      title: "Total Quiz Uploads",
      value: "156",
      iconImage: ICONS.quizIconsBlack,
      iconBg: "bg-[#DAF5C2]",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full roboto">
      {cards.map((card) => {
        return (
          <div
            key={card.title}
            className="bg-white border border-slate-200 rounded-[20px] p-6 flex items-center gap-5 shadow-sm hover:shadow-md transition-shadow select-none text-left"
          >
            {/* Circular Icon */}
            <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${card.iconBg}`}>
              <img src={card.iconImage} alt="icon" className="w-7 h-7" />
            </div>

            {/* Labels */}
            <div className="flex flex-col gap-3">
              <span className="text-base font-medium text-slate-500 lato">
                {card.title}
              </span>
              <span className="text-3xl font-extrabold text-slate-900 roboto">
                {card.value}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
