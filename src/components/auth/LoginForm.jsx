import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock } from "lucide-react";
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-4">
        <FormInput
          placeholder="abc@gmail.com"
          type="email"
          icon={Mail}
          error={errors.email}
          {...register("email")}
        />

        <div className="space-y-2">
          <FormInput
            placeholder="Enter your password"
            type="password"
            icon={Lock}
            error={errors.password}
            {...register("password")}
          />
          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-[14px] text-[#E7000B] hover:underline transition-all"
            >
              Forgot password?
            </Link>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#2D3E4E] hover:bg-[#1D2B38] text-white py-3.5 rounded-xl font-bold text-sm tracking-widest uppercase transition-all active:scale-[0.98] disabled:opacity-70"
      >
        {isSubmitting ? "Signing in..." : "Sign In"}
      </button>

      <div className="text-center mt-6">
        <p className="text-secondary/60 text-base font-medium raleway">
          Doesn't have an account?{" "}
          <Link
            to="/signup"
            className="text-primary hover:underline transition-all font-bold"
          >
            Sign up
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
