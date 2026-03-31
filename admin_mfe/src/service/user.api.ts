import { api } from "./axios.config";

export const getUsersListingApi = async () => {
  console.log("is this is called ");

  const response = await api.get("/admin/users");

  return response.data;
};

export const getSingleUserApi = async (id: number) => {
  console.log("is this is called ");

  const response = await api.get(`/admin/users/${id}`);

  return response.data;
};

export const editUserAPi = async (
  id: number,
  data: {
    name: string;
    email: string;
    role: "ADMIN" | "USER";
    isActive: boolean;
  },
) => {
  console.log("is this is called  cc sdcnsfnd", data);

  const response = await api.put(`/admin/users/${id}`, {
    ...data,
  });

  return response.data;
};

export const blockOrUnblockApi = async (id: number) => {
  const response = await api.patch(`/admin/users/${id}`);

  return response.data;
};
