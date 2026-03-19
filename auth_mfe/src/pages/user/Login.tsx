import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm";

// import { loginUser } from '@/services/authService';   ← replace with real call

export default function UserLogin() {
  const navigate = useNavigate();
  // const { login } = useAuth();   ← if you use auth context

  const handleUserLogin = async (data: { email: string; password: string }) => {
    try {
      // await loginUser(data.email, data.password);
      console.log("User login:", data);

      // Example success flow
      // await login({ ...userData, role: 'user' });
      navigate("/dashboard"); // or wherever user goes after login
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (
          err.message.includes("401") ||
          err.message.includes("credentials")
        ) {
          alert("Invalid email or password");
        } else {
          alert(`Login error: ${err.message}`);
        }
      } else {
        alert("Something went wrong. Please try again.");
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
