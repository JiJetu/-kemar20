import { Search, ChevronDown, Download } from "lucide-react";

export default function StudentFilters({
  searchQuery,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  onExport,
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-[20px] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm w-full roboto">
      {/* Search Input on Left */}
      <div className="relative w-full sm:w-72">
        <input
          type="text"
          placeholder="Search Student..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-white border border-slate-200 hover:border-slate-300 focus:border-slate-400 pl-4 pr-10 py-2.5 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none transition-all shadow-sm text-sm font-medium"
        />
        <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 pointer-events-none" />
      </div>

      {/* Select Filter and Export on Right */}
      <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
        {/* Status Select */}
        <div className="relative w-full sm:w-44 select-none">
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="appearance-none bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold pl-4 pr-10 py-2.5 rounded-xl text-sm shadow-sm focus:outline-none cursor-pointer transition-colors w-full"
          >
            <option value="All Status">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>

        {/* Export Button */}
        <button
          type="button"
          onClick={onExport}
          className="border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 bg-white transition-all px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm flex items-center gap-2 select-none shrink-0"
        >
          <span>Export</span>
          <Download className="w-4 h-4 text-slate-500" />
        </button>
      </div>
    </div>
  );
}
