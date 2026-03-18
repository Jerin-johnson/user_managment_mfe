// src/pages/user/UserRegister.tsx

import RegisterForm from "../../components/RegisterForm";

// import { registerUser } from "@/services/authService";  // ← your real API call

export default function UserRegister() {
  const handleUserRegister = async (data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    // Remove confirmPassword before sending to API
    const { confirmPassword, ...registerData } = data;

    console.log(confirmPassword);

    try {
      // await registerUser(registerData);
      console.log("User registration payload:", registerData);
      // On success → usually redirect to login or auto-login
    } catch (err: unknown) {
      throw new Error(
        err instanceof Error ? err.message : "Registration failed",
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-950 sm:px-6 lg:px-8">
      <RegisterForm
        title="Create User Account"
        subtitle="Join our platform and get started"
        onSubmit={handleUserRegister}
        loginLink="/auth/user/login"
      />
    </div>
  );
}
