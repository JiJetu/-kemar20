import { Download, FileText } from "lucide-react";

export default function SolutionPdf({ pdfUrl }) {
  const handleDownloadPdf = () => {
    if (pdfUrl) {
      window.open(pdfUrl, "_blank");
    }
  };

  if (!pdfUrl) {
    return (
      <div className="bg-white border border-slate-200 rounded-[20px] p-8 flex flex-col items-center justify-center text-center shadow-sm w-full min-h-[180px]">
        <FileText className="w-12 h-12 text-slate-300 mb-3" />
        <h4 className="text-base font-bold text-slate-700 roboto">No Reference PDF Available</h4>
        <p className="text-xs text-slate-400 mt-1 font-medium max-w-xs leading-relaxed">
          No solution or reference PDF paper is available for this practice session.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-[20px] p-6 flex flex-col text-left shadow-sm w-full gap-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <h3 className="text-lg font-bold text-[#082042] flex items-center gap-2 roboto">
          Previous Exam Papers
          <span className="text-base text-red-500"><FileText size={18} /></span>
        </h3>
        <button
          type="button"
          onClick={handleDownloadPdf}
          className="flex items-center gap-2 bg-[#39842B] hover:bg-[#39842B]/90 text-white font-bold py-1.5 px-4 rounded-xl text-xs transition-all shadow-sm active:scale-95 cursor-pointer select-none"
        >
          <Download size={14} /> Download PDF
        </button>
      </div>

      {/* Sheet Content Viewer wrapper */}
      <div className="relative overflow-auto flex justify-center py-2 bg-slate-50 rounded-xl border border-slate-100 min-h-[300px] items-center px-4">
        <div className="w-full">
          <iframe
            src={pdfUrl}
            title="Solution Reference PDF"
            className="w-full h-[450px] rounded-xl border border-slate-200 shadow-sm bg-white"
          />
        </div>
      </div>
    </div>
  );
}
