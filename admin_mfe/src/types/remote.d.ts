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

  // This is the key change:
  const useAuthStore: {
    (): AuthState; // `useAuthStore()`
    <T>(selector: (state: AuthState) => T): T; // `useAuthStore((s) => s.clearUserAuth)`
  };

  export default useAuthStore;
}
