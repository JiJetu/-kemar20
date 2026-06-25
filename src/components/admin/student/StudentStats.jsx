import { ICONS } from "../../../assets";

export default function StudentStats() {
  const stats = [
    {
      title: "Total Students",
      value: "1,248",
      iconData: ICONS.studentIconsBlack,
      bg: "bg-[#C1D8F4]",
    },
    {
      title: "Active Students",
      value: "1,000",
      iconData: ICONS.studentIcon,  
      bg: "bg-[#DAF5C2]",
    },
    {
      title: "Inactive Students",
      value: "248",
      iconData: ICONS.blackIcon,
      bg: "bg-[#FCEAE2]",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full roboto">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-white border border-slate-200 rounded-[20px] p-6 flex items-center gap-5 shadow-sm hover:shadow-md transition-shadow select-none text-left"
        >
          {/* Circular Icon Wrapper */}
          <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${stat.bg}`}>
            <img src={stat.iconData} alt={stat.title} className="w-7 h-7 object-contain" />
          </div>

          {/* Labels & Counts */}
          <div className="flex flex-col gap-3">
            <span className="text-base font-medium text-slate-500 lato">
              {stat.title}
            </span>
            <span className="text-3xl font-extrabold text-slate-900 roboto">
              {stat.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
