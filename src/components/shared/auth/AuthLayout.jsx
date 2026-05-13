import { IMAGES } from "../../../assets";

const AuthLayout = ({ children, subtitle }) => {
  return (
    <>
      <div className="min-h-screen w-full bg-white flex flex-col relative overflow-hidden selection:bg-primary/30">
        {/* Auth Overlay - Visible only on desktop, positioned at top */}
        <div className="absolute -top-52 left-0 w-full z-0 pointer-events-none hidden md:block select-none">
          <img
            src={IMAGES.authOverlay}
            alt=""
            className="w-full h-auto object-top opacity-50"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 sm:px-12">
          {/* Logo and Form Area - Side by Side on Desktop */}
          <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-16 lg:gap-32">
            {/* Logo Section - Left Side */}
            <div className="hidden md:flex flex-col items-center select-none flex-1 max-w-xs">
              <img
                src={IMAGES.logo}
                alt="Immersiv Logo"
                className="w-full h-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.1)]"
                loading="eager" // Logo should load quickly
                decoding="async"
              />
            </div>

            <div className="w-full max-w-[480px]">
              {/* Culture Text Banner */}
              <div className="w-full text-center mb-4">
                <h2 className="text-xl md:text-2xl lg:text-4xl font-bold lora italic tracking-tight lora">
                  <span className="text-primary">Culture</span>
                  <span className="text-secondary mx-2 opacity-20 italic">
                    ·
                  </span>
                  <span className="text-primary">Cuisine</span>
                  <span className="text-secondary mx-2 opacity-20 italic">
                    ·
                  </span>
                  <span className="text-primary">Motion</span>
                  <span className="text-secondary mx-2 opacity-20 italic">
                    ·
                  </span>
                  <span className="text-primary">Memory</span>
                </h2>
                <p className="text-secondary/60 text-sm md:text-base lg:text-lg mt-3 font-medium tracking-wide raleway">
                  {subtitle}
                </p>
              </div>

              {/* Form Card - Right Side */}
              <div className="w-full bg-white rounded-[2rem] shadow-[0_30px_80px_rgba(0,0,0,0.06)] border border-black/[0.03] p-8 sm:p-10 relative">
                {children}
              </div>
            </div>
          </div>

          {/* Mobile Logo (Visible only on small screens) */}
          <div className="md:hidden mt-16 flex flex-col items-center opacity-30">
            <img
              src={IMAGES.logo}
              alt="Immersiv Logo"
              className="w-20 h-auto"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
