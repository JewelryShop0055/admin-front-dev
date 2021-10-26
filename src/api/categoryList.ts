import axios, { AxiosResponse } from "axios";

import { getAuthToken } from "../util/auth";
import { createAxiosInstance } from "./utils/apiForm";

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
  const accessToken = getAuthToken("user_access_token");

  const response = await axios.get<string, AxiosResponse<Response>>(URL, {
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
}

interface ConfigProps {
  options?: object;
  token?: string;
  categoryGroup?: string;
  page?: number;
  limit?: number;
  headers: object;
}

const callApi = (config: ConfigProps) => {
  const instance = createAxiosInstance(config);
  console.log(instance);
  return instance;
};

export const getCategoryList_New = async (config: ConfigProps) => {
  const response = await callApi(config).get(
    `/admin/category/${config.categoryGroup}?page=${config.page}&limit=${config.limit}`
  );
  console.log(response);
  return response;
};
