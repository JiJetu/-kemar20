import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const infoSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  duration: z.string().min(1, "Duration is required"),
  numQuestions: z
    .string()
    .min(1, "Number of questions is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Questions must be a number greater than 0",
    }),
});

export default function QuizInfoForm({ onSubmitData, defaultValues }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(infoSchema),
    defaultValues: defaultValues || {
      subject: "",
      duration: "1 Hour",
      numQuestions: "20",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmitData)}
      className="bg-white border border-slate-200 rounded-[20px] p-8 shadow-sm flex flex-col gap-6 text-left w-full max-w-5xl mx-auto animate-in fade-in duration-300"
    >
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-bold text-[#082042] roboto">Quiz Information</h3>
        <p className="text-slate-400 text-sm lato">Provide Basic Information About The Quiz</p>
      </div>

      {/* Subject Field */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold text-slate-700 roboto">Subject</label>
        <select
          {...register("subject")}
          className={`w-full bg-[#F0F4FA] border border-slate-200 rounded-lg px-4 py-3 text-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-[#082042]/30 roboto ${
            errors.subject ? "border-red-300 focus:ring-red-200" : ""
          }`}
        >
          <option value="">Select a Subject</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Artificial Intelligence">Artificial Intelligence</option>
          <option value="Programming">Programming</option>
          <option value="Data Science">Data Science</option>
        </select>
        {errors.subject && (
          <span className="text-red-500 text-xs font-semibold">{errors.subject.message}</span>
        )}
      </div>

      {/* Duration and Number of Questions Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Duration */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-slate-700 roboto">Duration Time</label>
          <input
            type="text"
            placeholder="1 Hour"
            {...register("duration")}
            className={`w-full bg-[#F0F4FA] border border-slate-200 rounded-lg px-4 py-3 text-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-[#082042]/30 roboto ${
              errors.duration ? "border-red-300" : ""
            }`}
          />
          {errors.duration && (
            <span className="text-red-500 text-xs font-semibold">{errors.duration.message}</span>
          )}
        </div>

        {/* Number of Questions */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-slate-700 roboto">Number Of Questions</label>
          <input
            type="text"
            placeholder="20"
            {...register("numQuestions")}
            className={`w-full bg-[#F0F4FA] border border-slate-200 rounded-lg px-4 py-3 text-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-[#082042]/30 roboto ${
              errors.numQuestions ? "border-red-300" : ""
            }`}
          />
          {errors.numQuestions && (
            <span className="text-red-500 text-xs font-semibold">{errors.numQuestions.message}</span>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-[#082042] hover:bg-[#0c2f5d] text-white font-bold py-3.5 px-4 rounded-xl shadow-sm transition-all focus:outline-none mt-2 roboto text-center leading-none"
      >
        Generate Quiz With AI
      </button>
    </form>
  );
}
