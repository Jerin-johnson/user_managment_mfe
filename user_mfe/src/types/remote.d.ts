declare module "shared/useAuthStore" {
  type User = {
    name: string;
    email: string;
    role: string;
    avatarUrl: string;
  };

  type AuthState = {
    user: User | null;
    isAuthenticated: boolean;
    setUser: (user: User) => void;
    clearUserAuth: () => void;
  };

  const useAuthStore: () => AuthState;

  export default useAuthStore;
}

declare module "shared/Footer";
