import { axiosInstance } from "./axios";
import { AuthUser } from "./models/auth-user";

interface IUserCreate {
  displayName: string;
  email: string;
  password: string;
}

const login = async (email: string, password: string) => {
  return await axiosInstance.post("/api/auth/local", {
    identifier: email,
    password,
  });
};

const createUser = async (user: IUserCreate) => {
  return await axiosInstance.post("/api/users", user);
};

const sendConfirmation = async (email: string) => {
  return await axiosInstance.post("/api/auth/send-email-confirmation", {
    email,
  });
};

const sendForgotPasswordEmail = async (email: string) => {
  return await axiosInstance.post("/api/auth/forgot-password", {
    email,
  });
};

const resetPassword = async (
  code: string,
  password: string,
  passwordConfirmation: string
) => {
  return await axiosInstance.post("/api/auth/reset-password", {
    code,
    password,
    passwordConfirmation,
  });
};

const getUser = async (id: string) => {
  return await axiosInstance.get<AuthUser>(`/api/users/${id}`);
};

const getUserByEmail = async (email: string) => {
  return await axiosInstance.get<AuthUser[]>(
    `/api/users?filters[email][$eq]=${email}`
  );
};

export const Auth = {
  login,
  createUser,
  sendConfirmation,
  getUser,
  sendForgotPasswordEmail,
  resetPassword,
  getUserByEmail,
};
