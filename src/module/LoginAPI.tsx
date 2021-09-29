import test from "../localTestData.json";

interface LoginProps {
  userId: string;
  userPassword: string;
  baseURL: string;
}

export function LoginAPI({ baseURL, userId, userPassword }: LoginProps) {
  const response = {
    access_token: "",
    token_type: "",
    expires_in: 0,
    refresh_token: "",
  };
  const URI = baseURL + test.loginURI;
  const bodyProps = `username=${userId}&password=${userPassword}&client_id=shopClient&client_secret=shopClient1234&scope=operator&grant_type=password`;

  fetch(URI, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: bodyProps,
  })
    .then((res) => res.json())
    .then((data) => {
      response.access_token = data.access_token;
      response.expires_in = data.expires_in;
      response.refresh_token = data.refresh_token;
      console.log("response");
      console.log(data);
    });

  return response;
}
