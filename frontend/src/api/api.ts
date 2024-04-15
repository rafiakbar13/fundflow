import axios from "axios";
import { LoginSchemaType, RegisterSchemaType } from "@/lib/validationForm";
const baseUrl = import.meta.env.VITE_API_URL;

export const register = async ({
  name,
  email,
  password,
}: RegisterSchemaType) => {
  const res = await axios.post(`${baseUrl}/auth/register`, {
    name,
    email,
    password,
  });
  return res.data.data;
};

export const login = async ({ email, password }: LoginSchemaType) => {
  const res = await axios.post(`${baseUrl}/auth/login`, {
    email,
    password,
  });
  return res.data.data;
};
