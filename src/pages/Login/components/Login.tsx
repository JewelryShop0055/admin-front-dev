import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import Signup from "./FindIdAndPassword";

import { LoginAPI } from "../../../api/login";

import { saveAuthToken } from "../../../util/auth";
import { StyledLink } from "../../../components/StyledLink";

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

const Login: React.FC = () => {
  const classes = useStyles();
  const baseURL = `${process.env.REACT_APP_CLIENT_BASE_URL}`;

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

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    console.log("ID입력값:", userId);
    console.log("PW입력값:", userPassword);
    console.log("클릭해서 로그인");

    if (!userId || !userPassword) {
      alert("아이디 또는 비밀번호를 입력해주세요");
    }

    const token = await LoginAPI({ userId, userPassword });
    await saveAuthToken(token.access_token, token.refresh_token);

    // window.location.href = baseURL + "/TodaysChecklist";
    // e.preventDefault();
  };

  const handleKeyPress: React.KeyboardEventHandler<HTMLFormElement> = async (
    e
  ) => {
    if (e.key === "Enter") {
      console.log("ID입력값:", userId);
      console.log("PW입력값:", userPassword);
      console.log("엔터로 로그인");
    }

    if (!userId || !userPassword) {
      alert("아이디 또는 비밀번호를 입력해주세요");
    }

    const token = await LoginAPI({ userId, userPassword });
    await saveAuthToken(token.access_token, token.refresh_token);
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
                <StyledLink to="/TodaysChecklist">SIGN IN</StyledLink>
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
