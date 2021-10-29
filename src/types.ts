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
  token: string;
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
  contentsType: string;
  options?: AxiosRequestConfig<string>;
  headers?: AxiosHeaderProps;

  //category URL Query
  categoryGroup?: string;
  page?: number;
  limit?: number;
};
