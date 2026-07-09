export default function LoadingSpinner({ message = "Loading...", minHeight = "min-h-[400px]" }) {
  return (
    <div className={`flex flex-col items-center justify-center w-full gap-3 ${minHeight}`}>
      <div className="w-9 h-9 border-4 border-[#39842B] border-t-transparent rounded-full animate-spin shadow-sm" />
      <span className="text-xs text-slate-400 font-semibold tracking-wider uppercase roboto animate-pulse">
        {message}
      </span>
    </div>
  );
}
