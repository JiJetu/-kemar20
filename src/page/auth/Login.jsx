import AuthLayout from "../../components/shared/auth/AuthLayout";
import LoginForm from "../../components/auth/LoginForm";
import SEO from "../../components/shared/SEO";
import { IMAGES } from "../../assets";

function Login() {
  return (
    <>
      <SEO
        title="Login || ExcelJM"
        description="Sign in to your account to start exploring Culture, Cuisine, Motion, and Memory on ExcelJM."
      />

      <AuthLayout
        leftTitle={
          <>
            Welcome Back! <br />
            Let's Continue <br />
            <span className="text-[#39842B]">Your Learning Journey</span>
          </>
        }
        leftSubtitle="Excellim is an ai-powered quiz and assessment platform that helps students practice, test their knowledge, and improve performance with instant results and solutions."
      >
        <div className="w-full text-left animate-in fade-in duration-300">
          <img
            src={IMAGES.logo}
            alt="ExcelJM Logo"
            className="h-20 w-auto object-contain mb-4 select-none"
          />
          <h3 className="text-3xl font-extrabold text-[#082042] mb-2 lora">Login To Your Account</h3>
          <p className="text-slate-400 text-xs sm:text-sm font-semibold mb-8 leading-relaxed">
            Excellim is an ai-powered quiz and assessment platform that helps students practice, test their knowledge, and improve performance with instant results and solutions.
          </p>
          <LoginForm />
        </div>
      </AuthLayout>
    </>
  );
}

export default Login;
