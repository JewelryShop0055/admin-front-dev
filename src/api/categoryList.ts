import axios, { AxiosResponse } from "axios";
import { ApiConfigProps } from "../types";

import { getAuthTokenFromCookies } from "../util/auth";
import { axiosInstance } from "./utils/apiForm";

export enum ProductType {
  product = "product",
  parts = "parts",
}

interface NewCategoryProps {
  page?: number;
  limit?: number;
  categoryGroup: ProductType;
}

interface ResponseElements {
  id: number;
  name: string;
  type: string;
  depth: number;
  createdAt: string;
  updatedAt: string;
}

interface Response {
  categoryList: Array<ResponseElements>[];
}

export async function getCategoryList({
  page = 0,
  limit = 10,
  categoryGroup,
}: NewCategoryProps): Promise<Response> {
  const URL = `${process.env.REACT_APP_SERVER_BASE_URL}/admin/category/${categoryGroup}?page=${page}&limit=${limit}`;
  const accessToken = getAuthTokenFromCookies("user_access_token");

  const response = await axios.get<string, AxiosResponse<Response>>(URL, {
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
}

const callApi = (config: ApiConfigProps) => {
  const instance = axiosInstance(config);
  console.log(instance);
  return instance;
};

export const getCategoryList_New = async (config: ApiConfigProps) => {
  const response = await callApi(config).get(
    // `/admin/category/product?page=${config.page}&limit=${config.limit}`
    `/admin/category/product?page=0&limit=10`
  );
  console.log(response);
  return response;
};
