import axios, { AxiosResponse } from "axios";

import { getAuthToken } from "../util/auth";

export enum ProductType {
  product = "product",
  parts = "parts",
}

interface NewCategoryProps {
  categoryName: string;
  categoryGroup: ProductType;
}

interface Response {
  id: string;
  name: string;
  type: string;
  depth: string;
  createdAt: string;
  updatedAt: string;
}

export async function addNewCategory({
  categoryName,
  categoryGroup,
}: NewCategoryProps): Promise<Response> {
  const URL = `${process.env.REACT_APP_SERVER_BASE_URL}/admin/category/${categoryGroup}`;
  const accessToken = getAuthToken("user_access_token");
  const bodyProps = {
    name: categoryName,
  };

  const response = await axios.post<string, AxiosResponse<Response>>(
    URL,
    JSON.stringify(bodyProps),
    {
      headers: {
        "Content-Type": `application/json`,
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
}

///===

// const testInstance = (config) =>
//   axios.create({
//     baseURL: "dasdasd/asdjasd",
//     timeout: 20 * 1000,
//     headers: { "X-Custom-Header": `${config.header}` },
//   });
