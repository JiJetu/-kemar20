import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../../components/shared/auth/AuthLayout";
import ForgotPasswordForm from "../../components/auth/ForgotPasswordForm";
import SEO from "../../components/shared/SEO";
import { IMAGES } from "../../assets";

function ForgotPassword() {
  const [currentStep, setCurrentStep] = useState("email");

  const getSubtitle = (step) => {
    switch (step) {
      case "email":
        return "Enter your email to reset your password";
      case "otp":
        return "We've sent a 6-digit code to your email";
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
        title="Forgot Password || ExcelJM"
        description="Forgot your password? No problem! Reset your password and get back to exploring Culture, Cuisine, Motion, and Memory on ExcelJM."
      />

      <AuthLayout
        title={currentStep === "success" ? "Success" : "Forgot Password"}
        subtitle={getSubtitle(currentStep)}
      >
        <div className="w-full text-left animate-in fade-in duration-300">
          <Link to="/login" className="inline-block">
            <img
              src={IMAGES.logo}
              alt="ExcelJM Logo"
              className="h-20 w-auto object-contain mb-4 select-none cursor-pointer hover:opacity-90 transition-opacity"
            />
          </Link>
          <ForgotPasswordForm onStepChange={setCurrentStep} />
        </div>
      </AuthLayout>
    </>
  );
}

export default ForgotPassword;
