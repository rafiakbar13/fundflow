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

export const createGoals = async ({
  userId,
  targetAmount,
  presentAmount,
  dateRange,
}: any) => {
  const res = await API.post(`/goal/${userId}`, {
    targetAmount,
    presentAmount,
    dateRange,
  });
  console.log(res);

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

// TODO API Accounts
export const getAccounts = async (userId: string) => {
  const res = await API.get(`/accounts/${userId}`);
  console.log(res);

  return res.data.data;
};

export const getAccount = async (accountId: string) => {
  const res = await API.get(`/accounts/${accountId}`);
  console.log(res);

  return res.data.data;
};

export const createAccount = async ({
  bankName,
  accountNumber,
  type,
  balance,
  userId,
}: any) => {
  const res = await API.post(`/accounts/${userId}`, {
    bankName,
    accountNumber,
    type,
    balance,
  });

  return res.data;
};

export const updateAccount = async ({
  accountId,
  bankName,
  accountNumber,
  type,
  balance,
}: any) => {
  const res = await API.patch(`/accounts/${accountId}`, {
    bankName,
    accountNumber,
    type,
    balance,
  });
  return res.data.data;
};
