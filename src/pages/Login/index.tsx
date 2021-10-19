import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FindIdPassword from "./components/FindIdPassword";

import {
  ButtonBlock,
  InputBlock,
  LoginBlock,
} from "./components/LoginBlock_styled";
import { signinEvent } from "./components/signinEvent";
import { SigninButton } from "./components/debounceButton";
import { useHistory } from "react-router-dom";

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
      await signinEvent(userId, userPassword, setUserId, setUserPassword);
      return history.replace("/TodaysChecklist");
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
              <SigninButton
                onClick={async () => {
                  await new Promise(async (resolve) => {
                    await signinEvent(
                      userId,
                      userPassword,
                      setUserId,
                      setUserPassword
                    );
                    history.replace("/TodaysChecklist");
                    setTimeout(resolve, 500);
                  });
                }}
              >
                SIGN IN
              </SigninButton>

              <FindIdPassword />
            </ButtonBlock>
          </form>
        </InputBlock>
      </LoginBlock>
    </>
  );
};

export default LoginPage;
