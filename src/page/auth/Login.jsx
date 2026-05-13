import AuthLayout from "../../components/shared/auth/AuthLayout";
import LoginForm from "../../components/auth/LoginForm";
import SEO from "../../components/shared/SEO";

function Login() {
  return (
    <>
      <SEO
        title="Login || IMMERSIV"
        description="Sign in to your account to start exploring Culture, Cuisine, Motion, and Memory on IMMERSIV."
      />

      <AuthLayout subtitle="Sign in to your account to start exploring">
        <LoginForm />
      </AuthLayout>
    </>
  );
}

export default Login;
