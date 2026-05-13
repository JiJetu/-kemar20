import { useState } from "react";
import AuthLayout from "../../components/shared/auth/AuthLayout";
import ForgotPasswordForm from "../../components/auth/ForgotPasswordForm";
import SEO from "../../components/shared/SEO";

function ForgotPassword() {
  const [currentStep, setCurrentStep] = useState("email");

  const getSubtitle = (step) => {
    switch (step) {
      case "email":
        return "Sign in to your account to start exploring";
      case "otp":
        return "We've sent a 4-digit code to your email";
      case "reset":
        return "Please enter your new password below";
      case "success":
        return "Your account is now secure and ready to use";
      default:
        return "";
    }
  };

  return (
    <>
      <SEO
        title="Forgot Password || IMMERSIV"
        description="Forgot your password? No problem! Reset your password and get back to exploring Culture, Cuisine, Motion, and Memory on IMMERSIV."
      />

      <AuthLayout
        title={currentStep === "success" ? "Success" : "Forgot Password"}
        subtitle={getSubtitle(currentStep)}
      >
        <ForgotPasswordForm onStepChange={setCurrentStep} />
      </AuthLayout>
    </>
  );
}

export default ForgotPassword;
