import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Signup from "./FindIdAndPassword";

import { saveAuthToken } from "../../../util/auth";
import { StyledLink } from "../../../components/StyledLink";
// import { Link } from "react-router-dom";
import { refreshTokenAPI, signinAPI } from "../../../api/signin";
import { ButtonBlock, InputBlock, LoginBlock } from "./LoginBlock_styled";
import { Link } from "@material-ui/core";

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
    if (!userId || !userPassword) {
      alert("아이디 또는 비밀번호를 입력해주세요");
    } else {
      const token = await signinAPI({ userId, userPassword });
      await saveAuthToken(token.access_token, token.refresh_token);
    }
  };

  // const handleClickTest: React.MouseEventHandler<HTMLButtonElement> = async (
  //   e
  // ) => {
  //   const res = await refreshTokenAPI();
  //   console.log("토큰재발급", res);
  //   if (res.access_token !== undefined && res.refresh_token !== undefined) {
  //     await saveAuthToken(res.access_token, res.refresh_token);
  //   }
  // };

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
      const token = await signinAPI({ userId, userPassword });
      if (
        token.access_token !== undefined &&
        token.refresh_token !== undefined
      ) {
        await saveAuthToken(token.access_token, token.refresh_token);
      } else {
        setUserId("");
        setUserPassword("");
        alert("아이디 또는 비밀번호가 틀렸습니다");
      }
    }

    // return <Link to="/TodaysChecklist" />;
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
              {/* <StyledLink to="/TodaysChecklist"> */}
              <Button variant="outlined" color="primary" onClick={handleClick}>
                SIGN IN
              </Button>
              {/* </StyledLink> */}

              {/* <Button
                variant="outlined"
                color="primary"
                onClick={handleClickTest}
              >
                테스트용 버튼
              </Button> */}

              <Signup />
            </ButtonBlock>
          </form>
        </InputBlock>
      </LoginBlock>
    </>
  );
};

export default Login;
