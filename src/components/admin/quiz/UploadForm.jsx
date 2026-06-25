import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadCloud, CheckCircle2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { uploadQuizSchema } from "../../../lib/validation/quiz.schema";
import { ICONS } from "../../../assets/index";

export default function UploadForm({ onSubmitData }) {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(uploadQuizSchema),
    defaultValues: {
      pdfFile: null,
      subject: "",
      date: new Date().toISOString().split("T")[0],
      duration: "1 Hour",
      numQuestions: "20",
    },
  });

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      handleFileSelection(droppedFile);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      handleFileSelection(selectedFile);
    }
  };

  const handleFileSelection = (selectedFile) => {
    if (selectedFile.type !== "application/pdf" && !selectedFile.name.toLowerCase().endsWith(".pdf")) {
      toast.error("Only PDF files are allowed.");
      return;
    }
    setFile(selectedFile);
    setValue("pdfFile", selectedFile, { shouldValidate: true });
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setFile(null);
    setValue("pdfFile", null, { shouldValidate: true });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onFormSubmit = (data) => {
    onSubmitData({
      ...data,
      file,
    });
  };

  const formatFileSize = (bytes) => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)} Mb`;
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-sm flex flex-col gap-6 text-left max-w-5xl mx-auto w-full">
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-bold text-[#082042] roboto">Upload PDF</h3>
        <p className="text-slate-400 text-sm lato">Upload a PDF document to generate an ai-powered quiz.</p>
      </div>

      {/* Drag & Drop Area */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all ${
          dragActive
            ? "border-[#082042] bg-slate-50"
            : errors.pdfFile
            ? "border-red-300 bg-red-50/10 hover:bg-red-50/20"
            : "border-slate-300 bg-slate-50/50 hover:bg-slate-50"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
        />

        <UploadCloud className="w-10 h-10 text-[#082042] mb-3" />
        <span className="font-bold text-slate-800 text-sm md:text-base roboto">
          Drag And Drop PDF Files Here
        </span>
        <span className="text-slate-400 text-xs my-1 lato">Or</span>
        <button
          type="button"
          className="bg-[#082042] hover:bg-[#0c2f5d] text-white font-semibold px-6 py-2 rounded-[6px] text-sm shadow-sm transition-colors"
        >
          Choose PDF File
        </button>
        <span className="text-slate-400 text-xs mt-3 lato">
          PDF, up to 10 MB each
        </span>
      </div>

      {/* File validation error */}
      {errors.pdfFile && (
        <span className="text-red-500 text-xs font-semibold -mt-3">
          {errors.pdfFile.message}
        </span>
      )}

      {/* Uploaded File Preview */}
      {file && (
        <div className="bg-[#F0F4FA] border border-slate-200 rounded-xl p-4 flex items-center justify-between shadow-sm animate-in fade-in duration-200">
          <div className="flex items-center gap-3">
            <img src={ICONS.pdf} alt="PDF icon" className="w-8 h-8 object-contain shrink-0" />
            <div className="flex flex-col">
              <span className="font-bold text-slate-800 text-sm truncate max-w-[220px] md:max-w-[400px] roboto">
                {file.name}
              </span>
              <span className="text-slate-400 text-xs lato mt-0.5 font-medium">
                {formatFileSize(file.size)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
            <button
              type="button"
              onClick={handleRemoveFile}
              className="p-1 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Subject Field */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold text-slate-700 roboto">Subject</label>
        <input
          type="text"
          placeholder="Enter Your Full Name"
          {...register("subject")}
          className={`w-full bg-[#F0F4FA] border border-slate-200 rounded-lg px-4 py-3 text-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-[#082042]/30 roboto ${
            errors.subject ? "border-red-300" : ""
          }`}
        />
        {errors.subject && (
          <span className="text-red-500 text-xs font-semibold">
            {errors.subject.message}
          </span>
        )}
      </div>

      {/* Date Picker Field */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold text-slate-700 roboto">Date</label>
        <input
          type="date"
          {...register("date")}
          className={`w-full bg-[#F0F4FA] border border-slate-200 rounded-lg px-4 py-3 text-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-[#082042]/30 roboto ${
            errors.date ? "border-red-300" : ""
          }`}
        />
        {errors.date && (
          <span className="text-red-500 text-xs font-semibold">
            {errors.date.message}
          </span>
        )}
      </div>

      {/* Duration and Number of Questions Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <span className="text-red-500 text-xs font-semibold">
              {errors.duration.message}
            </span>
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
            <span className="text-red-500 text-xs font-semibold">
              {errors.numQuestions.message}
            </span>
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
