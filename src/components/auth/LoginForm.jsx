import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import FormInput from "../ui/FormInput";
import { loginSchema } from "../../lib/validation/auth.schema";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    console.log("Login Data:", data);
    // Add login logic here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
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

        <div className="flex items-center justify-between text-xs sm:text-sm pt-1">
          <label className="flex items-center gap-2 text-slate-300 font-medium cursor-pointer select-none">
            <input
              type="checkbox"
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
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#5D9E32] hover:bg-[#4d8628] text-white py-3.5 rounded-xl font-bold text-sm tracking-wider transition-all active:scale-[0.98] disabled:opacity-70 shadow-lg shadow-[#5D9E32]/10"
      >
        {isSubmitting ? "Signing in..." : "Create Account"}
      </button>

      <div className="text-center mt-6">
        <p className="text-slate-400 text-sm font-medium lato">
          Don't Have An Account?{" "}
          <Link
            to="/signup"
            className="text-[#5D9E32] hover:underline transition-all font-bold"
          >
            Create Account
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
