import { ChevronDown } from "lucide-react";

export default function ClassSelectionForm({
  selectedClass,
  setSelectedClass,
  isDropdownOpen,
  setIsDropdownOpen,
  classes,
  errors,
  setErrors,
  handleNext,
  handleBack,
}) {
  return (
    <div className="flex flex-col gap-4 animate-in fade-in duration-300">
      <div>
        <h3 className="text-2xl font-extrabold text-[#082042] lora">Class Selection</h3>
        <p className="text-slate-400 text-xs font-semibold mt-1 mb-4">Please select your current class.</p>
      </div>

      <div className="relative w-full mb-6">
        <label className="text-sm font-semibold text-[#082042] mb-1.5 block">Select Class</label>
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full bg-white border border-slate-200 rounded-[8px] py-3.5 px-4 text-slate-700 font-semibold text-sm flex items-center justify-between focus:outline-none focus:border-[#39842B]"
        >
          <span>{selectedClass || "Choose Your Class"}</span>
          <ChevronDown className="w-5 h-5 text-slate-500" />
        </button>
        
        {isDropdownOpen && (
          <div className="absolute top-[80px] left-0 w-full bg-white border border-slate-100 shadow-lg rounded-[8px] z-20 py-2 max-h-60 overflow-y-auto">
            {classes.map((cls) => (
              <button
                key={cls}
                type="button"
                onClick={() => {
                  setSelectedClass(cls);
                  setIsDropdownOpen(false);
                  setErrors({ ...errors, selectedClass: "" });
                }}
                className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 font-bold transition-colors"
              >
                {cls}
              </button>
            ))}
          </div>
        )}
        {errors.selectedClass && (
          <span className="text-red-500 text-xs font-medium mt-1.5 pl-1 block text-left">
            {errors.selectedClass}
          </span>
        )}
      </div>

      <div className="flex items-center gap-4 w-full">
        <button
          type="button"
          onClick={handleBack}
          className="flex-1 border border-slate-200 text-[#082042] hover:bg-slate-50 py-3.5 rounded-[8px] font-bold text-sm transition-all flex items-center justify-center gap-1 active:scale-[0.98]"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="flex-1 bg-[#39842B] hover:bg-[#39842B]/95 text-white py-3.5 rounded-[8px] font-bold text-sm transition-all flex items-center justify-center gap-1.5 active:scale-[0.98]"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
