export default interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "moderator" | "user";
  status: "active" | "inactive";
  createdAt: string;
  address?: string;
  avatarUrl?: string;
}
