import fetch from "unfetch";
import useSWR from "swr";

const url = "http://localhost:3001/admin/auth/token";
const fetcher = (url: string) =>
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: "username=shopoperato&password=sh0pOperatorTmpPwd&client_id=shopClient&client_secret=shopClient1234&scope=operator&grant_type=password",
  }).then((res) => res.json());

export function TestPage() {
  const url = "http://localhost:3001/admin/auth/token";
  const fetcher = (url: string) =>
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: "username=shopoperator&password=sh0pOperatorTmpPwd&client_id=shopClient&client_secret=shopClient1234&scope=operator&grant_type=password",
    }).then((res) => res.json());
  const { data, error } = useSWR(
    "http://localhost:3001/admin/auth/token",
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  console.log(data);
  // 데이터 렌더링
  return (
    <div>
      <div>{data.refresh_token}</div>
      <div>{data.access_token}</div>
    </div>
  );
}
