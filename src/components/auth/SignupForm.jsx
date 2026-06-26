import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import FormInput from "../ui/FormInput";
import { signupSchema } from "../../lib/validation/auth.schema";
import { useSignupMutation } from "../../redex/features/auth/auth.api";
import { toast } from "sonner";

const SignupForm = ({ onSuccess }) => {
  const [signup, { isLoading: isSigningUp }] = useSignupMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      agree: true,
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await signup({
        email: data.email,
        full_name: data.name,
        password: data.password,
      }).unwrap();

      toast.success(response.detail || "Account created! Verification code sent.");
      onSuccess?.(data.email);
    } catch (error) {
      console.error("Signup error:", error);
      const errorMsg = error?.data?.detail || error?.data?.message || error?.data?.email?.[0] || error?.data?.password?.[0] || "Signup failed. Please try again.";
      toast.error(errorMsg);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <FormInput
          label="Full Name"
          placeholder="Enter your full name"
          type="text"
          error={errors.name}
          {...register("name")}
        />

        <FormInput
          label="Email Address"
          placeholder="Enter your email address"
          type="email"
          error={errors.email}
          {...register("email")}
        />

        <FormInput
          label="Password"
          placeholder="Create Password"
          type="password"
          error={errors.password}
          {...register("password")}
        />

        <FormInput
          label="Confirm Password"
          placeholder="Confirm Password"
          type="password"
          error={errors.confirmPassword}
          {...register("confirmPassword")}
        />
      </div>

      <div className="flex items-center justify-between text-xs sm:text-sm pt-1">
        <label className="flex items-center gap-2 text-slate-300 font-medium cursor-pointer select-none">
          <input
            id="agree"
            type="checkbox"
            {...register("agree")}
            className="w-4 h-4 rounded border-[#192B4C] bg-[#051532] text-[#5D9E32] focus:ring-[#5D9E32]/20 accent-[#5D9E32] cursor-pointer"
          />
          <span className="lato">Remember Me</span>
        </label>
        <Link
          to="/forgot-password"
          className="text-[#3b82f6] hover:text-[#60a5fa] hover:underline transition-all font-medium lato"
        >
          Forgot Password
        </Link>
      </div>
      {errors.agree && (
        <p className="text-[11px] text-red-500 font-medium -mt-4 pl-1">
          {errors.agree.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isSigningUp}
        className="w-full bg-[#5D9E32] hover:bg-[#4d8628] text-white py-3.5 rounded-xl font-bold text-sm tracking-wider transition-all active:scale-[0.98] disabled:opacity-70 shadow-lg shadow-[#5D9E32]/10"
      >
        {isSigningUp ? "Creating..." : "Create Account"}
      </button>

      <div className="text-center mt-6">
        <p className="text-slate-400 text-sm font-medium lato">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#5D9E32] hover:underline transition-all font-bold"
          >
            Sign In
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SignupForm;
