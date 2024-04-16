import axios from "axios";
import {
  LoginSchemaType,
  RegisterSchemaType,
  UpdateProfileSchemaType,
} from "@/lib/validationForm";
const baseUrl: string = import.meta.env.VITE_API_URL;

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

export const updateProfile = async ({
  email,
  name,
  photo,
  phone,
}: UpdateProfileSchemaType) => {
  const res = await axios.put(
    `${baseUrl}/user/:id`,
    {
      email,
      name,
      photo,
      phone,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return res.data.data;
};
