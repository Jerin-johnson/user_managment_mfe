import { useQuery } from "@tanstack/react-query";
import { getSingleUserApi, getUsersListingApi } from "../service/user.api";

type User = {
  _id: string;
  authUserId: number;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export const useUsersData = () => {
  return useQuery<User[]>({
    queryKey: ["users:listing"],
    queryFn: getUsersListingApi,
  });
};

export const useUserDetailData = (id: number) => {
  return useQuery<User>({
    queryKey: ["users:listing", id],
    queryFn: async () => await getSingleUserApi(id),
  });
};
