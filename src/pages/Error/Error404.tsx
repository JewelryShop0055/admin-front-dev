import React, { useState } from "react";

interface ErrorPage {
  url: string;
}

const Error404: React.FC<ErrorPage> = () => {
  setTimeout(() => {
    window.location.href = "http://localhost:3000/";
  }, 3000);

  return (
    <>
      <ul>Error 404</ul>
      <ul>잘못된 페이지 접근입니다.</ul>
      <ul>잠시 후 로그인 페이지로 이동합니다.</ul>
    </>
  );
};

export default Error404;
