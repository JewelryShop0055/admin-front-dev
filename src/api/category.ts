import axios from "axios";
import { getAuthToken } from "../util/auth";

interface NewCategoryProps {
  categoryName: string;
}

export async function addNewCategoryAPI(categoryName: string) {
  const URL = `${process.env.REACT_APP_SERVER_BASE_URL}${process.env.REACT_APP_ADD_NEW_CATEGORY_URL}/product`;
  const accessToken = getAuthToken("user_access_token");
  const bodyProps = {
    name: categoryName,
  };
  try {
    const response = await axios.post(URL, JSON.stringify(bodyProps), {
      headers: {
        "Content-Type": `${process.env.REACT_APP_ADD_NEW_CATEGORY_PARAMS}`,
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return Object(response.data);
  } catch (e) {
    console.log("addNewCategoryAPI 요청에서 문제발생", e);
    return String(e);
  }
}
