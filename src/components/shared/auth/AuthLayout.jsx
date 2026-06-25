import { IMAGES } from "../../../assets";

const AuthLayout = ({ children, title = "Welcome Back", subtitle }) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden bg-white text-black selection:bg-primary/30">
      {/* Background Image */}
      {/* <img
        src={IMAGES.authBg}
        alt=""
        className="absolute inset-0 w-full h-full object-fill z-0 pointer-events-none select-none"
        loading="eager"
        decoding="async"
      /> */}

      {/* Form Card */}
      <div
        className="w-full max-w-[480px] p-8 sm:p-10 flex flex-col relative z-10"
        style={{
          borderRadius: "20px",
          border: "1px solid #DED7D7",
          // background: "#001131",
        }}
      >
        {/* Logo Section */}
        <div className="mb-6 flex justify-center select-none">
          <img
            src={IMAGES.logo}
            alt="ExcelJM Logo"
            className="w-24 h-auto drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
            loading="eager"
            decoding="async"
          />
        </div>

        {/* Title */}
        {title && (
          <h1 className="text-2xl sm:text-3xl font-bold text-[#5D9E32] text-center mb-1 roboto">
            {title}
          </h1>
        )}

        {/* Subtitle */}
        {subtitle && (
          <p className="text-slate-400 text-sm text-center mb-6 font-medium lato">
            {subtitle}
          </p>
        )}

        {/* Form Content */}
        <div className="w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

