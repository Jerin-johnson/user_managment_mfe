// import { registerAdmin } from "@/services/authService";

import RegisterForm from "../../components/RegisterForm";

export default function AdminRegister() {
  const handleAdminRegister = async (data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    const { confirmPassword, ...registerData } = data;

    console.log(confirmPassword);

    try {
      // await registerAdmin(registerData);
      console.log("Admin registration payload:", {
        ...registerData,
        role: "admin",
      });
      // Usually redirect to admin login
    } catch (err: unknown) {
      throw new Error(
        err instanceof Error ? err.message : "Admin registration failed",
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 px-4 py-12 dark:from-gray-950 dark:to-gray-900 sm:px-6 lg:px-8">
      <RegisterForm
        title="Create Admin Account"
        subtitle="Register new administrator"
        onSubmit={handleAdminRegister}
        loginLink="/auth/admin/login"
        isAdmin={true}
      />
    </div>
  );
}
