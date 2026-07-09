import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const FormInput = React.forwardRef(
  ({ label, icon: Icon, type = "text", error, className, labelClassName, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    return (
      <div className="w-full flex flex-col gap-2 text-left">
        {label && (
          <label className={`text-sm font-semibold text-[#082042] roboto tracking-wide ${labelClassName || ""}`}>
            {label}
          </label>
        )}
        
        <div className="relative flex items-center group">
          {/* Leading Icon */}
          {Icon && (
            <div className="absolute left-4 text-slate-400 group-focus-within:text-primary transition-colors">
              <Icon size={18} />
            </div>
          )}

          <input
            ref={ref}
            type={isPassword ? (showPassword ? "text" : "password") : type}
            className={`w-full bg-white border border-slate-200 rounded-[8px] py-3.5 ${
              Icon ? "pl-11" : "px-4"
            } ${
              isPassword ? "pr-11" : "pr-4"
            } text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all roboto text-sm ${className || ""}`}
            {...props}
          />

          {/* Password Toggle */}
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 text-slate-400 hover:text-slate-500 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
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

FormInput.displayName = "FormInput";

export default FormInput;
