import { useRouteError, Link } from "react-router-dom";
import { Home, AlertTriangle, ArrowLeft } from "lucide-react";

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen bg-secondary flex flex-col items-center justify-center p-6 font-sans text-white overflow-hidden relative">
      {/* Background decoration: Soft glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gold/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 flex flex-col items-center max-w-2xl text-center">
        {/* Icon with Glassmorphism and Glow */}
        <div className="relative mb-10 group">
          <div className="absolute inset-0 bg-primary/30 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
          <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform transition-all duration-500 hover:rotate-3">
            <AlertTriangle className="w-20 h-20 text-primary drop-shadow-[0_0_10px_rgba(212,181,121,0.5)]" />
          </div>
        </div>

        {/* Error Code: Large & Gradient */}
        <h1 className="text-[10rem] sm:text-[12rem] font-black leading-none mb-2 tracking-tighter lora text-transparent bg-clip-text bg-gradient-to-b from-primary via-gold to-primary/50 drop-shadow-2xl">
          {error?.status || "404"}
        </h1>
        
        {/* Status Text */}
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 raleway tracking-[0.2em] uppercase text-white/90">
          {error?.statusText || "Lost in Space"}
        </h2>

        {/* Description */}
        <p className="text-white/50 mb-12 max-w-md raleway text-lg leading-relaxed font-medium">
          The sanctuary you are seeking has vanished into the shadows. Let's guide you back to civilization.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
          <Link
            to="/"
            className="flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-br from-primary to-gold text-secondary font-bold rounded-2xl shadow-[0_10px_30px_rgba(212,181,121,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_40px_rgba(212,181,121,0.5)] active:scale-95 group"
          >
            <Home className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            <span className="tracking-widest uppercase text-sm">Return Home</span>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-3 px-10 py-5 bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 text-white/80 font-bold rounded-2xl transition-all duration-300 active:scale-95 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="tracking-widest uppercase text-sm">Go Back</span>
          </button>
        </div>
      </div>

      {/* Aesthetic Accents: Grid or Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2 rotate-6 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2 -rotate-6 pointer-events-none" />
      
      {/* Bottom Branding / Metadata */}
      <div className="absolute bottom-10 flex flex-col items-center gap-2">
        <div className="w-12 h-[1px] bg-primary/40" />
        <span className="text-[10px] uppercase tracking-[0.8em] text-white/30 font-mono">
          System_Error_Report // Ref: {error?.status || "0x000404"}
        </span>
      </div>
    </div>
  );
}

export default ErrorPage;
