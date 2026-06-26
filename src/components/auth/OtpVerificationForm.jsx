import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useVerifyMutation } from "../../redex/features/auth/auth.api";
import { toast } from "sonner";

const OtpVerificationForm = ({ email }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  
  // Define individual refs instead of using array instantiation of useRef() directly, 
  // to avoid React rendering hook count alignment warnings
  const ref0 = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  
  const inputRefs = [ref0, ref1, ref2, ref3, ref4, ref5];
  const navigate = useNavigate();
  const [verify, { isLoading: isVerifying }] = useVerifyMutation();

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Shift focus forward
    if (value && index < 5) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Shift focus backward on backspace if current is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData
      .split("")
      .concat(Array(6 - pastedData.length).fill(""))
      .slice(0, 6);
    setOtp(newOtp);

    const nextIndex = pastedData.length < 6 ? pastedData.length : 5;
    inputRefs[nextIndex].current?.focus();
  };

  const isComplete = otp.every((digit) => digit !== "");

  const handleVerify = async (e) => {
    if (e) e.preventDefault();
    if (!isComplete) return;

    try {
      const code = otp.join("");
      await verify({ email, otp: code }).unwrap();
      toast.success("Account activated successfully! Please log in.");
      navigate("/login");
    } catch (error) {
      console.error("Verification error:", error);
      const errorMsg = error?.data?.detail || error?.data?.message || "Invalid OTP code. Please try again.";
      toast.error(errorMsg);
    }
  };

  return (
    <form onSubmit={handleVerify} className="space-y-6 pt-2">
      <div className="flex justify-center gap-2 sm:gap-3">
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
            className="w-10 h-12 sm:w-12 sm:h-12 text-center text-xl font-bold bg-white border border-[#192B4C] text-black rounded-xl focus:border-[#5D9E32] focus:ring-1 focus:ring-[#5D9E32]/20 outline-none transition-all shadow-sm"
          />
        ))}
      </div>

      <button
        type="submit"
        disabled={!isComplete || isVerifying}
        className="w-full bg-[#5D9E32] hover:bg-[#4d8628] text-white py-3.5 rounded-xl font-bold text-sm tracking-wider transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#5D9E32]/10"
      >
        {isVerifying ? "Verifying..." : "Verify & Activate"}
      </button>
    </form>
  );
};

export default OtpVerificationForm;
