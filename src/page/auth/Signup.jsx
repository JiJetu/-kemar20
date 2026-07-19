import { useState } from "react";
import AuthLayout from "../../components/shared/auth/AuthLayout";
import OtpVerificationForm from "../../components/auth/OtpVerificationForm";
import SEO from "../../components/shared/SEO";
import { IMAGES } from "../../assets";
import { useSignupMutation } from "../../redex/features/auth/auth.api";
import { toast } from "sonner";
import StudentInfoForm from "../../components/auth/signup/StudentInfoForm";
import ParentInfoForm from "../../components/auth/signup/ParentInfoForm";
import ClassSelectionForm from "../../components/auth/signup/ClassSelectionForm";
import TimeSelectionForm from "../../components/auth/signup/TimeSelectionForm";
import PricingPlanScreen from "../../components/auth/signup/PricingPlanScreen";

export default function Signup() {
  const [signupStep, setSignupStep] = useState("signup"); // 'signup' | 'otp' | 'pricing'
  const [currentStep, setCurrentStep] = useState(1); // 1, 2, 3, 4
  const [email, setEmail] = useState("");

  const [signup, { isLoading }] = useSignupMutation();

  // Form State
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [studentSchool, setStudentSchool] = useState("");

  const [parentName, setParentName] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [parentPhone, setParentPhone] = useState("");

  const [selectedClass, setSelectedClass] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [selectedTime, setSelectedTime] = useState("");

  const [errors, setErrors] = useState({});

  const classes = [
    "4th Form",
    "5th Form",
  ];

  const timeOptions = [
    { id: "morning", title: "Morning", time: "12:00 Am-02:00PM" },
    { id: "afternoon", title: "Afternoon", time: "10:00 Am-12:00PM" },
    { id: "evening", title: "Evening", time: "12:00 Am-02:00PM" }
  ];

  const steps = [
    { num: 1, label: "Student Info" },
    { num: 2, label: "Parent Info" },
    { num: 3, label: "Class Selection" },
    { num: 4, label: "Time Selection" }
  ];

  const validateStep = (stepNum) => {
    const errs = {};
    if (stepNum === 1) {
      if (!studentName.trim()) errs.studentName = "Full Name is required";
      if (!studentEmail.trim() || !/\S+@\S+\.\S+/.test(studentEmail)) {
        errs.studentEmail = "Valid email address is required";
      }
      if (!studentPhone.trim()) errs.studentPhone = "Contact Number is required";
      if (!studentSchool.trim()) errs.studentSchool = "Current School is required";
    } else if (stepNum === 2) {
      if (!parentName.trim()) errs.parentName = "Parent Full Name is required";
      if (!parentEmail.trim() || !/\S+@\S+\.\S+/.test(parentEmail)) {
        errs.parentEmail = "Valid Parent email is required";
      }
      if (!parentPhone.trim()) errs.parentPhone = "Parent Contact Number is required";
    } else if (stepNum === 3) {
      if (!selectedClass) errs.selectedClass = "Please select your class";
    } else if (stepNum === 4) {
      if (!selectedTime) errs.selectedTime = "Please select preferred time";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleRegisterSubmit = async () => {
    try {
      const response = await signup({
        full_name: studentName,
        email: studentEmail,
        contact_number: studentPhone,
        current_school: studentSchool,
        parent_full_name: parentName,
        parent_email: parentEmail,
        parent_contact_number: parentPhone,
        student_class: selectedClass.split(" ")[0], // e.g. "4th", "5th"
        preferred_time: selectedTime.toLowerCase(),
      }).unwrap();

      toast.success(response.message || response.detail || "Account created! Verification code sent.");
      setEmail(studentEmail);
      setSignupStep("otp");
    } catch (error) {
      console.error("Signup error:", error);
      const errorMsg = error?.data?.detail || error?.data?.message || error?.data?.email?.[0] || "Signup failed. Please try again.";
      toast.error(errorMsg);
    }
  };

  if (signupStep === "pricing") {
    return <PricingPlanScreen />;
  }

  return (
    <>
      <SEO
        title={signupStep === "signup" ? "Sign Up || ExcelJM" : "Verify Email || ExcelJM"}
        description="Create and verify your account to start exploring and learning on ExcelJM."
      />

      <AuthLayout
        leftTitle={
          <>
            Create Your <br />
            <span className="text-[#39842B]">Account</span> and Start <br />
            Learning Smarter
          </>
        }
        leftSubtitle="Excellim is an ai-powered quiz and assessment platform that helps students practice, test their knowledge, and improve performance with instant results and solutions."
      >
        {signupStep === "signup" ? (
          <div className="w-full flex flex-col items-start select-none">
            <img
              src={IMAGES.logo}
              alt="ExcelJM Logo"
              className="h-16 w-auto object-contain mb-8 select-none"
            />
            
            {/* Steps Progress Header */}
            <div className="flex items-center justify-between w-full mb-14 px-2 relative select-none">
              {steps.map((s, idx) => (
                <div key={s.num} className="flex items-center flex-1 last:flex-initial">
                  <div className="flex flex-col items-center relative">
                    {/* Circle */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-base transition-colors lora ${
                      currentStep >= s.num ? "bg-[#39842B] text-white" : "bg-[#EBF5E4] text-[#39842B] border border-[#39842B]/30"
                    }`}>
                      {s.num}
                    </div>
                    {/* Label */}
                    <span className={`text-[10px] font-extrabold mt-3 whitespace-nowrap absolute top-8 transition-colors lato ${
                      currentStep === s.num ? "text-[#082042]" : "text-slate-400"
                    }`}>
                      {s.label}
                    </span>
                  </div>
                  {/* Connecting Line */}
                  {idx < steps.length - 1 && (
                    <div className={`flex-1 h-[2px] mx-2 ${
                      currentStep > s.num ? "bg-[#39842B]" : "bg-slate-200"
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step Form Rendering */}
            <div className="w-full text-left mt-4">
              
              {currentStep === 1 && (
                <StudentInfoForm
                  studentName={studentName}
                  setStudentName={setStudentName}
                  studentEmail={studentEmail}
                  setStudentEmail={setStudentEmail}
                  studentPhone={studentPhone}
                  setStudentPhone={setStudentPhone}
                  studentSchool={studentSchool}
                  setStudentSchool={setStudentSchool}
                  errors={errors}
                  setErrors={setErrors}
                  handleNext={handleNext}
                />
              )}

              {currentStep === 2 && (
                <ParentInfoForm
                  parentName={parentName}
                  setParentName={setParentName}
                  parentEmail={parentEmail}
                  setParentEmail={setParentEmail}
                  parentPhone={parentPhone}
                  setParentPhone={setParentPhone}
                  errors={errors}
                  setErrors={setErrors}
                  handleNext={handleNext}
                  handleBack={handleBack}
                />
              )}

              {currentStep === 3 && (
                <ClassSelectionForm
                  selectedClass={selectedClass}
                  setSelectedClass={setSelectedClass}
                  isDropdownOpen={isDropdownOpen}
                  setIsDropdownOpen={setIsDropdownOpen}
                  classes={classes}
                  errors={errors}
                  setErrors={setErrors}
                  handleNext={handleNext}
                  handleBack={handleBack}
                />
              )}

              {currentStep === 4 && (
                <TimeSelectionForm
                  selectedTime={selectedTime}
                  setSelectedTime={setSelectedTime}
                  timeOptions={timeOptions}
                  errors={errors}
                  setErrors={setErrors}
                  handleBack={handleBack}
                  handleFinalSubmit={() => {
                    if (validateStep(4)) {
                      handleRegisterSubmit();
                    }
                  }}
                  isLoading={isLoading}
                />
              )}

            </div>
          </div>
        ) : (
          <OtpVerificationForm email={email} onSuccess={() => setSignupStep("pricing")} />
        )}
      </AuthLayout>
    </>
  );
}
