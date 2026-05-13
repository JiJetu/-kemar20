import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const FormInput = React.forwardRef(
  ({ label, icon: Icon, type = "text", error, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    return (
      <div className="w-full space-y-1">
        <div className="relative flex items-center group">
          {/* Leading Icon */}
          {Icon && (
            <div className="absolute left-4 text-secondary/40 group-focus-within:text-primary transition-colors">
              <Icon size={18} />
            </div>
          )}

          <input
            ref={ref}
            type={isPassword ? (showPassword ? "text" : "password") : type}
            className={`w-full bg-[#EFECE7] border-none rounded-xl py-3.5 ${
              Icon ? "pl-11" : "px-4"
            } ${
              isPassword ? "pr-11" : "pr-4"
            } text-secondary placeholder:text-secondary/30 focus:ring-1 focus:ring-primary/20 transition-all raleway text-sm outline-none`}
            {...props}
          />

          {/* Password Toggle */}
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 text-secondary/40 hover:text-secondary/60 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-[11px] text-red-500 font-medium pl-2 animate-in fade-in slide-in-from-top-1">
            {error.message}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
