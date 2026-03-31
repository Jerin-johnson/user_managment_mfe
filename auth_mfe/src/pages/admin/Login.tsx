import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm";
import useAuthStore from "shared/useAuthStore";
import toast from "react-hot-toast";
import { loginApi } from "../../services/auth.service";
import { notify } from "../../notification/toast";
import { useEffect, useRef } from "react";

// import { loginAdmin } from '@/services/authService';

export default function AdminLogin() {
  const { setUser } = useAuthStore();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  toast.dismiss();

  const handleAdminLogin = async (data: {
    email: string;
    password: string;
  }) => {
    try {
      console.log("User login:", data);

      const result = await toast.promise(loginApi(data.email, data.password), {
        loading: "Authenticating your account...",
        success: "User authenticated successfully!",
        error: (err: any) => {
          console.log(err?.response?.data);
          return (
            err?.response?.data?.message ||
            err?.message ||
            "Something went wrong"
          );
        },
      });

      if (result?.user?.role?.toLowerCase() === "user") {
        throw new Error("Please use user login");
      }

      timeoutRef.current = setTimeout(
        () =>
          setUser({
            name: "default",
            email: data.email,
            role: "ADMIN",
          }),
        1200,
      );
    } catch (err: any) {
      if (err?.message === "Please use user login") {
        notify.error("Please use the User Login page");
      }
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 px-4 py-12 dark:from-gray-950 dark:to-gray-900 sm:px-6 lg:px-8">
      <LoginForm
        title="Admin Portal"
        subtitle="Sign in to manage the system"
        onSubmit={handleAdminLogin}
        registerLink="/auth/admin/register"
        forgotPasswordLink="/auth/forgot"
      />
    </div>
  );
}
