import { AlertTriangle } from "lucide-react";

export default function DeleteConfirmModal({
  isOpen,
  title = "Delete Quiz",
  message = "Are you sure you want to delete this quiz? This action cannot be undone.",
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-xl w-full max-w-md relative text-left animate-in zoom-in-95 duration-200">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="flex flex-col gap-1.5 flex-1">
            <h3 className="text-lg font-bold text-slate-800 roboto">{title}</h3>
            <p className="text-slate-500 text-sm lato leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4 mt-5">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg transition-colors text-sm font-semibold cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-5 py-3 bg-[#AD0122] hover:bg-[#AD0122]/90 text-white rounded-lg transition-colors shadow-sm text-sm font-bold cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
