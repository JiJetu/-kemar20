import { useState } from "react";
import {
  Download,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  FileText,
} from "lucide-react";
import { toast } from "sonner";

const SolutionPdf = () => {
  const [pdfZoom, setPdfZoom] = useState(100);
  const [isPdfFullscreen, setIsPdfFullscreen] = useState(false);
  const [pdfPage, setPdfPage] = useState(1);

  const handleDownloadPdf = () => {
    toast.info("Downloading Coordinate_Geometry_Grade_9_CBSE.pdf...");
    setTimeout(() => {
      toast.success("Download completed successfully!");
    }, 1000);
  };

  const renderCheatSheet = (isFullscreen = false) => {
    return (
      <div 
        className="w-full border border-slate-200 rounded-[20px] p-6 bg-[#FCFDFE] relative flex flex-col md:flex-row gap-6 items-stretch shadow-inner overflow-hidden select-none"
        style={{
          transform: isFullscreen ? `scale(${pdfZoom / 100})` : `scale(${pdfZoom / 100})`,
          transformOrigin: "center center",
          transition: "transform 0.2s ease-out",
        }}
      >
        {/* Left: Educational Text Content */}
        <div className="flex-1 flex flex-col gap-4 text-left justify-between">
          <div className="flex flex-col">
            <h2 className="text-2xl md:text-[32px] font-extrabold text-[#3F5475] tracking-wider roboto uppercase text-center border-b border-slate-200 pb-2">
              Coordinate Geometry
            </h2>
            <div className="text-center font-bold text-slate-400 text-xs tracking-widest mt-1 lato">
              GRADE 9 - CBSE
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {/* Introduction Card */}
            <div className="bg-[#FAFBFD] border border-slate-100 rounded-xl p-4 flex flex-col gap-2 shadow-sm">
              <h4 className="text-[#3F5475] font-bold text-sm flex items-center gap-2 roboto">
                <span className="w-5 h-5 rounded-full bg-[#E5ECF6] text-[#3F5475] flex items-center justify-center text-xs font-bold font-mono">1</span>
                INTRODUCTION
              </h4>
              <p className="text-xs text-[#5C6B73] font-medium leading-relaxed lato mt-1">
                Coordinate Geometry helps us locate points on a plane using numbers.
                <span className="block my-2" />
                Was introduced by <strong className="text-red-500 font-semibold">René Descartes</strong>.
                <span className="block my-2" />
                A plane containing two number lines at right angles is called the <strong className="text-[#3F5475] font-semibold">Cartesian Plane</strong>.
              </p>
            </div>

            {/* Cartesian Plane Card */}
            <div className="bg-[#FAFBFD] border border-slate-100 rounded-xl p-4 flex flex-col gap-2 shadow-sm">
              <h4 className="text-[#3F5475] font-bold text-sm flex items-center gap-2 roboto">
                <span className="w-5 h-5 rounded-full bg-[#E5ECF6] text-[#3F5475] flex items-center justify-center text-xs font-bold font-mono">2</span>
                CARTESIAN PLANE
              </h4>
              <p className="text-xs text-[#5C6B73] font-medium leading-relaxed lato mt-1">
                It has two perpendicular axes:
                <span className="block mt-1 font-semibold text-slate-700">
                  • X-axis &rarr; Horizontal line
                </span>
                <span className="block font-semibold text-slate-700">
                  • Y-axis &rarr; Vertical line
                </span>
                They intersect at a point called <strong className="text-[#3F5475] font-semibold">Origin</strong>.
                <span className="block my-1.5" />
                Origin coordinates = <span className="bg-[#E5ECF6] text-[#3F5475] px-1.5 py-0.5 rounded font-mono font-bold text-xs">(0,0)</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right: Cartesian Grid Graphic */}
        <div className="w-full md:w-[260px] shrink-0 border border-slate-200 bg-white rounded-xl p-6 flex items-center justify-center relative shadow-sm min-h-[220px]">
          {/* Grid lines (Decorative) */}
          <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-60"></div>
          
          {/* Coordinate Axes */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-4">
            {/* X-Axis Line */}
            <div className="w-[85%] h-[1.5px] bg-[#3F5475] relative">
              <div className="absolute -right-1 -top-[3.5px] w-2.5 h-2.5 border-t-2 border-r-2 border-[#3F5475] transform rotate-45"></div>
              <div className="absolute -left-1.5 -top-[3.5px] w-2.5 h-2.5 border-b-2 border-l-2 border-[#3F5475] transform rotate-45"></div>
              <span className="absolute -right-2 -top-5 text-[11px] font-extrabold text-[#3F5475]">X</span>
              <span className="absolute -left-2 -top-5 text-[11px] font-extrabold text-[#3F5475]">X'</span>
            </div>
            {/* Y-Axis Line */}
            <div className="h-[85%] w-[1.5px] bg-[#3F5475] relative">
              <div className="absolute -top-1.5 -left-[3.5px] w-2.5 h-2.5 border-t-2 border-l-2 border-[#3F5475] transform rotate-45"></div>
              <div className="absolute -bottom-1 -left-[3.5px] w-2.5 h-2.5 border-b-2 border-r-2 border-[#3F5475] transform rotate-45"></div>
              <span className="absolute left-3 -top-1.5 text-[11px] font-extrabold text-[#3F5475]">Y</span>
              <span className="absolute left-3 bottom-0.5 text-[11px] font-extrabold text-[#3F5475]">Y'</span>
            </div>
            
            {/* Origin Center Point */}
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 z-10 border border-white shadow-[0_1px_3px_rgba(0,0,0,0.3)]"></div>
            <span className="absolute text-[10px] font-bold text-red-500 translate-x-7 translate-y-3 bg-white/80 px-1 rounded">O (0,0)</span>
            
            {/* Quadrants Texts */}
            <div className="absolute top-6 left-6 text-center bg-white/70 px-1 py-0.5 rounded">
              <div className="text-xs font-extrabold text-[#3F5475]">II</div>
              <div className="text-[9px] font-bold text-slate-500">(-, +)</div>
            </div>
            <div className="absolute top-6 right-6 text-center bg-white/70 px-1 py-0.5 rounded">
              <div className="text-xs font-extrabold text-[#3F5475]">I</div>
              <div className="text-[9px] font-bold text-slate-500">(+, +)</div>
            </div>
            <div className="absolute bottom-6 left-6 text-center bg-white/70 px-1 py-0.5 rounded">
              <div className="text-xs font-extrabold text-[#3F5475]">III</div>
              <div className="text-[9px] font-bold text-slate-500">(-, -)</div>
            </div>
            <div className="absolute bottom-6 right-6 text-center bg-white/70 px-1 py-0.5 rounded">
              <div className="text-xs font-extrabold text-[#3F5475]">IV</div>
              <div className="text-[9px] font-bold text-slate-500">(+, -)</div>
            </div>
          </div>
        </div>

        {/* Superimposed Floating action buttons */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
          <button
            type="button"
            onClick={handleDownloadPdf}
            title="Download Document"
            className="w-10 h-10 rounded-full bg-[#082042] hover:bg-[#1C398E] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105"
          >
            <Download size={18} />
          </button>
          {!isFullscreen && (
            <button
              type="button"
              onClick={() => setIsPdfFullscreen(true)}
              title="Fullscreen"
              className="w-10 h-10 rounded-full bg-[#082042] hover:bg-[#1C398E] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105"
            >
              <Maximize2 size={18} />
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white border border-slate-200 rounded-[20px] p-6 flex flex-col text-left shadow-md w-full">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
        <h3 className="text-lg font-bold text-[#082042] flex items-center gap-2 roboto">
          Previous Exam Papers
          <span className="text-base text-red-500"><FileText size={18} /></span>
        </h3>
      </div>

      {/* Sheet Content Viewer wrapper with scaling bounds */}
      <div className="relative overflow-auto flex justify-center py-2 bg-slate-50 rounded-xl border border-slate-100 min-h-[300px] items-center px-4">
        <div className="w-full max-w-4xl">
          {renderCheatSheet(false)}
        </div>
      </div>

      {/* Controls Row (Pagination and zoom) */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-200 text-xs font-bold text-slate-600">
        
        {/* Pagination mock controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={pdfPage === 1}
            onClick={() => setPdfPage((p) => Math.max(1, p - 1))}
            className="p-1 rounded bg-slate-50 border border-slate-200 hover:bg-slate-200 text-slate-800 disabled:opacity-40"
          >
            <ChevronLeft size={14} />
          </button>
          <span className="font-mono">{pdfPage} / 12</span>
          <button
            type="button"
            disabled={pdfPage === 12}
            onClick={() => setPdfPage((p) => Math.min(12, p + 1))}
            className="p-1 rounded bg-slate-50 border border-slate-200 hover:bg-slate-200 text-slate-800 disabled:opacity-40"
          >
            <ChevronRight size={14} />
          </button>
        </div>

        {/* Zoom adjustment triggers */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPdfZoom((z) => Math.max(z - 10, 80))}
            className="px-2 py-0.5 rounded bg-slate-50 border border-slate-200 hover:bg-slate-200 text-slate-800 font-bold"
          >
            —
          </button>
          <span className="font-mono text-slate-800">{pdfZoom}%</span>
          <button
            type="button"
            onClick={() => setPdfZoom((z) => Math.min(z + 10, 120))}
            className="px-2 py-0.5 rounded bg-slate-50 border border-slate-200 hover:bg-slate-200 text-slate-800 font-bold"
          >
            +
          </button>
        </div>
      </div>

      {/* Fullscreen Viewer Modal */}
      {isPdfFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-5xl bg-white border border-slate-200 rounded-2xl p-6 flex flex-col h-[90vh] shadow-2xl">
            {/* Header controls inside fullscreen */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
              <h3 className="text-lg font-bold text-[#082042] flex items-center gap-2">
                Previous Exam Papers - CBSE Grade 9
              </h3>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  className="flex items-center gap-2 bg-[#082042] hover:bg-[#1C398E] text-white font-bold py-2 px-4 rounded-xl text-sm transition-all"
                >
                  <Download size={16} /> Download
                </button>
                <button
                  type="button"
                  onClick={() => setIsPdfFullscreen(false)}
                  className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl transition-all"
                >
                  <Minimize2 size={20} />
                </button>
              </div>
            </div>

            {/* Scaleable PDF page container */}
            <div className="flex-1 bg-slate-100 rounded-xl p-8 text-black border border-slate-200 flex flex-col items-center justify-center overflow-auto relative">
              <div className="w-full max-w-4xl">
                {renderCheatSheet(true)}
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-200">
              <div className="flex items-center gap-2 text-slate-700 text-sm font-bold">
                <button
                  type="button"
                  disabled={pdfPage === 1}
                  onClick={() => setPdfPage((p) => Math.max(1, p - 1))}
                  className="p-2 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-200 text-slate-800 disabled:opacity-40"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="font-mono">Page {pdfPage} / 12</span>
                <button
                  type="button"
                  disabled={pdfPage === 12}
                  onClick={() => setPdfPage((p) => Math.min(12, p + 1))}
                  className="p-2 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-200 text-slate-800 disabled:opacity-40"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              <div className="flex items-center gap-3 text-slate-700 text-sm font-bold">
                <button
                  type="button"
                  onClick={() => setPdfZoom((z) => Math.max(z - 10, 80))}
                  className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 hover:bg-slate-200 flex items-center justify-center text-slate-800"
                >
                  —
                </button>
                <span className="font-mono text-slate-800">{pdfZoom}%</span>
                <button
                  type="button"
                  onClick={() => setPdfZoom((z) => Math.min(z + 10, 120))}
                  className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 hover:bg-slate-200 flex items-center justify-center text-slate-800"
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
