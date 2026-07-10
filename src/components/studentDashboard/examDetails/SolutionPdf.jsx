import { useEffect, useState } from "react";
import { Download, FileText, Loader2 } from "lucide-react";

export default function SolutionPdf({ pdfUrl }) {
  const [blobUrl, setBlobUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!pdfUrl) return;

    let active = true;
    let localUrl = null;

    setTimeout(() => {
      if (active) {
        setLoading(true);
        setError(false);
      }
    }, 0);

    fetch(pdfUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch PDF");
        return res.blob();
      })
      .then((blob) => {
        if (!active) return;
        const fileBlob = new Blob([blob], { type: "application/pdf" });
        localUrl = URL.createObjectURL(fileBlob);
        setBlobUrl(localUrl);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading PDF blob:", err);
        if (active) {
          setError(true);
          setLoading(false);
        }
      });

    return () => {
      active = false;
      if (localUrl) {
        URL.revokeObjectURL(localUrl);
      }
    };
  }, [pdfUrl]);

  const handleDownloadPdf = () => {
    if (blobUrl) {
      const link = document.createElement("a");
      link.href = blobUrl;
      const filename = pdfUrl.substring(pdfUrl.lastIndexOf("/") + 1) || "exam_reference.pdf";
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (pdfUrl) {
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
      <div className="relative overflow-auto flex justify-center py-2 bg-slate-50 rounded-xl border border-slate-100 min-h-[470px] items-center px-4">
        {loading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 text-[#39842B] animate-spin" />
            <span className="text-xs text-slate-400 font-bold roboto">Loading inline viewer...</span>
          </div>
        ) : error || !blobUrl ? (
          <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-xl h-[450px] w-full border border-slate-200 shadow-sm">
            <FileText className="w-14 h-14 text-slate-300 mb-4 animate-pulse" />
            <h4 className="text-lg font-bold text-[#082042] roboto">Inline PDF Preview Blocked</h4>
            <p className="text-xs text-slate-500 mt-2 font-medium max-w-sm leading-relaxed mb-6">
              Your browser doesn't support previewing PDFs inline or the server requires downloading the document. Use the button below to view it.
            </p>
            <button
              type="button"
              onClick={handleDownloadPdf}
              className="flex items-center gap-2 bg-[#39842B] hover:bg-[#39842B]/95 text-white font-bold py-2.5 px-6 rounded-xl text-sm transition-all shadow-md active:scale-95 cursor-pointer select-none"
            >
              <Download size={16} /> Open PDF in New Tab
            </button>
          </div>
        ) : (
          <div className="w-full">
            <iframe
              src={blobUrl}
              title="Solution Reference PDF"
              className="w-full h-[450px] rounded-xl border border-slate-200 shadow-sm bg-white"
            />
          </div>
        )}
      </div>
    </div>
  );
}
