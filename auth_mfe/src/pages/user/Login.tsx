import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm";
import useAuthStore from "shared/useAuthStore";
import { loginApi } from "../../services/auth.service";
import { notify } from "../../notification/toast";
import toast from "react-hot-toast";

export default function UserLogin() {
  // const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const handleUserLogin = async (data: { email: string; password: string }) => {
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

      if (result?.user?.role?.toLowerCase() === "admin") {
        throw new Error("Please use admin login");
      }

      setTimeout(
        () =>
          setUser({
            name: "default",
            email: data.email,
            role: "USER",
          }),
        1200,
      );
    } catch (err: any) {
      if (err?.message === "Please use admin login") {
        notify.error("Please use the Admin Login page");
      }
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-950 sm:px-6 lg:px-8">
      ,<h2>Herer</h2>
      <LoginForm
        title="User Sign In"
        subtitle="Access your personal account"
        onSubmit={handleUserLogin}
        registerLink="/auth/user/register"
        forgotPasswordLink="/auth/forgot"
      />
    </div>
  );
}
