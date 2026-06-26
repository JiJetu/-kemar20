import { useState } from "react";
import AuthLayout from "../../components/shared/auth/AuthLayout";
import SignupForm from "../../components/auth/SignupForm";
import OtpVerificationForm from "../../components/auth/OtpVerificationForm";
import SEO from "../../components/shared/SEO";

function Signup() {
  const [step, setStep] = useState("signup"); // 'signup' | 'otp'
  const [email, setEmail] = useState("");

  const handleSignupSuccess = (registeredEmail) => {
    setEmail(registeredEmail);
    setStep("otp");
  };

  return (
    <>
      <SEO
        title={step === "signup" ? "Sign Up || ExcelJM" : "Verify Email || ExcelJM"}
        description="Create and verify your account to start exploring Culture, Cuisine, Motion, and Memory on ExcelJM."
      />

      <AuthLayout
        title={step === "signup" ? "Create Your Account" : "Verify Your Email"}
        subtitle={
          step === "signup"
            ? "Join Excel Jam And Start Your Learning Journey"
            : `We've sent a 6-digit verification code to ${email}`
        }
      >
        {step === "signup" ? (
          <SignupForm onSuccess={handleSignupSuccess} />
        ) : (
          <OtpVerificationForm email={email} />
        )}
      </AuthLayout>
    </>
  );
}

export default Signup;
