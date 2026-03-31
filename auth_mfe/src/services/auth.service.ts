import { api } from "./axios.config";
type role = "ADMIN" | "USER";

export const loginApi = async (email: string, password: string) => {
  console.log("is this is called ");

  const response = await api.post("/auth/login", {
    email,
    password,
  });

  console.log("the response is ", response);

  return response.data;
};

export const registerApi = async (data: {
  email: string;
  password: string;
  role: role;
  name: string;
}) => {
  console.log("is this is called ");

  const response = await api.post("/auth/register", {
    ...data,
  });

  console.log("the response is ", response);

  return response.data;
};

export const logoutApi = async () => {
  console.log("is this is called ");

  const response = await api.get("/auth/logout");

  console.log("the response is ", response);

  return response.data;
};
