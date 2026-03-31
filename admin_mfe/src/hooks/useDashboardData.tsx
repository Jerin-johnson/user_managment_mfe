import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "../service/dashboard.api";

type RoleStat = {
  role: "ADMIN" | "USER" | "MODERATOR";
  count: number;
};

type DashboardResponse = {
  totalUsers: number;
  roleStats: RoleStat[];
  growthData: {
    month: string;
    users: number;
  }[];
  signupData: {
    day: string;
    signups: number;
  }[];
};

export const useDashboardData = () => {
  return useQuery<DashboardResponse>({
    queryKey: ["dashboard"],
    queryFn: dashboardApi,
  });
};
