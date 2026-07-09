import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900/90 text-white text-xs font-bold px-3 py-2 rounded-lg shadow-md flex flex-col items-center border border-slate-800">
        <span className="text-slate-400">{data.label}</span>
        <span className="text-[#39842B] font-extrabold mt-0.5">{data.displayVal}</span>
      </div>
    );
  }
  return null;
};

export default function RevenueTrendChart({ trend }) {
  const [period, setPeriod] = useState("daily");

  const mapTrendData = (list) => {
    if (!list || !Array.isArray(list)) return [];
    return list.map((item) => ({
      label: item.label || item.name || item.date || "Point",
      val: item.val !== undefined ? Number(item.val) : Number(item.revenue || 0),
      displayVal: item.displayVal || `$${Number(item.val || item.revenue || 0).toLocaleString()}`,
    }));
  };

  const activeData = period === "daily"
    ? mapTrendData(trend?.daily)
    : period === "weekly"
    ? mapTrendData(trend?.weekly)
    : mapTrendData(trend?.monthly);

  return (
    <div className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-sm flex flex-col gap-6 text-left w-full relative">
      
      {/* Title & Filters Row */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Dropdown Selector */}
        <div className="flex items-center gap-1.5 cursor-pointer hover:opacity-85 select-none">
          <h3 className="text-base font-bold text-[#082042] roboto">
            Revenue Trend
          </h3>
          <ChevronDown size={16} className="text-[#082042] mt-0.5" />
        </div>

        {/* Tab Selection buttons */}
        <div className="flex items-center gap-2">
          {["daily", "weekly", "monthly"].map((tab) => {
            const isActive = period === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setPeriod(tab)}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-all uppercase tracking-wide cursor-pointer ${
                  isActive
                    ? "bg-[#E2F4DF] text-[#39842B] border border-[#D1EBD0]"
                    : "bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                }`}
              >
                ● {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Recharts Area Chart */}
      <div className="w-full h-[280px]">
        {activeData.length === 0 ? (
          <div className="w-full h-full flex flex-col items-center justify-center border border-dashed border-slate-200 rounded-[20px] bg-slate-50/50 p-6 text-center">
            <span className="text-slate-400 font-bold text-sm roboto">No Revenue Trend Data Available</span>
            <span className="text-slate-400 text-xs mt-1 lato block max-w-xs">
              Daily, weekly, or monthly trend details will appear once sales records are logged.
            </span>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={activeData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#39842B" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#39842B" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid 
                vertical={false} 
                stroke="#f1f5f9" 
                strokeDasharray="4 4" 
              />

              <XAxis 
                dataKey="label" 
                axisLine={{ stroke: '#94a3b8', strokeWidth: 1 }}
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 'bold' }} 
                dy={10}
              />

              <YAxis 
                axisLine={{ stroke: '#94a3b8', strokeWidth: 1 }}
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} 
                tickFormatter={(val) => `$${val}`} 
                ticks={[0, 500, 1000, 1500, 2000]} 
                domain={[0, 2000]} 
                dx={-5}
              />

              <Tooltip content={<CustomTooltip />} />

              <Area 
                type="monotone" 
                dataKey="val" 
                stroke="#39842B" 
                strokeWidth={2} 
                fillOpacity={1} 
                fill="url(#colorPv)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

    </div>
  );
}
