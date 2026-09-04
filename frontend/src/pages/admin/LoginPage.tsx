import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { authService } from "../../services/authService";
import type { LoginInput } from "../../types/auth";
import { Reveal } from "../../components/common/Reveal";

const loginSchema = z.object({
  username: z.string().min(1, "Username required"),
  password: z.string().min(1, "Password required"),
});

// tsconfig has strictNullChecks off, which makes zod's z.infer mark every key
// optional. Use the explicit service contract instead; the schema still
// validates at runtime.
type LoginFormData = LoginInput;

export const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await authService.login(data);
      toast.success("Welcome back.");
      navigate("/admin/dashboard");
    } catch {
      toast.error("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink px-4 py-12">
      <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />

      <Reveal className="relative z-10 w-full max-w-md">
        <div className="mb-10 text-center">
          <Link
            to="/"
            className="font-display text-2xl font-semibold tracking-tight text-paper"
          >
            XYAON<span className="text-amber">*</span>
          </Link>
          <p className="mt-2 text-sm text-paper-dim">Admin console</p>
        </div>

        <div className="card p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="admin-username"
                className="mb-2 block text-sm text-paper-dim"
              >
                Username
              </label>
              <input
                id="admin-username"
                {...register("username")}
                type="text"
                autoComplete="username"
                className="field"
                placeholder="Enter username"
              />
              {errors.username && (
                <p className="mt-1.5 text-[13px] text-red-400">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="mb-2 block text-sm text-paper-dim"
              >
                Password
              </label>
              <input
                id="admin-password"
                {...register("password")}
                type="password"
                autoComplete="current-password"
                className="field"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1.5 text-[13px] text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full disabled:opacity-60"
            >
              {isLoading ? "Authenticating…" : "Login"}
            </button>
          </form>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="link-line text-sm text-paper-dim transition-colors hover:text-paper"
          >
            ← Back to site
          </Link>
        </div>
      </Reveal>
    </div>
  );
};
