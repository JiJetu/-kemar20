import { useState, useRef, useEffect } from "react";
import { X, UploadCloud, CheckCircle2, Trash2, RotateCcw, Save } from "lucide-react";
import { toast } from "sonner";
import { createPortal } from "react-dom";
import { ICONS } from "../../../assets/index";

export default function EditPdfModal({ isOpen, currentFile, onClose, onSave }) {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setFile(currentFile || null);
    }
  }, [currentFile, isOpen]);

  if (!isOpen) return null;

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

  const handleModalSave = () => {
    if (!file) {
      toast.error("Please select a PDF file first.");
      return;
    }
    onSave(file);
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 select-none">
      <div className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-xl w-full max-w-lg relative text-left animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Modal header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4 shrink-0">
          <h3 className="text-lg font-bold text-[#0A2648] roboto">Upload New Exam PDF</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal form body */}
        <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-4">
          
          {/* Drag & Drop Area */}
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all ${
              dragActive
                ? "border-[#0A2648] bg-slate-50"
                : "border-slate-300 bg-slate-50/50 hover:bg-slate-55"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />

            <div className="w-10 h-10 rounded-full border border-[#0A2648]/20 flex items-center justify-center bg-white text-[#0A2648] mb-2">
              <UploadCloud className="w-5 h-5" />
            </div>
            <span className="font-bold text-slate-800 text-sm roboto text-center">
              Drag And Drop PDF File Here
            </span>
            <span className="text-slate-400 text-xs my-1 lato">Or</span>
            <button
              type="button"
              className="bg-[#0A2648] hover:bg-[#0A2648]/90 text-white font-semibold px-4 py-1.5 rounded-[6px] text-xs shadow-sm transition-colors"
            >
              Choose PDF File
            </button>
            <span className="text-slate-400 text-[10px] mt-2 lato">
              PDF, up to 10 MB
            </span>
          </div>

          {/* Uploaded File Preview */}
          {file && (
            <div className="bg-[#F1F5FD] border border-slate-200/50 rounded-xl p-3 flex items-center justify-between shadow-sm animate-in fade-in duration-200">
              <div className="flex items-center gap-3">
                <img src={ICONS.pdf} alt="PDF icon" className="w-7 h-7 object-contain shrink-0" />
                <div className="flex flex-col text-left">
                  <span className="font-bold text-slate-800 text-xs truncate max-w-[180px] sm:max-w-[260px] roboto">
                    {file.name}
                  </span>
                  <span className="text-slate-400 text-[10px] lato mt-0.5 font-medium">
                    {formatFileSize(file.size)}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-green-50 flex items-center justify-center border border-green-200">
                  <CheckCircle2 className="w-3 h-3 text-green-600 shrink-0" />
                </div>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="p-1 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-650 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

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
            type="button"
            onClick={handleModalSave}
            className="flex items-center gap-1.5 px-5 py-2 bg-[#0A2648] hover:bg-[#0A2648]/90 text-white rounded-lg transition-colors shadow-sm text-sm font-bold cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
