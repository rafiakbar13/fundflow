import { authContext } from "@/context/AuthContext";
import axios, { AxiosInstance } from "axios";
import { useContext } from "react";
const baseUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: baseUrl,
});

const useAuthInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (request) => {
      const token = localStorage.getItem("token");
      if (token) {
        request.headers.Authorization = `Bearer ${token}`;
      }
      console.log("request sent");

      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

useAuthInterceptor(api);

export default api;
