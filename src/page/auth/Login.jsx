import AuthLayout from "../../components/shared/auth/AuthLayout";
import LoginForm from "../../components/auth/LoginForm";
import SEO from "../../components/shared/SEO";

function Login() {
  return (
    <>
      <SEO
        title="Login || ExcelJM"
        description="Sign in to your account to start exploring Culture, Cuisine, Motion, and Memory on ExcelJM."
      />

      <AuthLayout title="Welcome Back" subtitle="Login To Continue Your Learning Journey">
        <LoginForm />
      </AuthLayout>
    </>
  );
}

export default Login;
