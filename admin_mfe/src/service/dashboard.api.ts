import { api } from "./axios.config";

export const dashboardApi = async () => {
  console.log("is this is called ");

  const response = await api.get("/reports/users");

  console.log("the response is ", response);

  return response.data;
};

export const getUserProfileDetails = async () => {
  console.log("is this is called ");

  const response = await api.get("/admin/me");

  return response.data;
};
