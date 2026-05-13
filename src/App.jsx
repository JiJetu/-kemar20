import React, { useEffect, useRef, useState } from "react";
import { Battery, Zap, ChevronUp } from "lucide-react";
import toast from "react-hot-toast";
import overlayImage from "../assets/overlay-building.png";

export default function CameraOverlayMatcher() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [isAligned, setIsAligned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMatched, setHasMatched] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera error:", err);
      toast.error("Could not access camera");
    }
  };

  // Capture frame for alignment check
  const captureFrame = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || video.videoWidth === 0) return null;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    return canvas;
  };

  // Simulated alignment logic
  // In a real app, this would use feature matching/template matching
  const checkAlignment = () => {
    const canvas = captureFrame();
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const { width, height } = canvas;

    // Center box (ROI)
    const boxSize = 150;
    const x = width / 2 - boxSize / 2;
    const y = height / 2 - boxSize / 2;

    const imageData = ctx.getImageData(x, y, boxSize, boxSize);
    const data = imageData.data;

    let brightness = 0;
    for (let i = 0; i < data.length; i += 4) {
      brightness += (data[i] + data[i + 1] + data[i + 2]) / 3;
    }
    brightness /= data.length / 4;

    // Simulating a "match" if brightness is within a certain range
    // This is just a placeholder for actual image recognition
    if (brightness > 80 && brightness < 220) {
      setIsAligned(true);
    } else {
      setIsAligned(false);
    }
  };

  // Start camera
  useEffect(() => {
    startCamera();
    const interval = setInterval(checkAlignment, 1000); // check alignment every second

    return () => clearInterval(interval);
  }, []);

  const handleExperience = () => {
    if (isAligned) {
      setHasMatched(true);
      toast.success("Match Successful! 🎉", {
        duration: 4000,
        position: "bottom-center",
        style: {
          background: "#333",
          color: "#fff",
          borderRadius: "10px",
        },
      });
    } else {
      toast.error("Please align the building outline with the camera view", {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden font-sans select-none">
      {/* Camera Viewport */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full h-full object-cover opacity-90"
      />

      {/* Hidden Canvas for Processing */}
      <canvas ref={canvasRef} className="hidden" />

      {/* UI Overlay Layer */}
      <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 pointer-events-none">
        {/* Top Bar: Battery & Status */}
        <div className="flex justify-between items-start w-full">
          <div className="flex gap-2">{/* Empty spacer for balance */}</div>
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-1 bg-black/30 backdrop-blur-md px-2 py-1 rounded-md border border-white/20">
              <Battery className="w-5 h-5 text-white fill-white/80" />
              <div className="w-8 h-3 bg-white/20 rounded-sm relative overflow-hidden">
                <div className="absolute left-0 top-0 h-full bg-green-400 w-3/4" />
              </div>
            </div>
          </div>
        </div>

        {/* Central Viewfinder & PNG Overlay */}
        <div className="relative flex-1 flex items-center justify-center">
          {/* Corner Brackets */}
          <div className="absolute w-72 h-48 sm:w-96 sm:h-64 pointer-events-none">
            {/* Top Left */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white/80 rounded-tl-lg" />
            {/* Top Right */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white/80 rounded-tr-lg" />
            {/* Bottom Left */}
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white/80 rounded-bl-lg" />
            {/* Bottom Right */}
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white/80 rounded-br-lg" />

            {/* Central Focus Circle */}
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-2 border-white/40 rounded-full flex items-center justify-center transition-all duration-300 ${isAligned ? "scale-110 border-green-400/80 bg-green-400/10" : ""}`}
            >
              <div
                className={`w-2 h-2 rounded-full ${isAligned ? "bg-green-400" : "bg-white/60"}`}
              />
            </div>

            {/* Horizontal Scale at Bottom of box */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-48 flex justify-between items-end gap-1 opacity-60">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className={`w-[1px] bg-white transition-all ${i % 5 === 0 ? "h-3" : "h-1.5"} ${i === 10 ? "h-5 bg-white scale-y-125" : ""}`}
                />
              ))}
            </div>
          </div>

          {/* The PNG Overlay Image (The Building Line Art) */}
          <div
            className={`relative transition-all duration-700 ${isAligned ? "opacity-100 scale-100" : "opacity-40 scale-95"}`}
          >
            <img
              src={overlayImage}
              alt="Building Overlay"
              className={`w-64 sm:w-80 h-auto invert brightness-150 transition-all duration-500 ${isAligned ? "drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]" : "drop-shadow-none"}`}
              style={{ mixBlendMode: "screen" }}
            />
          </div>
        </div>

        {/* Bottom Bar: Action Button */}
        <div className="w-full flex flex-col items-center gap-6 pointer-events-auto">
          <div className="flex flex-col items-center gap-2">
            <ChevronUp className="w-5 h-5 text-white/60 animate-bounce" />
            <p className="text-white/80 text-sm font-medium tracking-widest uppercase">
              {isAligned ? "Target Locked" : "Align Building"}
            </p>
          </div>

          <button
            onClick={handleExperience}
            disabled={loading}
            className={`group relative overflow-hidden px-12 py-4 rounded-xl font-bold text-white transition-all duration-300 transform active:scale-95 ${
              isAligned
                ? "bg-gradient-to-r from-orange-500 to-orange-600 shadow-[0_0_20px_rgba(249,115,22,0.4)]"
                : "bg-white/10 backdrop-blur-md border border-white/20 text-white/50"
            }`}
          >
            <span className="relative z-10 tracking-widest uppercase">
              Experience
            </span>
            {isAligned && (
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            )}
          </button>
        </div>
      </div>

      {/* Corner Info (Aesthetics) */}
      <div className="absolute top-1/2 left-4 -translate-y-1/2 flex flex-col gap-8 opacity-40 pointer-events-none">
        <div className="flex flex-col border-l border-white/60 pl-2">
          <span className="text-[10px] text-white">ISO</span>
          <span className="text-xs text-white font-mono">800</span>
        </div>
        <div className="flex flex-col border-l border-white/60 pl-2">
          <span className="text-[10px] text-white">EXP</span>
          <span className="text-xs text-white font-mono">1/120</span>
        </div>
      </div>

      {/* Bottom Branding (Aesthetics) */}
      <div className="absolute bottom-4 left-6 opacity-30 pointer-events-none">
        <h2 className="text-white text-xl font-bold tracking-tighter italic">
          ZAHRA
        </h2>
      </div>
      <div className="absolute bottom-4 right-6 opacity-30 text-right pointer-events-none">
        <p className="text-white text-[10px] font-mono tracking-widest">
          CAM_SYS_v2.0.4
        </p>
        <p className="text-white text-[10px] font-mono tracking-widest">
          LENS_WIDE_24MM
        </p>
      </div>
    </div>
  );
}
