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
  const res = await API.get(`/fundflow/expenses/${userId}`);
  return res.data.data;
};

export const createExpenses = async ({ userId, name, budget }: any) => {
  const res = await API.post(`/fundflow/expenses/${userId}`, {
    name,
    budget,
  });
  return res.data;
};

export const updateExpenses = async ({ expensesId, targetAmount }: any) => {
  const res = await API.patch(`/expenses/${expensesId}`, {
    targetAmount,
  });
  return res.data.data;
};

// TODO API Accounts
export const getAccounts = async (userId: string) => {
  const res = await API.get(`/fundflow/${userId}/accounts`);
  console.log(res);

  return res.data.data;
};

export const getAccount = async (accountId: string) => {
  const res = await API.get(`/fundflow/accounts/${accountId}`);
  return res.data.data;
};

export const createAccount = async ({
  bankName,
  accountNumber,
  type,
  balance,
  userId,
}: any) => {
  const res = await API.post(`/fundflow/${userId}/accounts`, {
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
  const res = await API.patch(`/fundflow/accounts/${accountId}`, {
    bankName,
    accountNumber,
    type,
    balance,
  });
  console.log(res.data);

  return res.data;
};

export const deleteAccount = async (accountId: string) => {
  const res = await API.delete(`/fundflow/accounts/${accountId}`);
  return res.data;
};

// TODO API Bills
export const getBills = async (userId: string) => {
  const res = await API.get(`/fundflow/bills/${userId}`);
  return res.data.data;
};

export const createBills = async ({ userId, name, amount, dueDate }: any) => {
  const res = await API.post(`/fundflow/bills/${userId}`, {
    name,
    amount,
    dueDate,
  });
  return res.data;
};

export const deleteBills = async (billsId: string) => {
  const res = await API.delete(`/fundflow/bills/${billsId}`);
  return res.data;
};

export const updateBills = async ({ billsId, name, amount, dueDate }: any) => {
  const res = await API.put(`/fundflow/bills/${billsId}`, {
    name,
    amount,
    dueDate,
  });
  console.log(res);

  return res.data;
};

// Todo Transactions

export const createTransactions = async ({
  userId,
  items,
  amount,
  type,
  status,
  date,
  paymentMethod,
  accountId,
}: any) => {
  const res = await API.post(`/fundflow/transactions/${userId}`, {
    items,
    amount,
    type,
    status,
    date,
    paymentMethod,
    accountId,
  });
  return res.data;
};

export const getTransactions = async (userId: string) => {
  const res = await API.get(`/fundflow/transactions/${userId}`);
  return res.data;
};

export const getTransactionsByType = async (userId: string, type: string) => {
  const res = await API.get(`/fundflow/transactions/${userId}?type=${type}`);
  return res.data;
};

// export const getExpenses = async (userId: string, type: string) => {
//   const res = await API.get(`/fundflow/transactions/${userId}?type=${type}`);
//   return res.data;
// };

export const deleteTransactions = async (transactionsId: string) => {};
