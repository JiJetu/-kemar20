import { IMAGES } from "../../../assets";
import { Link, useLocation } from "react-router-dom";

export default function AuthLayout({ children, leftTitle, leftSubtitle }) {
  const location = useLocation();
  const isSignup = location.pathname.includes("signup");

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#EBF9E9] text-black select-none font-sans overflow-x-hidden">
      {/* Left Column: Info & Illustration (Desktop Only) */}
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center p-12 text-left border">
        <div className="w-full flex flex-col justify-start items-center">
          <div>
            <h1 className="text-4xl xl:text-[44px] font-extrabold text-[#082042] leading-[1.15] mb-6 lora">
              {leftTitle}
            </h1>
            <p className="text-[#47515E] text-sm xl:text-base font-medium leading-relaxed mb-10 max-w-sm roboto">
              {leftSubtitle ||
                "Excellim is an ai-powered quiz and assessment platform that helps students practice, test their knowledge, and improve performance with instant results and solutions."}
            </p>
            <div className="w-full flex justify-start items-center">
              <img
                src={IMAGES.authImage}
                alt="Auth Illustration"
                className="w-full max-w-[450px] h-auto object-contain animate-in fade-in duration-700"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Large White Form Panel */}
      <div className="w-full lg:w-1/2 bg-white lg:rounded-l-[48px] flex flex-col min-h-screen relative p-6 sm:p-12 lg:p-16 justify-between shadow-lg">
        {/* Top Header Row (Switch Link only) */}
        <div className="w-full flex items-center justify-end mb-8 select-none">
          <div className="text-sm font-semibold text-[#082042] roboto">
            {isSignup ? (
              <>
                Already have an account?{" "}
                <Link to="/login" className="text-[#39842B] hover:underline">
                  Sign In
                </Link>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <Link to="/signup" className="text-[#39842B] hover:underline">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Center Form Container */}
        <div className="flex-1 flex items-center justify-center w-full max-w-[500px] mx-auto py-8">
          <div className="w-full">{children}</div>
        </div>
      </div>
    </div>
  );
}
