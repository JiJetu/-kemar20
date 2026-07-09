import { Users, UserCheck, Crown, Gift } from "lucide-react";

export default function StudentStats({ stats: apiStats }) {
  const stats = [
    {
      title: "Total Students",
      value: apiStats?.total_students !== undefined ? Number(apiStats.total_students).toLocaleString() : "0",
      icon: <Users className="w-6 h-6 text-[#0A2648]" />,
      bg: "bg-[#E5ECF9]",
    },
    {
      title: "Active Students",
      value: apiStats?.active_students !== undefined ? Number(apiStats.active_students).toLocaleString() : "0",
      icon: <UserCheck className="w-6 h-6 text-[#66A331]" />,
      bg: "bg-[#EBF9E9]",
    },
    {
      title: "Premium Students",
      value: apiStats?.premium_students !== undefined ? Number(apiStats.premium_students).toLocaleString() : "0",
      icon: <Crown className="w-6 h-6 text-[#0047D2] fill-[#0047D2]" />,
      bg: "bg-[#E8F0FE]",
    },
    {
      title: "Free Students",
      value: apiStats?.free_students !== undefined ? Number(apiStats.free_students).toLocaleString() : "0",
      icon: <Gift className="w-6 h-6 text-[#66A331]" />,
      bg: "bg-[#EBF9E9]",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full roboto">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-white border border-slate-200 rounded-[20px] p-6 flex items-center gap-5 shadow-sm hover:shadow-md transition-shadow select-none text-left"
        >
          {/* Circular Icon Wrapper */}
          <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${stat.bg}`}>
            {stat.icon}
          </div>

          {/* Labels & Counts */}
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-slate-400 lato">
              {stat.title}
            </span>
            <span className="text-3xl font-extrabold text-slate-800 roboto">
              {stat.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
