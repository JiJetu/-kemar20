import { useState } from "react";
import { Award, ChevronLeft, ChevronRight, Download, Maximize2, Minimize2 } from "lucide-react";
import { toast } from "sonner";
import { parseMathEquation } from "../../lib/utils/math";
import { ICONS } from "../../assets";

// PDF Sheet layout sample pages
const pdfPages = [
  {
    page: 1,
    title: "Choose correct answer(s) from given choice",
    items: [
      {
        num: 4,
        q: "Find factors of 9q² - 45pq + 8q - 40p:",
        options: ["a. (-5q + p)(9q + 8)", "b. (9q + 8)(q - 5p)", "c. (3p + q)(9q + 8)", "d. (-5p + q)(9q + 8)"]
      },
      {
        num: 5,
        q: "Find factors of xy - 6y - 2x + 12:",
        options: ["a. (x - 6)(y - 2)", "b. (-x - 6)(y - 2)", "c. (-x - 6)(-y - 2)", "d. (x - 6)(y + 2)"]
      },
      {
        num: 6,
        q: "Factorize (81x² - 16):",
        options: ["a. (9x - 4)(9x - 4)", "b. (x - 1)(81x - 16)", "c. (9x + 4)(9x - 4)", "d. (x + 1)(81x - 16)"]
      }
    ]
  },
  {
    page: 2,
    title: "Solving Linear Equations & System of Equations",
    items: [
      {
        num: 7,
        q: "Find value of x for 2x + 10 = 20:",
        options: ["a. x = 2", "b. x = 5", "c. x = 10", "d. x = 4"]
      },
      {
        num: 8,
        q: "Solve system: x + y = 5, x - y = 1:",
        options: ["a. (3, 2)", "b. (4, 1)", "c. (2, 3)", "d. (1, 4)"]
      }
    ]
  }
];

