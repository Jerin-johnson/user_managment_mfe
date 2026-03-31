import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  title: string;
  subtitle: string;
  onSubmit: (data: RegisterFormValues) => Promise<void>;
  loginLink: string;
  isAdmin?: boolean;
}

export default function RegisterForm({
  title,
  subtitle,
  onSubmit,
  loginLink,
  isAdmin = false,
}: RegisterFormProps) {
  // const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onFormSubmit = async (data: RegisterFormValues) => {
    setSubmitError(null);
    setIsLoading(true);

    try {
      console.log("is this calling", data);
      await onSubmit(data);
      // navigate(isAdmin ? "/auth/admin/login" : "/auth/user/login");
    } catch (err: unknown) {
      setSubmitError(
        err instanceof Error ? err.message : "Registration failed.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white">
          {title}
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">{subtitle}</p>
      </div>

      <form onSubmit={handleSubmit(onFormSubmit)} className="mt-8 space-y-6">
        <div className="space-y-5">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white"
            >
              Full name
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              {...register("name")}
              className={`mt-1 block w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 
                bg-white dark:bg-gray-800 
                text-gray-900 dark:text-white
                border-gray-300 dark:border-gray-600
                placeholder:text-gray-400 dark:placeholder:text-gray-500
                ${
                  errors.name
                    ? "border-red-500 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-500/30"
                    : "focus:border-indigo-500 focus:ring-indigo-200 dark:focus:border-indigo-500 dark:focus:ring-indigo-500/30"
                }`}
            />
            {errors.name && (
              <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              {...register("email")}
              className={`mt-1 block w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 
                bg-white dark:bg-gray-800 
                text-gray-900 dark:text-white
                border-gray-300 dark:border-gray-600
                placeholder:text-gray-400 dark:placeholder:text-gray-500
                ${
                  errors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-500/30"
                    : "focus:border-indigo-500 focus:ring-indigo-200 dark:focus:border-indigo-500 dark:focus:ring-indigo-500/30"
                }`}
            />
            {errors.email && (
              <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              {...register("password")}
              className={`mt-1 block w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 
                bg-white dark:bg-gray-800 
                text-gray-900 dark:text-white
                border-gray-300 dark:border-gray-600
                placeholder:text-gray-400 dark:placeholder:text-gray-500
                ${
                  errors.password
                    ? "border-red-500 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-500/30"
                    : "focus:border-indigo-500 focus:ring-indigo-200 dark:focus:border-indigo-500 dark:focus:ring-indigo-500/30"
                }`}
            />
            {errors.password && (
              <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-white"
            >
              Confirm password
            </label>
            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              {...register("confirmPassword")}
              className={`mt-1 block w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 
                bg-white dark:bg-gray-800 
                text-gray-900 dark:text-white
                border-gray-300 dark:border-gray-600
                placeholder:text-gray-400 dark:placeholder:text-gray-500
                ${
                  errors.confirmPassword
                    ? "border-red-500 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-500/30"
                    : "focus:border-indigo-500 focus:ring-indigo-200 dark:focus:border-indigo-500 dark:focus:ring-indigo-500/30"
                }`}
            />
            {errors.confirmPassword && (
              <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        {submitError && (
          <div className="rounded-md bg-red-50 dark:bg-red-950 p-3 text-sm text-red-700 dark:text-red-400">
            {submitError}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full justify-center rounded-lg bg-indigo-600 px-4 py-3.5 font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-60"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Creating account...
            </>
          ) : (
            "Create account"
          )}
        </button>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to={loginLink}
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
