import AuthLayout from "../../components/shared/auth/AuthLayout";
import SignupForm from "../../components/auth/SignupForm";
import SEO from "../../components/shared/SEO";

function Signup() {
  return (
    <>
      <SEO
        title="Sign Up || IMMERSIV"
        description="Create your account to start exploring Culture, Cuisine, Motion, and Memory on IMMERSIV."
      />

      <AuthLayout subtitle="Create your account to start exploring">
        <SignupForm />
      </AuthLayout>
    </>
  );
}

export default Signup;
