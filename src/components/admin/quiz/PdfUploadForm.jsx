import { useState, useRef } from "react";
import { UploadCloud, CheckCircle2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { ICONS } from "../../../assets/index";

export default function PdfUploadForm({ onSubmitFile, defaultFile }) {
  const [file, setFile] = useState(defaultFile || null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

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
    if (selectedFile.size > 10 * 1024 * 1024) {
      toast.error("File size must be up to 10 MB.");
      return;
    }
    setFile(selectedFile);
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes) => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)} Mb`;
  };

  const handleUploadSubmit = () => {
    if (!file) {
      toast.error("Please select a PDF file first.");
      return;
    }
    onSubmitFile(file);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-[20px] p-8 shadow-sm flex flex-col gap-6 text-left w-full max-w-7xl mx-auto animate-in fade-in duration-300">
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-bold text-[#082042] roboto">Upload Previous Exam Pdf</h3>
        <p className="text-slate-400 text-sm lato">Upload A Previous Exam Pdf</p>
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
            ? "border-[#0A2648] bg-slate-50"
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

        {/* Custom Upload Icon Circle matching image */}
        <div className="w-12 h-12 rounded-full border border-[#0A2648]/20 flex items-center justify-center bg-white text-[#0A2648] mb-3">
          <UploadCloud className="w-6 h-6" />
        </div>
        <span className="font-bold text-slate-800 text-sm md:text-base roboto">
          Drag And Drop PDF Files Here
        </span>
        <span className="text-slate-400 text-xs my-1.5 lato">Or</span>
        <button
          type="button"
          className="bg-[#0A2648] hover:bg-[#0A2648]/90 text-white font-semibold px-6 py-2 rounded-[6px] text-sm shadow-sm transition-colors"
        >
          Choose PDF File
        </button>
        <span className="text-slate-400 text-xs mt-3.5 lato">
          PDF, up to 10 MB each
        </span>
      </div>

      {/* Uploaded File Preview */}
      {file && (
        <div className="bg-[#F1F5FD] border border-slate-200/50 rounded-xl p-4 flex items-center justify-between shadow-sm animate-in fade-in duration-200">
          <div className="flex items-center gap-3">
            <img src={ICONS.pdf} alt="PDF icon" className="w-8 h-8 object-contain shrink-0" />
            <div className="flex flex-col">
              <span className="font-bold text-slate-800 text-sm truncate max-w-[200px] sm:max-w-[400px] roboto">
                {file.name}
              </span>
              <span className="text-slate-400 text-xs lato mt-0.5 font-medium">
                {formatFileSize(file.size)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center border border-green-200">
              <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
            </div>
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

      {/* Upload & Continue Submit Button */}
      <button
        type="button"
        onClick={handleUploadSubmit}
        className="w-full bg-[#0A2648] hover:bg-[#0A2648]/90 text-white font-bold py-3.5 px-4 rounded-xl shadow-sm transition-all focus:outline-none mt-2 roboto text-center leading-none"
      >
        Upload & Continue
      </button>
    </div>
  );
}
