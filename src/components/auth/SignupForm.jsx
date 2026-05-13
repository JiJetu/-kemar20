import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, User } from "lucide-react";
import { Link } from "react-router-dom";
import FormInput from "../ui/FormInput";
import { signupSchema } from "../../lib/validation/auth.schema";

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      agree: false,
    },
  });

  const onSubmit = (data) => {
    console.log("Signup Data:", data);
    // Add signup logic here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-4">
        <FormInput
          placeholder="Your name"
          type="text"
          icon={User}
          error={errors.name}
          {...register("name")}
        />

        <FormInput
          placeholder="abc@gmail.com"
          type="email"
          icon={Mail}
          error={errors.email}
          {...register("email")}
        />

        <FormInput
          placeholder="Enter your password"
          type="password"
          icon={Lock}
          error={errors.password}
          {...register("password")}
        />

        <FormInput
          placeholder="Confirm your password"
          type="password"
          icon={Lock}
          error={errors.confirmPassword}
          {...register("confirmPassword")}
        />
      </div>

      <div className="flex items-center gap-3 py-1 ml-2">
        <input
          id="agree"
          type="checkbox"
          {...register("agree")}
          className="w-4 h-4 rounded border-[#535862] text-primary focus:ring-primary/20 accent-primary"
        />
        <label
          htmlFor="agree"
          className="text-[14px] text-[#535862] font-medium raleway cursor-pointer select-none"
        >
          You agree to our{" "}
          <span className="text-[#9D523B] hover:underline">
            friendly privacy policy
          </span>
        </label>
      </div>
      {errors.agree && (
        <p className="text-[11px] text-red-500 font-medium -mt-4 pl-7">
          {errors.agree.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#2D3E4E] hover:bg-[#1D2B38] text-white py-3.5 rounded-xl font-bold text-sm tracking-widest uppercase transition-all active:scale-[0.98] disabled:opacity-70"
      >
        {isSubmitting ? "Creating..." : "Create Account"}
      </button>

      <div className="text-center mt-6">
        <p className="text-secondary/60 text-base font-medium raleway">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary hover:underline transition-all font-bold"
          >
            Sign In
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SignupForm;
