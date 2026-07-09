import { Clock } from "lucide-react";

export default function TimeSelectionForm({
  selectedTime,
  setSelectedTime,
  timeOptions,
  errors,
  setErrors,
  handleBack,
  handleFinalSubmit,
  isLoading,
}) {
  return (
    <div className="flex flex-col gap-4 animate-in fade-in duration-300">
      <div>
        <h3 className="text-2xl font-extrabold text-[#082042] lora">Select Preferred Time</h3>
        <p className="text-slate-400 text-xs font-semibold mt-1 mb-4">Choose Your Preferred Time For The Selected Class</p>
      </div>

      <div className="flex flex-col gap-4 w-full mb-6">
        {timeOptions.map((opt) => {
          const isSelected = selectedTime === opt.id;
          return (
            <div
              key={opt.id}
              onClick={() => {
                setSelectedTime(opt.id);
                setErrors({ ...errors, selectedTime: "" });
              }}
              className={`flex items-center gap-4 border p-4 rounded-xl cursor-pointer transition-all ${
                isSelected 
                  ? "border-[#39842B] bg-[#F7FFF6]" 
                  : "border-slate-200 bg-white hover:border-[#39842B]/40"
              }`}
            >
              {/* Radio button */}
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                isSelected ? "border-[#39842B]" : "border-slate-300"
              }`}>
                {isSelected && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#39842B]" />
                )}
              </div>

              {/* Clock icon in soft gray circle */}
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                <Clock className="w-5 h-5" />
              </div>

              {/* Info */}
              <div className="flex flex-col text-left">
                <span className="font-bold text-[#082042] text-sm md:text-base leading-none mb-1">
                  {opt.title}
                </span>
                <span className="text-slate-400 text-xs font-semibold">
                  {opt.time}
                </span>
              </div>
            </div>
          );
        })}
        {errors.selectedTime && (
          <span className="text-red-500 text-xs font-medium mt-1.5 pl-1 block text-left">
            {errors.selectedTime}
          </span>
        )}
      </div>

      <div className="flex items-center gap-4 w-full">
        <button
          type="button"
          onClick={handleBack}
          disabled={isLoading}
          className="flex-1 border border-slate-200 text-[#082042] hover:bg-slate-50 py-3.5 rounded-[8px] font-bold text-sm transition-all flex items-center justify-center gap-1 active:scale-[0.98] disabled:opacity-50"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={handleFinalSubmit}
          disabled={isLoading}
          className="flex-1 bg-[#39842B] hover:bg-[#39842B]/95 text-white py-3.5 rounded-[8px] font-bold text-sm transition-all flex items-center justify-center gap-1.5 active:scale-[0.98] disabled:opacity-75"
        >
          {isLoading ? "Creating..." : "Create Account →"}
        </button>
      </div>
    </div>
  );
}
