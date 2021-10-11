import axios from "axios";

export async function signoutAPI(accessToken: string) {
  const URL = `${process.env.REACT_APP_SERVER_BASE_URL}${process.env.REACT_APP_SIGNOUT_URL}`;
  const bodyProps = `access_token=${accessToken}`;
  try {
    const response = await axios.delete(URL, {
      headers: {
        "Content-Type": `${process.env.REACT_APP_SIGNOUT_HEADER_PARAMS}`,
      },
      data: bodyProps,
    });
    return Object(response.data);
  } catch (e) {
    console.log("signoutAPI 요청에서 문제발생: ", e);
    return String(e);
  }
}
