import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import Signup from "./Signup";
import { Link, Route } from "react-router-dom";
import { LoginAPI, LoginAPI_axios, LoginToken } from "../../api/login";

import test from "../../localTestData.json";
import { saveAuthToken } from "../../util/auth";
import Cookies from "universal-cookie";

const LoginBlock = styled.div`
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const InputBlock = styled.div`
  border: 0.5px solid black;
  border-radius: 5px;
  width: 512px;
  height: 280px;

  padding-top: 30px;
`;

const ButtonBlock = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;

  &:not(:first-child) {
    margin: 10px;
    padding: 20px;
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "45ch",
    },
  },
  button: {
    "& > *": {
      margin: theme.spacing(3),
    },
  },
}));

interface LoginProps {
  children: React.ReactElement;
  userId: string;
  userPassword: string;
}

const Login: React.FC<LoginProps> = () => {
  const classes = useStyles();
  const baseURL = "http://localhost:3000/";

  const [userId, setUserId] = useState("shopoperator");
  const [userPassword, setUserPassword] = useState("sh0pOperatorTmpPwd");

  const handleChangeId: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { value } = e.target;
    setUserId(value);
  };

  const handleChangePassword: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { value } = e.target;
    setUserPassword(value);
  };

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    console.log("ID입력값:", userId);
    console.log("PW입력값:", userPassword);
    console.log("클릭해서 로그인");

    if (!userId || !userPassword) {
      alert("아이디 또는 비밀번호를 입력해주세요");
    } else {
      const props = { userId, userPassword };
      async function getToken(props: object) {
        await LoginAPI(props);
        if (LoginToken.access_token === "" || LoginToken.refresh_token === "") {
          console.log("토큰미발급");
          setUserId("");
          setUserPassword("");
          alert("아이디 또는 비밀번호가 잘못되었습니다.");
        } else {
          saveAuthToken(LoginToken);
          return (window.location.href = baseURL + "TodaysChecklist");
        }
      }
      getToken(props);

      console.log("response", LoginToken);
    }
  };

  const handleKeyPress: React.KeyboardEventHandler<HTMLFormElement> = async (
    e
  ) => {
    if (e.key === "Enter") {
      console.log("ID입력값:", userId);
      console.log("PW입력값:", userPassword);
      console.log("엔터로 로그인");

      if (!userId || !userPassword) {
        alert("아이디 또는 비밀번호를 입력해주세요");
      }

      const token = await LoginAPI_axios({ userId, userPassword });
      document.cookie = "user=admin; max-age=3599; samesite=lax;" + token.data;
      console.log(token);
    }
  };

  return (
    <>
      <LoginBlock>
        <h1>Laviluz Admin Page</h1>

        <InputBlock>
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            // onSubmit={handleSubmit}
            onKeyPress={handleKeyPress}
          >
            <TextField
              id="outlined-basic"
              label="ID"
              variant="outlined"
              name="id"
              onChange={handleChangeId}
              value={userId}
            />
            <TextField
              id="outlined-basic"
              label="PASSWORD"
              variant="outlined"
              name="password"
              onChange={handleChangePassword}
              value={userPassword}
            />

            <ButtonBlock className={classes.button}>
              <Button variant="outlined" color="primary" onClick={handleClick}>
                SIGN IN
              </Button>

              <Signup />
            </ButtonBlock>
          </form>
        </InputBlock>
      </LoginBlock>
    </>
  );
};

export default Login;
