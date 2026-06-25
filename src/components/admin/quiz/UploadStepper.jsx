import { ChevronRight, UploadCloud, Brain, LayoutGrid, FileSearch } from "lucide-react";

export default function UploadStepper({ currentStep }) {
  const steps = [
    {
      id: 1,
      title: "Upload PDF",
      subtitle: "Upload your quiz PDF",
      icon: UploadCloud,
    },
    {
      id: 2,
      title: "AI Processing",
      subtitle: "Extracting Content",
      icon: Brain,
    },
    {
      id: 3,
      title: "Generate Quiz",
      subtitle: "Creating Q&A Solutions",
      icon: LayoutGrid,
    },
    {
      id: 4,
      title: "Preview & Publish",
      subtitle: "Review And Publish Quiz",
      icon: FileSearch,
    },
  ];

  return (
    <div className="w-full bg-white border border-slate-200 rounded-[20px] p-6 shadow-sm flex items-center justify-between overflow-x-auto select-none gap-4">
      <div className="flex items-center justify-between w-full min-w-[768px] px-2">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;
          
          return (
            <div key={step.id} className="flex items-center flex-1 last:flex-initial">
              {/* Step indicator */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors shrink-0 ${
                    isActive || isCompleted
                      ? "bg-[#082042] text-white shadow-sm"
                      : "bg-[#E2E8F0] text-slate-500"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex flex-col text-left">
                  <span
                    className={`font-bold text-sm roboto ${
                      isActive || isCompleted ? "text-[#082042]" : "text-slate-500"
                    }`}
                  >
                    {step.title}
                  </span>
                  <span className="text-slate-400 text-xs mt-0.5 whitespace-nowrap lato">
                    {step.subtitle}
                  </span>
                </div>
              </div>

              {/* Connector arrow */}
              {idx < steps.length - 1 && (
                <div className="flex-1 flex justify-center text-slate-300 mx-4">
                  <div className="flex items-center gap-1">
                    <span className="h-px w-8 border-t border-dashed border-slate-400" />
                    <ChevronRight className="w-4 h-4 text-slate-600 font-bold" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
