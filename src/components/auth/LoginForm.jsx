import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import FormInput from "../ui/FormInput";
import { loginSchema } from "../../lib/validation/auth.schema";
import { useLoginMutation } from "../../redex/features/auth/auth.api";

const LoginForm = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await login({
        email: data.email,
        password: data.password,
      }).unwrap();

      toast.success("Logged in successfully!");

      const role = response?.user?.role ?? response?.user_role;
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMsg =
        error?.data?.detail ||
        error?.data?.message ||
        "Invalid email or password. Please try again.";
      toast.error(errorMsg);
    }
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
          <label className="flex items-center gap-2 text-black font-medium cursor-pointer select-none">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-[#192B4C] bg-[#051532] text-secondary focus:ring-secondary/20 accent-secondary cursor-pointer"
            />
            <span className="lato">Remember Me</span>
          </label>
          <Link
            to="/forgot-password"
            className="text-secondary hover:underline transition-all font-semibold roboto"
          >
            Forgot Password
          </Link>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#39842B] hover:bg-[#39842B]/95 text-white py-3.5 rounded-[8px] font-bold text-sm tracking-wider transition-all active:scale-[0.98] disabled:opacity-70 shadow-md cursor-pointer"
      >
        {isLoading ? "Logging In..." : "Log In"}
      </button>
    </form>
  );
};

export default LoginForm;
