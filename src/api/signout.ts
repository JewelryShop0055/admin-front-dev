import axios from "axios";
import { ApiConfigProps } from "../types";
import { axiosInstance } from "./utils/apiForm";

export async function signOut(accessToken: string) {
  const URL = `${process.env.REACT_APP_SERVER_BASE_URL}/admin/account/signout`;
  const bodyProps = `access_token=${accessToken}`;

  const response = await axios.delete(URL, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: bodyProps,
  });
  return response.data;
}

export const deleteAuthToken = async (config: ApiConfigProps) => {
  const response = await axiosInstance(config).delete(
    "/admin/account/signout",
    config.options
  );
  return response.data;
};
