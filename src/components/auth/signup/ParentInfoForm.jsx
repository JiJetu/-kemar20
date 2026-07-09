import FormInput from "../../ui/FormInput";

export default function ParentInfoForm({
  parentName,
  setParentName,
  parentEmail,
  setParentEmail,
  parentPhone,
  setParentPhone,
  errors,
  setErrors,
  handleNext,
  handleBack,
}) {
  return (
    <div className="flex flex-col gap-4 animate-in fade-in duration-300">
      <div>
        <h3 className="text-2xl font-extrabold text-[#082042] lora">Parent Information</h3>
        <p className="text-slate-400 text-xs font-semibold mt-1">Please Provide Your Parent/Guardian Details</p>
      </div>

      <FormInput
        label="Parent Full Name"
        placeholder="Enter parent full name"
        value={parentName}
        onChange={(e) => {
          setParentName(e.target.value);
          if (errors.parentName) setErrors({ ...errors, parentName: "" });
        }}
        error={errors.parentName ? { message: errors.parentName } : null}
      />

      <FormInput
        label="Parent Email Address"
        placeholder="Enter parent email address"
        type="email"
        value={parentEmail}
        onChange={(e) => {
          setParentEmail(e.target.value);
          if (errors.parentEmail) setErrors({ ...errors, parentEmail: "" });
        }}
        error={errors.parentEmail ? { message: errors.parentEmail } : null}
      />

      <FormInput
        label="Parent Contact Number"
        placeholder="Enter Parent Phone Number"
        value={parentPhone}
        onChange={(e) => {
          setParentPhone(e.target.value);
          if (errors.parentPhone) setErrors({ ...errors, parentPhone: "" });
        }}
        error={errors.parentPhone ? { message: errors.parentPhone } : null}
      />

      <div className="flex items-center gap-4 mt-2 w-full">
        <button
          type="button"
          onClick={handleBack}
          className="flex-1 border border-slate-200 text-[#082042] hover:bg-slate-50 py-3.5 rounded-[8px] font-bold text-sm transition-all flex items-center justify-center gap-1 active:scale-[0.98] roboto"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="flex-1 bg-[#39842B] hover:bg-[#39842B]/95 text-white py-3.5 rounded-[8px] font-bold text-sm transition-all flex items-center justify-center gap-1.5 active:scale-[0.98] roboto"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
