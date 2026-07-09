import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, RotateCcw, Save } from "lucide-react";
import { createPortal } from "react-dom";
import FormInput from "../../ui/FormInput";
import FormSelect from "../../ui/FormSelect";
import { useEffect } from "react";
import offset1 from "../../constant/ofset1.json";
import offset2 from "../../constant/ofset2.json";
import { infoSchema } from "../../../lib/validation/quiz.schema";

const BOOKS = {
  "volume1": offset1,
  "volume2": offset2,
};

export default function EditQuizInfoModal({ isOpen, data, onClose, onSave }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(infoSchema),
    defaultValues: data || {
      title: "",
      classForm: "",
      duration: "",
      numQuestions: "",
      bookName: "",
      chapter: "",
      topic: "",
    },
  });

  // Keep form in sync when data updates or modal opens
  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, isOpen, reset]);

  const selectedBookName = watch("bookName");
  const selectedChapter = watch("chapter");

  // Keep dropdown options updated dynamically
  const chapters = selectedBookName ? BOOKS[selectedBookName] : [];
  const chapterObj = chapters.find((c) => c.chapter === selectedChapter);
  const topics = chapterObj ? chapterObj.topics : [];

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 select-none">
      <form
        onSubmit={handleSubmit(onSave)}
        className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-xl w-full max-w-lg relative text-left animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
      >
        {/* Modal header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4 shrink-0">
          <h3 className="text-lg font-bold text-[#0A2648] roboto">Edit Quiz Information</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal scrollable form body */}
        <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-4">
          {/* Quiz Title */}
          <FormInput
            label="Quiz Title"
            placeholder="Enter Quiz Title"
            error={errors.title}
            labelClassName="text-[#0A2648] font-bold text-sm"
            className="bg-[#F1F5FD] border-[#F1F5FD] rounded-xl text-slate-800 focus:bg-white focus:border-[#0A2648]"
            {...register("title")}
          />

          {/* Class */}
          <FormSelect
            label="Class"
            error={errors.classForm}
            labelClassName="text-[#0A2648] font-bold text-sm"
            className="bg-[#F1F5FD] border-[#F1F5FD] rounded-xl text-slate-855 focus:bg-white focus:border-[#0A2648]"
            {...register("classForm")}
          >
            <option value="">Select Class</option>
            <option value="4th">4th Grade</option>
            <option value="5th">5th Grade</option>
            <option value="6th">6th Grade</option>
            <option value="7th">7th Grade</option>
            <option value="8th">8th Grade</option>
            <option value="9th">9th Grade</option>
            <option value="10th">10th Grade</option>
          </FormSelect>

          {/* Book Name */}
          <FormSelect
            label="Book Name"
            error={errors.bookName}
            labelClassName="text-[#0A2648] font-bold text-sm"
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

          {/* Chapter */}
          <FormSelect
            label="Chapter"
            error={errors.chapter}
            labelClassName="text-[#0A2648] font-bold text-sm"
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

          {/* Topic */}
          <FormSelect
            label="Topic"
            error={errors.topic}
            labelClassName="text-[#0A2648] font-bold text-sm"
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

          {/* Duration & Questions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput
              label="Duration Time (minutes)"
              placeholder="Enter Time Duration"
              error={errors.duration}
              labelClassName="text-[#0A2648] font-bold text-sm"
              className="bg-[#F1F5FD] border-[#F1F5FD] rounded-xl text-slate-800 focus:bg-white focus:border-[#0A2648]"
              {...register("duration")}
            />

            <FormInput
              label="Number Of Questions"
              placeholder="Enter Number Of Questions"
              error={errors.numQuestions}
              labelClassName="text-[#0A2648] font-bold text-sm"
              className="bg-[#F1F5FD] border-[#F1F5FD] rounded-xl text-slate-800 focus:bg-white focus:border-[#0A2648]"
              {...register("numQuestions")}
            />
          </div>
        </div>

        {/* Modal footer buttons */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-4 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 hover:bg-slate-55 text-slate-600 rounded-lg transition-colors text-sm font-semibold cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Cancel</span>
          </button>
          <button
            type="submit"
            className="flex items-center gap-1.5 px-5 py-2 bg-[#0A2648] hover:bg-[#0A2648]/90 text-white rounded-lg transition-colors shadow-sm text-sm font-bold cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </form>
    </div>,
    document.body
  );
}
