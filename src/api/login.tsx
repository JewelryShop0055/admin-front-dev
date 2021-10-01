import fetch from "unfetch";
import useSWR from "swr";
import test from "../localTestData.json";

interface LoginProps {
  userId?: string;
  userPassword?: string;
}

export const LoginToken = {
  access_token: "",
  token_type: "",
  expires_in: 0,
  refresh_token: "",
};

export async function LoginAPI({ userId, userPassword }: LoginProps) {
  const URI = test.baseServerURL + test.loginURI;
  const bodyProps = `username=${userId}&password=${userPassword}&client_id=shopClient&client_secret=shopClient1234&scope=operator&grant_type=password`;

  await fetch(URI, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: bodyProps,
  })
    .then((res) => res.json())
    .then((data) => {
      LoginToken.access_token = data.access_token;
      LoginToken.expires_in = data.expires_in;
      LoginToken.refresh_token = data.refresh_token;
      LoginToken.token_type = data.token_type;
    });
}

// export function TokenCaching() {
//   const url = test.baseServerURL + test.loginURI;
//   const { data, error, mutate } = useSWR(url, LoginAPI);

//   if (mutate) return mutate;
//   if (error) {
//     console.log("SWR 에러발생", error);
//     return error;
//   }
//   if (!data) return <div>로딩중</div>;

//   console.log(data);
//   return data;
// }
