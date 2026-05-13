import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  EmailStep,
  OtpStep,
  ResetStep,
  SuccessStep,
} from "./ForgotPasswordForms";

const ForgotPasswordForm = ({ onStepChange }) => {
  const [step, setStep] = useState("email"); // 'email' | 'otp' | 'reset' | 'success'
  const navigate = useNavigate();

  const handleEmailSubmit = (data) => {
    console.log("Email submitted:", data);
    setStep("otp");
    onStepChange?.("otp");
  };

  const handleOtpSubmit = (data) => {
    console.log("OTP submitted:", data);
    setStep("reset");
    onStepChange?.("reset");
  };

  const handleResetSubmit = (data) => {
    console.log("Password reset submitted:", data);
    setStep("success");
    onStepChange?.("success");
  };

  const handleFinish = () => {
    navigate("/login");
  };

  return (
    <div className="w-full">
      {step === "email" && <EmailStep onNext={handleEmailSubmit} />}
      {step === "otp" && <OtpStep onNext={handleOtpSubmit} />}
      {step === "reset" && <ResetStep onNext={handleResetSubmit} />}
      {step === "success" && <SuccessStep onFinish={handleFinish} />}
    </div>
  );
};

export default ForgotPasswordForm;
