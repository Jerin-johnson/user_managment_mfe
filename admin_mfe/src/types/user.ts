export interface User {
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

export interface UserFormData {
  name: string;
  email: string;
  phone: string;
  role: "admin" | "moderator" | "user";
  status: "active" | "inactive";
  address: string;
  password?: string;
}
