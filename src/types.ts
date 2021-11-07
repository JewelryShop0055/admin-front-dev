import { AxiosRequestConfig } from "axios";
import { OptionsObject } from "notistack";

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

export type AddNewCategory = {
  categoryName: string;
};

export type ProductCategoryList = {
  page: string;
  limit: string;
};

//enums

export enum SnackBarMessageType {
  SUCCESS = "success",
  WARNING = "warning",
  INFO = "info",
  ERROR = "error",
}

export enum ProductType {
  product = "product",
  parts = "parts",
}

export enum ErrorEnvironment {
  SignIn = "SignIn",
  RefreshToken = "RefreshToken",
  SignOut = "SignOut",
  AddNewCategory = "AddNewCategory",
  GetCategoryList = "GetCategoryList",
}

//Params Types

export type SignInParams = {
  userId: string;
  userPassword: string;
};

export type RefreshTokenParams = {
  refreshToken: string;
};

export type AccessTokenParams = {
  accessToken: string;
};

export type AddNewCategoryParams = {
  categoryGroup: ProductType;
  categoryName: string;
};

export type ProductCategoryListParams = {
  categoryGroup: ProductType;
  page: string;
  limit: string;
};

export type SnackBarParams = {
  type: SnackBarMessageType;
  message: string;
  options?: OptionsObject;
};

//Response Types

export type AddNewCategoryResponse = {
  id: number;
  name: string;
  type: string;
  depth: number;
  createdAt: string;
  updatedAt: string;
};

export type getCategoryListResponse = {
  CategoryList: Category[];
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
