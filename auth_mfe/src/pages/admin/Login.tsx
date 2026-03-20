import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm";
import useAuthStore from "shared/useAuthStore";

// import { loginAdmin } from '@/services/authService';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const handleAdminLogin = async (data: {
    email: string;
    password: string;
  }) => {
    try {
      // await loginAdmin(data.email, data.password);
      console.log("Admin login:", data);

      setUser({ name: "Jerin Johnson", email: data.email, role: "ADMIN" });
      navigate("/admin/dash");
    } catch (err: unknown) {
      console.log(err);
      throw new Error("Invalid admin credentials");
    }
  };

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
