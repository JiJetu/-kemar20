import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../../ui/FormInput";
import FormSelect from "../../ui/FormSelect";
import offset1 from "../../constant/ofset1.json";
import offset2 from "../../constant/ofset2.json";
import { infoSchema } from "../../../lib/validation/quiz.schema";

const BOOKS = {
  "volume1": offset1,
  "volume2": offset2,
};

export default function QuizInfoForm({ onSubmitData, defaultValues }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(infoSchema),
    defaultValues: defaultValues || {
      title: "",
      classForm: "",
      duration: "",
      numQuestions: "",
      bookName: "",
      chapter: "",
      topic: "",
    },
  });

  const selectedBookName = watch("bookName");
  const selectedChapter = watch("chapter");

  // Keep dropdown options updated dynamically
  const chapters = selectedBookName ? BOOKS[selectedBookName] : [];
  const chapterObj = chapters.find((c) => c.chapter === selectedChapter);
  const topics = chapterObj ? chapterObj.topics : [];

  return (
    <form
      onSubmit={handleSubmit(onSubmitData)}
      className="bg-white border border-slate-200 rounded-[20px] p-8 shadow-sm flex flex-col gap-6 text-left w-full max-w-7xl mx-auto animate-in fade-in duration-300"
    >
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-bold text-[#082042] roboto">Quiz Information</h3>
        <p className="text-slate-400 text-sm lato">Provide Basic Information About The Quiz</p>
      </div>

      <div className="flex flex-col gap-5">
        {/* Quiz Title */}
        <FormInput
          label="Quiz Title"
          placeholder="Enter Quiz Title"
          error={errors.title}
          labelClassName="text-[#0A2648] font-bold text-base"
          className="bg-[#F1F5FD] border-[#F1F5FD] rounded-xl text-slate-800 focus:bg-white focus:border-[#0A2648]"
          {...register("title")}
        />

        {/* Class */}
        <FormSelect
          label="Class"
          error={errors.classForm}
          labelClassName="text-[#0A2648] font-bold text-base"
          className="bg-[#F1F5FD] border-[#F1F5FD] rounded-xl text-slate-855 focus:bg-white focus:border-[#0A2648]"
          {...register("classForm")}
        >
          <option value="">Select Class</option>
          <option value="4th">4th Grade</option>
          <option value="5th">5th Grade</option>
        </FormSelect>

        {/* Book Name selection */}
        <FormSelect
          label="Book Name"
          error={errors.bookName}
          labelClassName="text-[#0A2648] font-bold text-base"
          className="bg-[#F1F5FD] border-[#F1F5FD] rounded-xl text-slate-855 focus:bg-white focus:border-[#0A2648]"
          {...register("bookName", {
            onChange: () => {
              setValue("chapter", "");
              setValue("topic", "");
            },
          })}
        >
          <option value="">Select Book</option>
          <option value="volume1">
            Mathematics-a-Complete-Course-With-CXC-Questions-Volume-1
          </option>
          <option value="volume2">
            Mathematics-a-Complete-Course-With-CXC-Questions-Volume-2
          </option>
        </FormSelect>

        {/* Chapter Selection based on Book */}
        <FormSelect
          label="Chapter"
          error={errors.chapter}
          labelClassName="text-[#0A2648] font-bold text-base"
          className="bg-[#F1F5FD] border-[#F1F5FD] rounded-xl text-slate-855 focus:bg-white focus:border-[#0A2648]"
          {...register("chapter", {
            onChange: () => {
              setValue("topic", "");
            },
          })}
          disabled={!selectedBookName}
        >
          <option value="">Select Chapter</option>
          {chapters.map((ch) => (
            <option key={ch.chapter} value={ch.chapter}>
              {ch.chapter}
            </option>
          ))}
        </FormSelect>

        {/* Topic Selection based on Chapter */}
        <FormSelect
          label="Topic"
          error={errors.topic}
          labelClassName="text-[#0A2648] font-bold text-base"
          className="bg-[#F1F5FD] border-[#F1F5FD] rounded-xl text-slate-855 focus:bg-white focus:border-[#0A2648]"
          {...register("topic")}
          disabled={!selectedChapter}
        >
          <option value="">Select Topic</option>
          {topics.map((tp) => (
            <option key={tp.topic} value={tp.topic}>
              {tp.topic}
            </option>
          ))}
        </FormSelect>

        {/* Duration & Questions Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormInput
            label="Duration Time (minutes)"
            placeholder="Enter Time Duration"
            error={errors.duration}
            labelClassName="text-[#0A2648] font-bold text-base"
            className="bg-[#F1F5FD] border-[#F1F5FD] rounded-xl text-slate-800 focus:bg-white focus:border-[#0A2648]"
            {...register("duration")}
          />

          <FormInput
            label="Number Of Questions"
            placeholder="Enter Number Of Questions"
            error={errors.numQuestions}
            labelClassName="text-[#0A2648] font-bold text-base"
            className="bg-[#F1F5FD] border-[#F1F5FD] rounded-xl text-slate-800 focus:bg-white focus:border-[#0A2648]"
            {...register("numQuestions")}
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-[#0A2648] hover:bg-[#0A2648]/90 text-white font-bold py-4 px-4 rounded-xl shadow-sm transition-all focus:outline-none mt-4 roboto text-center leading-none cursor-pointer"
      >
        Generate Quiz With AI
      </button>
    </form>
  );
}
