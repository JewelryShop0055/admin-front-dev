import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FindIdPassword from "./components/FindIdPassword";

import {
  ButtonBlock,
  InputBlock,
  LoginBlock,
} from "./components/LoginBlock_styled";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import { useAppDispatch } from "../../modules/hooks";
import { actions } from "../../store/signIn/slice";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

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

  const [userId, setUserId] = useState(String(process.env.REACT_APP_USER_ID));
  const [userPassword, setUserPassword] = useState(
    String(process.env.REACT_APP_USER_PW)
  );
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useAppDispatch();

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

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleKeyPress: React.KeyboardEventHandler<HTMLFormElement> = async (
    e
  ) => {
    if (e.key === "Enter") {
      await dispatch(
        actions.getAuthTokenPending({
          userId: userId,
          userPassword: userPassword,
        })
      );
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
            <FormControl variant="outlined">
              <InputLabel htmlFor="id">ID</InputLabel>
              <OutlinedInput
                id="outlined-adornment-id"
                value={userId}
                onChange={handleChangeId}
                labelWidth={70}
              />
            </FormControl>

            <FormControl variant="outlined">
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                value={userPassword}
                onChange={handleChangePassword}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>

            <ButtonBlock className={classes.button}>
              <Button
                variant="outlined"
                color="primary"
                onClick={async () => {
                  await dispatch(
                    actions.getAuthTokenPending({
                      userId: userId,
                      userPassword: userPassword,
                    })
                  );
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
