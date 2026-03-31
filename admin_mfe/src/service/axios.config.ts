import axios from "axios";

export const api = axios.create({
  baseURL: "http://mfe.local/api",
  withCredentials: true,
});
