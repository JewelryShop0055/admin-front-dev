import React from "react";

interface ErrorPage {
  url: string;
}

const Error404: React.FC<ErrorPage> = () => {
  return (
    <>
      <ul>Error 404</ul>
      <ul>잘못된 페이지 접근입니다.</ul>
    </>
  );
};

export default Error404;
