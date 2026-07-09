import { useState, useEffect } from "react";
import { IMAGES } from "../../assets";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Random increment for realistic loading speed
        const increment = Math.floor(Math.random() * 8) + 3;
        return Math.min(prev + increment, 100);
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        setIsFadingOut(true);
        const fadeTimeout = setTimeout(() => {
          setIsLoading(false);
        }, 500);
        return () => clearTimeout(fadeTimeout);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white transition-opacity duration-500 ease-out select-none ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center max-w-xs w-full px-6">
        {/* Glow Backdrop Effect */}
        <div className="absolute w-72 h-72 rounded-full bg-primary/10 blur-[80px] -z-10 animate-pulse" />
        
        {/* Pulsing loading logo */}
        <div className="relative mb-8 transform hover:scale-105 transition-transform duration-300">
          <img
            src={IMAGES.loadingLogo}
            alt="Loading..."
            className="w-32 h-auto object-contain animate-logo-pulse drop-shadow-[0_0_20px_rgba(57,132,43,0.15)]"
          />
        </div>

        {/* Progress Bar Container */}
        <div className="w-full bg-slate-100 border border-slate-200/60 h-2 rounded-full overflow-hidden mb-3 relative backdrop-blur-sm">
          <div
            className="bg-gradient-to-r from-[#EBF9E9] via-[#39842B] to-[#10A43B] h-full rounded-full transition-all duration-150 ease-out shadow-[0_0_12px_rgba(57,132,43,0.3)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Loading Text and Percentage */}
        <div className="w-full flex items-center justify-between text-xs font-semibold tracking-wider text-slate-400 lato">
          <span className="flex items-center gap-1 uppercase tracking-widest text-[10px] text-slate-400/80">
            Loading
            <span className="animate-dot-1">.</span>
            <span className="animate-dot-2">.</span>
            <span className="animate-dot-3">.</span>
          </span>
          <span className="text-primary font-bold text-sm tracking-normal">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
