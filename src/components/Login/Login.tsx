import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Stack from "@mui/material/Stack";
import styled from "styled-components";
import Signup from "./Signup";
import { Link, Route } from "react-router-dom";
import { LoginAPI, LoginToken } from "../../api/login";

import test from "../../localTestData.json";

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
  height: 260px;

  padding-top: 20px;
`;

const ButtonBlock = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;

  padding-top: 30px;

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
}));

//RouteIf를 이용한 임시 로그인체크
// => ID와 PASSWORD항목을 아예 따로 분류해서 상태정리해야함 + id, pw는 정규식처리를 통해 영문, ~!@#$%^&*() 특문 외의 문자입력시 영어로 입력중이 아니라는것을 알리기

interface LoginProps {
  children: React.ReactElement;
  userId: string;
  userPassword: string;
}

//tsx로 써야 JSX:ELEMENT로 fn 결과값이 출력
const Login: React.FC<LoginProps> = () => {
  const classes = useStyles();
  const thisURL = document.location.href;

  //useState에서 initialate값을 ""로 지정해서 자동 string지정이 되었다.
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
          return (window.location.href = thisURL + "TodaysChecklist");
        }
      }
      getToken(props);

      console.log("response", LoginToken);
    }
  };

  const handleKeyPress: React.KeyboardEventHandler<HTMLFormElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      console.log("ID입력값:", userId);
      console.log("PW입력값:", userPassword);
      console.log("엔터로 로그인");

      if (!userId || !userPassword) {
        alert("아이디 또는 비밀번호를 입력해주세요");
      } else {
        const props = { userId, userPassword };
        async function getToken(props: object) {
          await LoginAPI(props);
          if (
            LoginToken.access_token === "" ||
            LoginToken.refresh_token === ""
          ) {
            console.log("토큰미발급");
            setUserId("");
            setUserPassword("");
            alert("아이디 또는 비밀번호가 잘못되었습니다.");
          } else {
            return (window.location.href = thisURL + "TodaysChecklist");
          }
        }
        getToken(props);

        console.log("response", LoginToken);
      }
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

            <ButtonBlock>
              <Stack direction="row" spacing={10}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleClick}
                >
                  Log in
                </Button>

                <Signup />
              </Stack>
            </ButtonBlock>
          </form>
        </InputBlock>
      </LoginBlock>
    </>
  );
};

export default Login;
