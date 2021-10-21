import axios from "axios";

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
