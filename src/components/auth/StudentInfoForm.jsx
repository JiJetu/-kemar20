import FormInput from "../ui/FormInput";
import { ArrowRight } from "lucide-react";

export default function StudentInfoForm({
  studentName,
  setStudentName,
  studentEmail,
  setStudentEmail,
  studentPhone,
  setStudentPhone,
  studentSchool,
  setStudentSchool,
  errors,
  setErrors,
  handleNext,
}) {
  return (
    <div className="flex flex-col gap-4 animate-in fade-in duration-300">
      <div>
        <h3 className="text-2xl font-extrabold text-[#082042] lora">Student Information</h3>
        <p className="text-slate-400 text-xs font-semibold mt-1">Please Provide Your Basic Information To Get Started</p>
      </div>

      <FormInput
        label="Full Name"
        placeholder="Enter your full name"
        value={studentName}
        onChange={(e) => {
          setStudentName(e.target.value);
          if (errors.studentName) setErrors({ ...errors, studentName: "" });
        }}
        error={errors.studentName ? { message: errors.studentName } : null}
      />

      <FormInput
        label="Email Address"
        placeholder="Enter your email address"
        type="email"
        value={studentEmail}
        onChange={(e) => {
          setStudentEmail(e.target.value);
          if (errors.studentEmail) setErrors({ ...errors, studentEmail: "" });
        }}
        error={errors.studentEmail ? { message: errors.studentEmail } : null}
      />

      <FormInput
        label="Contact Number"
        placeholder="Enter Your Phone Number"
        value={studentPhone}
        onChange={(e) => {
          setStudentPhone(e.target.value);
          if (errors.studentPhone) setErrors({ ...errors, studentPhone: "" });
        }}
        error={errors.studentPhone ? { message: errors.studentPhone } : null}
      />

      <FormInput
        label="Current School"
        placeholder="Enter Your Current School"
        value={studentSchool}
        onChange={(e) => {
          setStudentSchool(e.target.value);
          if (errors.studentSchool) setErrors({ ...errors, studentSchool: "" });
        }}
        error={errors.studentSchool ? { message: errors.studentSchool } : null}
      />

      <button
        type="button"
        onClick={handleNext}
        className="w-full bg-[#39842B] hover:bg-[#39842B]/95 text-white py-3.5 mt-2 rounded-[8px] font-bold text-sm tracking-wider transition-all flex items-center justify-center gap-1.5 active:scale-[0.98]"
      >
        <span>Next</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
