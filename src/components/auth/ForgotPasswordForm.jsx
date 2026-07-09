import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  useForgotPasswordMutation,
  useResetPasswordMutation,
} from "../../redex/features/auth/auth.api";
import {
  EmailStep,
  OtpStep,
  ResetStep,
  SuccessStep,
} from "./ForgotPasswordForms";

const ForgotPasswordForm = ({ onStepChange }) => {
  const [step, setStep] = useState("email"); // 'email' | 'otp' | 'reset' | 'success'
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const [forgotPassword, { isLoading: isForgotLoading }] = useForgotPasswordMutation();
  const [resetPassword, { isLoading: isResetLoading }] = useResetPasswordMutation();

  const handleEmailSubmit = async (data) => {
    try {
      await forgotPassword({ email: data.email }).unwrap();
      toast.success("Verification code sent to your email!");
      setEmail(data.email);
      setStep("otp");
      onStepChange?.("otp");
    } catch (error) {
      console.error("Forgot password error:", error);
      
      let errorMsg = "Failed to request password reset. Please try again.";
      const errorData = error?.data;
      
      if (errorData) {
        if (errorData.detail) {
          errorMsg = errorData.detail;
        } else if (errorData.message) {
          errorMsg = errorData.message;
        } else if (typeof errorData === "object") {
          const fieldErrors = Object.entries(errorData)
            .map(([field, msgs]) => {
              const friendlyField = field.charAt(0).toUpperCase() + field.slice(1).replace("_", " ");
              const messages = Array.isArray(msgs) ? msgs.join(" ") : msgs;
              return `${friendlyField}: ${messages}`;
            })
            .join("\n");
          if (fieldErrors) {
            errorMsg = fieldErrors;
          }
        }
      }
      
      toast.error(errorMsg);
    }
  };

  const handleOtpSubmit = (data) => {
    setOtp(data.otp);
    setStep("reset");
    onStepChange?.("reset");
  };

  const handleResetSubmit = async (data) => {
    try {
      await resetPassword({
        email,
        otp,
        new_password: data.password,
      }).unwrap();
      toast.success("Password reset successfully!");
      setStep("success");
      onStepChange?.("success");
    } catch (error) {
      console.error("Reset password error:", error);
      
      let errorMsg = "Failed to reset password. Please verify your OTP code.";
      const errorData = error?.data;
      
      if (errorData) {
        if (errorData.detail) {
          errorMsg = errorData.detail;
        } else if (errorData.message) {
          errorMsg = errorData.message;
        } else if (typeof errorData === "object") {
          const fieldErrors = Object.entries(errorData)
            .map(([field, msgs]) => {
              const friendlyField = field.charAt(0).toUpperCase() + field.slice(1).replace("_", " ");
              const messages = Array.isArray(msgs) ? msgs.join(" ") : msgs;
              return `${friendlyField}: ${messages}`;
            })
            .join("\n");
          if (fieldErrors) {
            errorMsg = fieldErrors;
          }
        }
      }
      
      toast.error(errorMsg);
    }
  };

  const handleFinish = () => {
    navigate("/login");
  };

  return (
    <div className="w-full">
      {step === "email" && (
        <EmailStep onNext={handleEmailSubmit} isLoading={isForgotLoading} />
      )}
      {step === "otp" && (
        <OtpStep onNext={handleOtpSubmit} />
      )}
      {step === "reset" && (
        <ResetStep onNext={handleResetSubmit} isLoading={isResetLoading} />
      )}
      {step === "success" && (
        <SuccessStep onFinish={handleFinish} />
      )}
    </div>
  );
};

export default ForgotPasswordForm;
