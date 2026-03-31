import useAuthStore from "shared/useAuthStore";
import RegisterForm from "../../components/RegisterForm";
import { notify } from "../../notification/toast";
import { registerApi } from "../../services/auth.service";

export default function AdminRegister() {
  const { setUser } = useAuthStore();

  const handleAdminRegister = async (data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    // Remove confirmPassword before sending to API
    const { confirmPassword, ...registerData } = data;

    console.log(confirmPassword);

    try {
      console.log("User registration payload:", registerData);

      const result = await registerApi({ ...registerData, role: "ADMIN" });
      console.log("The result is register Api", result);

      notify.success("admin register successfully");

      setTimeout(
        () =>
          setUser({
            name: data.name,
            email: data.email,
            role: "ADMIN",
          }),
        1200,
      );
    } catch (err: any) {
      console.log("the error is", err);
      notify.error(
        err?.response?.data?.message || err?.message || "Something went wrong",
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
