export interface User {
  id: string | number;
  name: string;
  email: string;
  role: string;
  status?: "active" | "inactive";
  createdAt?: string;
}

export const MOCK_USERS: User[] = [
  { id: 1, name: "Alice Martin", email: "alice@example.com", role: "ADMIN" },
  { id: 2, name: "Bob Chen", email: "bob@example.com", role: "USER" },
  { id: 3, name: "Carol Smith", email: "carol@example.com", role: "USER" },
  { id: 4, name: "Dan Lee", email: "dan@example.com", role: "MODERATOR" },
  { id: 5, name: "Eva Kim", email: "eva@example.com", role: "USER" },
  { id: 6, name: "Frank Doe", email: "frank@example.com", role: "USER" },
  { id: 7, name: "Grace Ho", email: "grace@example.com", role: "ADMIN" },
  { id: 8, name: "Hank Yu", email: "hank@example.com", role: "USER" },
];

export const GROWTH_DATA = [
  { month: "Oct", users: 120 },
  { month: "Nov", users: 198 },
  { month: "Dec", users: 260 },
  { month: "Jan", users: 391 },
  { month: "Feb", users: 487 },
  { month: "Mar", users: 612 },
];

export const SIGNUP_DATA = [
  { day: "Mon", signups: 14 },
  { day: "Tue", signups: 31 },
  { day: "Wed", signups: 22 },
  { day: "Thu", signups: 47 },
  { day: "Fri", signups: 38 },
  { day: "Sat", signups: 19 },
  { day: "Sun", signups: 11 },
];
