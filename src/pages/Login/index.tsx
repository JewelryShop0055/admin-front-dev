import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FindIdPassword from "./components/FindIdPassword";

import {
  ButtonBlock,
  InputBlock,
  LoginBlock,
} from "./components/LoginBlock_styled";
import { Authorized } from "./components/Authentication";
import {} from "./components/AsyncButton";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";

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

const LoginPage: React.FC = () => {
  const classes = useStyles();

  const [userId, setUserId] = useState("shopoperator");
  const [userPassword, setUserPassword] = useState("sh0pOperatorTmpPwd");

  const [timer, setTimer] = useState(0);

  const history = useHistory();

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

  const handleKeyPress: React.KeyboardEventHandler<HTMLFormElement> = async (
    e
  ) => {
    if (e.key === "Enter") {
      // const signInAble = await signinEvent(
      //   userId,
      //   userPassword,
      //   setUserId,
      //   setUserPassword
      // );
      // if (signInAble) {
      //   history.replace("/TodaysChecklist");
      // }
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
              <Button
                variant="outlined"
                color="primary"
                onClick={async (e) => {
                  if (timer) {
                    clearTimeout(timer);
                  }
                  const newTimer = window.setTimeout(async () => {
                    try {
                      const signInAble = await Authorized(
                        userId,
                        userPassword,
                        setUserId,
                        setUserPassword
                      );
                      if (signInAble) {
                        history.push("/TodaysChecklist");
                      }
                    } catch (e) {
                      console.error("error", e);
                    }
                  }, 300);
                  setTimer(newTimer);
                }}
              >
                SIGN IN
              </Button>

              <FindIdPassword />
            </ButtonBlock>
          </form>
        </InputBlock>
      </LoginBlock>
    </>
  );
};

export default LoginPage;
