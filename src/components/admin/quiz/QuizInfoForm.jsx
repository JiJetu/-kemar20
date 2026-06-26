import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import FormInput from "../../ui/FormInput";
import FormSelect from "../../ui/FormSelect";


const infoSchema = z.object({
  book: z.string().min(1, "Book is required"),
  chapter: z.string().min(1, "Chapter is required"),
  topic: z.string().min(1, "Topic is required"),
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
      book: "",
      chapter: "",
      topic: "",
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Book Field */}
        <FormSelect
          label="Book"
          error={errors.book}
          {...register("book")}
        >
          <option value="">Select a Book</option>
          <option value="Al-Quran">Al-Quran</option>
          <option value="Islamic History">Islamic History</option>
          <option value="Fiqh Essentials">Fiqh Essentials</option>
          <option value="Hadith Studies">Hadith Studies</option>
        </FormSelect>

        {/* Chapter Field */}
        <FormSelect
          label="Chapter"
          error={errors.chapter}
          {...register("chapter")}
        >
          <option value="">Select a Chapter</option>
          <option value="Chapter 1">Chapter 1</option>
          <option value="Chapter 2">Chapter 2</option>
          <option value="Chapter 3">Chapter 3</option>
          <option value="Chapter 4">Chapter 4</option>
          <option value="Chapter 5">Chapter 5</option>
        </FormSelect>

        {/* Topic Field */}
        <FormSelect
          label="Topic"
          error={errors.topic}
          {...register("topic")}
        >
          <option value="">Select a Topic</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Artificial Intelligence">Artificial Intelligence</option>
          <option value="Programming">Programming</option>
          <option value="Data Science">Data Science</option>
        </FormSelect>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Duration */}
        <FormInput
          label="Duration Time"
          placeholder="e.g. 1 Hour"
          error={errors.duration}
          {...register("duration")}
        />

        {/* Number of Questions */}
        <FormInput
          label="Number Of Questions"
          placeholder="e.g. 20"
          error={errors.numQuestions}
          {...register("numQuestions")}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-[#082042] hover:bg-[#0c2f5d] text-white font-bold py-3.5 px-4 rounded-xl shadow-sm transition-all focus:outline-none mt-2 roboto text-center leading-none cursor-pointer"
      >
        Generate Quiz With AI
      </button>
    </form>
  );
}
