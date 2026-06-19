import AuthLayout from "../../components/shared/auth/AuthLayout";
import SignupForm from "../../components/auth/SignupForm";
import SEO from "../../components/shared/SEO";

function Signup() {
  return (
    <>
      <SEO
        title="Sign Up || ExcelJM"
        description="Create your account to start exploring Culture, Cuisine, Motion, and Memory on ExcelJM."
      />

      <AuthLayout title="Create Your Account" subtitle="Join Excel Jam And Start Your Learning Journey">
        <SignupForm />
      </AuthLayout>
    </>
  );
}

export default Signup;
