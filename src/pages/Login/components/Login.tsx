import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Signup from "./FindIdAndPassword";

// import { Link } from "react-router-dom";

import { ButtonBlock, InputBlock, LoginBlock } from "./LoginBlock_styled";
import { signinEvent } from "./signinEvent";
import { SigninButton } from "./debounceButton";

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

  const handleKeyPress: React.KeyboardEventHandler<HTMLFormElement> = async (
    e
  ) => {
    if (e.key === "Enter") {
      signinEvent(userId, userPassword, setUserId, setUserPassword);
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
                  await new Promise((resolve) => {
                    signinEvent(
                      userId,
                      userPassword,
                      setUserId,
                      setUserPassword
                    );
                    setTimeout(resolve, 500);
                  });
                }}
              >
                SIGN IN
              </SigninButton>

              <Signup />
            </ButtonBlock>
          </form>
        </InputBlock>
      </LoginBlock>
    </>
  );
};

export default Login;
