import axios from "axios";
import { getAuthToken } from "../util/auth";

export enum ProductType {
  product = "product",
  parts = "parts",
}
export async function addNewCategoryAPI(
  categoryName: string,
  categoryGroup: ProductType
) {
  const URL = `${process.env.REACT_APP_SERVER_BASE_URL}/admin/category/${categoryGroup}`;
  const accessToken = getAuthToken("user_access_token");
  const bodyProps = {
    name: categoryName,
  };
  try {
    const response = await axios.post(URL, JSON.stringify(bodyProps), {
      headers: {
        "Content-Type": `application/json`,
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(Object(response.data));
    return Object(response.data);
  } catch (e) {
    console.log("addNewCategoryAPI 요청에서 문제발생", e);
    return e;
  }
}
