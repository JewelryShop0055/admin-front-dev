import { AxiosRequestConfig } from "axios";

export type AuthToken = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
};

export type SignIn = {
  userId: string;
  userPassword: string;
};

export type RefreshToken = {
  refreshToken: string;
};

export type SignInParams = {
  userId: string;
  userPassword: string;
};

export type RefreshTokenParams = {
  refreshToken: string;
};

export type Category = {
  id: number;
  name: string;
  type: string;
  depth: number;
  createdAt: string;
  updatedAt: string;
};

type AxiosHeaderProps = {
  Authorization: string;
};

export type ApiConfigProps = {
  contentsType?: string;
  options?: AxiosRequestConfig; // 이거는 이제 bodyprops를 만들기위한것 이외에만 사용하게해야함
  headers?: AxiosHeaderProps;

  //category URL Query
  categoryGroup?: string;
  page?: number;
  limit?: number;
};

export enum ErrorEnvironment {
  SignIn = "SignIn",
  RefreshToken = "RefreshToken",
}
