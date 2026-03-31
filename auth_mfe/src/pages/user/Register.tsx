import RegisterForm from "../../components/RegisterForm";
import useAuthStore from "shared/useAuthStore";
import { registerApi } from "../../services/auth.service";
import { notify } from "../../notification/toast";

export default function UserRegister() {
  const { setUser } = useAuthStore();

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
      console.log("User registration payload:", registerData);

      const result = await registerApi({ ...registerData, role: "USER" });
      console.log("The result is register Api", result);

      notify.success("user register successfully");

      setTimeout(
        () =>
          setUser({
            name: data.name,
            email: data.email,
            role: "USER",
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
