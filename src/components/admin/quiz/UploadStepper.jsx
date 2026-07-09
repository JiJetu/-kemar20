import { ChevronRight, ClipboardList, UploadCloud, Brain, FileSearch } from "lucide-react";

export default function UploadStepper({ currentStep }) {
  const steps = [
    {
      id: 1,
      title: "Quiz Information",
      subtitle: "Basic details about the quiz",
      icon: ClipboardList,
    },
    {
      id: 2,
      title: "Upload Pdf",
      subtitle: "Upload Previous Exam Pdf",
      icon: UploadCloud,
    },
    {
      id: 3,
      title: "AI Processing",
      subtitle: "AI Will Generate Quiz",
      icon: Brain,
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
                      ? "bg-[#0A2648] text-white shadow-sm"
                      : "bg-[#D8DCE3]/65 text-[#0A2648]/70"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className={`font-bold text-sm roboto ${
                    isActive || isCompleted ? "text-[#0A2648]" : "text-[#0A2648]/70"
                  }`}>
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
