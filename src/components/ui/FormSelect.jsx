import React from "react";

const FormSelect = React.forwardRef(
  ({ label, icon: Icon, error, children, className, labelClassName, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-2 text-left">
        {label && (
          <label className={`text-[14px] font-medium lato tracking-wide ${labelClassName || "text-black"}`}>
            {label}
          </label>
        )}

        <div className="relative flex items-center group">
          {/* Leading Icon */}
          {Icon && (
            <div className="absolute left-4 text-slate-400 group-focus-within:text-secondary transition-colors pointer-events-none">
              <Icon size={18} />
            </div>
          )}

          <select
            ref={ref}
            className={`w-full bg-white border border-[#192B4C] rounded-[10px] py-3.5 ${
              Icon ? "pl-11" : "px-4"
            } pr-10 text-black focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20 transition-all lato text-sm appearance-none cursor-pointer ${className || ""}`}
            {...props}
          >
            {children}
          </select>

          {/* Custom arrow decorator */}
          <div className="absolute right-4 pointer-events-none text-slate-500 group-focus-within:text-secondary transition-colors">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-[11px] text-red-500 font-medium pl-1 animate-in fade-in slide-in-from-top-1">
            {error.message}
          </p>
        )}
      </div>
    );
  }
);

FormSelect.displayName = "FormSelect";

export default FormSelect;
