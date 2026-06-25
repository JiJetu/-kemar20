import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  // Calculate dynamic page window to display (e.g. 1 - 10 of 13 Pages)
  const windowSize = 10;
  const startPage = Math.floor((currentPage - 1) / windowSize) * windowSize + 1;
  const endPage = Math.min(startPage + windowSize - 1, totalPages);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-5 px-6 border-t border-slate-100 bg-white rounded-b-[20px] select-none text-slate-500 roboto text-sm w-full">
      {/* Left side range label */}
      <div className="flex items-center gap-1 font-medium">
        <span className="text-[#66A331] font-bold">{startPage}</span>
        <span className="text-slate-400 font-semibold">-</span>
        <span className="text-slate-700 font-bold">{endPage}</span>
        <span className="text-slate-400 font-medium ml-1">of</span>
        <span className="text-slate-700 font-semibold">{totalPages} Pages</span>
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-400 font-medium lato">The page on</span>
          
          {/* Page Dropdown Jump-To */}
          <div className="relative">
            <select
              value={currentPage}
              onChange={(e) => onPageChange(Number(e.target.value))}
              className="appearance-none bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold pl-3 pr-8 py-1 rounded-[6px] text-sm shadow-sm focus:outline-none cursor-pointer transition-colors font-sans"
            >
              {pages.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-slate-400">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Navigation Arrow Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="w-8 h-8 rounded-[6px] border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-slate-800 disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-all shadow-sm"
          >
            <ChevronLeft className="w-4 h-4 shrink-0" />
          </button>
          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="w-8 h-8 rounded-[6px] border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-slate-800 disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-all shadow-sm"
          >
            <ChevronRight className="w-4 h-4 shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
}
