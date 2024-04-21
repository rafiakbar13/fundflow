import {
  LoginSchemaType,
  RegisterSchemaType,
  UpdateProfileSchemaType,
} from "@/lib/validationForm";
import API from "@/lib/config";
import { get } from "http";

export const register = async ({
  name,
  email,
  password,
}: RegisterSchemaType) => {
  const res = await API.post(`/auth/register`, {
    name,
    email,
    password,
  });
  return res.data.data;
};

export const login = async ({ email, password }: LoginSchemaType) => {
  const res = await API.post(`/auth/login`, {
    email,
    password,
  });
  console.log(res);

  return res.data;
};

export const updateProfile = async ({
  email,
  name,
  photo,
  phone,
  userId,
}: UpdateProfileSchemaType & { userId: String }) => {
  const res = await API.patch(`/user/${userId}`, {
    email,
    name,
    photo,
    phone,
  });
  return res.data.data;
};

export const getProfile = async (userId: string) => {
  const res = await API.get(`/user/${userId}`);
  return res.data.data;
};

//TODO API GOALS
export const getGoals = async (userId: string) => {
  const res = await API.get(`/user/${userId}`);
  return res.data.data;
};

// TODO API Expenses by category
export const getExpenses = async (userId: string) => {
  const res = await API.get(`/user/${userId}`);
  return res.data.data;
};

export const updateExpenses = async ({ expensesId, targetAmount }: any) => {
  const res = await API.patch(`/expenses/${expensesId}`, {
    targetAmount,
  });
  return res.data.data;
};