const SolutionPdf = ({ currentQuestionData }) => {
  const [pdfPage, setPdfPage] = useState(1);
  const [pdfZoom, setPdfZoom] = useState(100);
  const [isPdfFullscreen, setIsPdfFullscreen] = useState(false);

  const handleDownloadPdf = () => {
    toast.info("Downloading Math_Practice_Sheet.pdf...");
    toast.success("Download started successfully!");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
      
      {/* Solution Panel (md:span-4) */}
      <div className="md:col-span-4 bg-[#001131] border border-[#192B4C] rounded-[20px] p-6 flex flex-col text-left shadow-lg">
        <h3 className="text-lg font-bold text-white mb-4 border-b border-[#192B4C] pb-2 font-sans">
          Solution
        </h3>
        
        {/* Formulas List */}
        <div className="flex flex-col gap-3 items-start flex-1">
          {currentQuestionData.solution.map((step, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="text-xs text-[#5D9E32] font-sans font-bold">Step {idx + 1}:</span>
              {parseMathEquation(step, true)}
            </div>
          ))}
        </div>

        {/* Correct Banner */}
        <div className="mt-6">
          <div className="bg-[#5D9E32]/10 border border-[#5D9E32]/30 rounded-lg py-2 px-3 flex items-center justify-center gap-2 text-[#5D9E32] text-xs font-bold">
            <Award size={14} />
            <span>Correct Answer : {currentQuestionData.correctAnswer}</span>
          </div>
        </div>
      </div>

      {/* PDF Viewer Panel (md:span-8) */}
      <div className="md:col-span-8 bg-[#001131] border border-[#192B4C] rounded-[20px] p-6 flex flex-col text-left relative min-h-[300px] shadow-lg">
        <div className="flex items-center justify-between border-b border-[#192B4C] pb-3 mb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 font-sans">
            PDF Viewer <img src={ICONS.pdf} alt="pdf" className="w-6 h-6" />
          </h3>
        </div>

        {/* PDF Page layout body */}
        <div 
          className="bg-white rounded-xl p-5 text-black border border-slate-300 flex-1 flex flex-col relative overflow-hidden"
        >
          <div style={{ transform: `scale(${pdfZoom / 100})`, transformOrigin: "top center", width: "100%" }}>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest border-b pb-1 mb-3 block text-left">
              {pdfPages[pdfPage - 1]?.title || "Practice Worksheet"}
            </span>
            
            <div className="flex flex-col gap-4 overflow-y-auto max-h-[220px]">
              {pdfPages[pdfPage - 1]?.items.map((item) => (
                <div key={item.num} className="text-xs text-left">
                  <p className="font-bold text-slate-800">
                    ({item.num}) {item.q}
                  </p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-1 text-slate-600 font-medium">
                    {item.options.map((opt, idx) => (
                      <span key={idx}>{opt}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions Column floated on right */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
            <button
              type="button"
              onClick={handleDownloadPdf}
              title="Download Sheet"
              className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105"
            >
              <Download size={18} />
            </button>
            <button
              type="button"
              onClick={() => setIsPdfFullscreen(true)}
              title="Fullscreen Viewer"
              className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105"
            >
              <Maximize2 size={18} />
            </button>
          </div>
        </div>

        {/* Controls Row (Pagination and zoom) */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#192B4C] text-xs font-bold text-slate-300">
          {/* PDF Pagination */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={pdfPage === 1}
              onClick={() => setPdfPage((p) => p - 1)}
              className="p-1 rounded bg-[#010c22] border border-[#192B4C] hover:bg-slate-800 disabled:opacity-40"
            >
              <ChevronLeft size={14} />
            </button>
            <span>{pdfPage}/12</span>
            <button
              type="button"
              disabled={pdfPage === pdfPages.length}
              onClick={() => setPdfPage((p) => p + 1)}
              className="p-1 rounded bg-[#010c22] border border-[#192B4C] hover:bg-slate-800 disabled:opacity-40"
            >
              <ChevronRight size={14} />
            </button>
          </div>

          {/* PDF Zoom */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPdfZoom((z) => Math.max(z - 10, 80))}
              className="px-2 py-0.5 rounded bg-[#010c22] border border-[#192B4C] hover:bg-slate-800"
            >
              —
            </button>
            <span>{pdfZoom}%</span>
            <button
              type="button"
              onClick={() => setPdfZoom((z) => Math.min(z + 10, 120))}
              className="px-2 py-0.5 rounded bg-[#010c22] border border-[#192B4C] hover:bg-slate-800"
            >
              +
            </button>
          </div>
        </div>

      </div>

      {/* Fullscreen PDF Modal Overlay */}
      {isPdfFullscreen && (
        <div className="fixed inset-0 z-50 bg-[#020b1e]/95 backdrop-blur-sm flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-5xl bg-[#001131] border border-[#192B4C] rounded-2xl p-6 flex flex-col h-[90vh]">
            
            {/* Header controls inside fullscreen */}
            <div className="flex items-center justify-between border-b border-[#192B4C] pb-4 mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                PDF Sheet - Fullscreen
              </h3>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-xl text-sm transition-all"
                >
                  <Download size={16} /> Download
                </button>
                <button
                  type="button"
                  onClick={() => setIsPdfFullscreen(false)}
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all"
                >
                  <Minimize2 size={20} />
                </button>
              </div>
            </div>

            {/* Scaleable PDF page container */}
            <div className="flex-1 bg-white rounded-xl p-8 text-black border border-slate-300 flex flex-col items-center justify-center overflow-auto relative">
              <div 
                className="w-full max-w-2xl text-left"
                style={{ transform: `scale(${pdfZoom / 100})`, transformOrigin: "center center" }}
              >
                <span className="text-sm font-bold text-slate-500 uppercase tracking-widest border-b pb-2 mb-4 block">
                  {pdfPages[pdfPage - 1]?.title || "Practice Worksheet"}
                </span>
                
                <div className="flex flex-col gap-6">
                  {pdfPages[pdfPage - 1]?.items.map((item) => (
                    <div key={item.num} className="text-sm text-left">
                      <p className="font-bold text-slate-800 text-base">
                        ({item.num}) {item.q}
                      </p>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-2 text-slate-600 font-semibold">
                        {item.options.map((opt, idx) => (
                          <span key={idx}>{opt}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#192B4C]">
              {/* PDF Pagination */}
              <div className="flex items-center gap-2 text-slate-300 text-sm font-bold">
                <button
                  type="button"
                  disabled={pdfPage === 1}
                  onClick={() => setPdfPage((p) => p - 1)}
                  className="p-2 rounded-xl bg-[#010c22] border border-[#192B4C] hover:bg-slate-800 disabled:opacity-40"
                >
                  <ChevronLeft size={16} />
                </button>
                <span>Page {pdfPage} / 12</span>
                <button
                  type="button"
                  disabled={pdfPage === pdfPages.length}
                  onClick={() => setPdfPage((p) => p + 1)}
                  className="p-2 rounded-xl bg-[#010c22] border border-[#192B4C] hover:bg-slate-800 disabled:opacity-40"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* PDF Zoom */}
              <div className="flex items-center gap-3 text-slate-300 text-sm font-bold">
                <button
                  type="button"
                  onClick={() => setPdfZoom((z) => Math.max(z - 10, 80))}
                  className="w-8 h-8 rounded-full bg-[#010c22] border border-[#192B4C] hover:bg-slate-800 flex items-center justify-center"
                >
                  —
                </button>
                <span>{pdfZoom}%</span>
                <button
                  type="button"
                  onClick={() => setPdfZoom((z) => Math.min(z + 10, 120))}
                  className="w-8 h-8 rounded-full bg-[#010c22] border border-[#192B4C] hover:bg-slate-800 flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default SolutionPdf;
