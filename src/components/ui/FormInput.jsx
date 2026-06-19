import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const FormInput = React.forwardRef(
  ({ label, icon: Icon, type = "text", error, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    return (
      <div className="w-full flex flex-col gap-2 text-left">
        {label && (
          <label className="text-[14px] text-slate-200 font-medium lato tracking-wide">
            {label}
          </label>
        )}
        
        <div className="relative flex items-center group">
          {/* Leading Icon */}
          {Icon && (
            <div className="absolute left-4 text-slate-400 group-focus-within:text-[#5D9E32] transition-colors">
              <Icon size={18} />
            </div>
          )}

          <input
            ref={ref}
            type={isPassword ? (showPassword ? "text" : "password") : type}
            className={`w-full bg-[#051532] border border-[#192B4C] rounded-[10px] py-3.5 ${
              Icon ? "pl-11" : "px-4"
            } ${
              isPassword ? "pr-11" : "pr-4"
            } text-white placeholder:text-slate-500 focus:outline-none focus:border-[#5D9E32] focus:ring-1 focus:ring-[#5D9E32]/20 transition-all lato text-sm`}
            {...props}
          />

          {/* Password Toggle */}
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 text-slate-400 hover:text-slate-200 transition-colors"
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
