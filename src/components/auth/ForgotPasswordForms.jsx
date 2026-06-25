import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import FormInput from "../ui/FormInput";
import {
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../../lib/validation/auth.schema";

// --- Email Step ---
export const EmailStep = ({ onNext }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <FormInput
        label="Email Address"
        placeholder="Enter your email address"
        type="email"
        error={errors.email}
        {...register("email")}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#5D9E32] hover:bg-[#4d8628] text-white py-3.5 rounded-xl font-bold text-sm tracking-wider transition-all active:scale-[0.98] disabled:opacity-50"
      >
        Get OTP
      </button>
    </form>
  );
};

// --- OTP Step ---
export const OtpStep = ({ onNext }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 4);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData
      .split("")
      .concat(Array(4 - pastedData.length).fill(""))
      .slice(0, 4);
    setOtp(newOtp);

    const nextIndex = pastedData.length < 4 ? pastedData.length : 3;
    inputRefs[nextIndex].current.focus();
  };

  const isComplete = otp.every((digit) => digit !== "");

  return (
    <div className="space-y-6 pt-2">
      <div className="flex justify-center gap-5">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={inputRefs[index]}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className="w-12 h-12 text-center text-xl font-bold bg-white border border-[#192B4C] text-black rounded-xl focus:border-[#5D9E32] focus:ring-1 focus:ring-[#5D9E32]/20 outline-none transition-all shadow-sm"
          />
        ))}
      </div>
      <button
        onClick={() => isComplete && onNext({ otp: otp.join("") })}
        disabled={!isComplete}
        className="w-full bg-[#5D9E32] hover:bg-[#4d8628] text-white py-3.5 rounded-xl font-bold text-sm tracking-wider transition-all active:scale-[0.98] disabled:opacity-50"
      >
        Continue
      </button>
    </div>
  );
};

// --- Reset Password Step ---
export const ResetStep = ({ onNext }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div className="space-y-4">
        <FormInput
          label="New Password"
          placeholder="New Password"
          type="password"
          error={errors.password}
          {...register("password")}
        />
        <FormInput
          label="Confirm Password"
          placeholder="Confirm Password"
          type="password"
          error={errors.confirmPassword}
          {...register("confirmPassword")}
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#5D9E32] hover:bg-[#4d8628] text-white py-3.5 rounded-xl font-bold text-sm tracking-wider transition-all active:scale-[0.98] disabled:opacity-50"
      >
        Continue
      </button>
    </form>
  );
};

// --- Success Step ---
export const SuccessStep = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 3000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="flex flex-col items-center justify-center py-4 space-y-6 animate-in zoom-in-95 duration-500">
      <div className="relative">
        <div className="absolute inset-0 bg-[#5D9E32]/20 rounded-full blur-xl animate-pulse" />
        <CheckCircle2 className="w-24 h-24 text-[#5D9E32] relative z-10" />
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white font-sans tracking-tight">
          Password Changed!
        </h2>
        <p className="text-slate-400 lato font-medium text-sm">
          Your password has been changed successfully.
        </p>
      </div>
    </div>
  );
};
