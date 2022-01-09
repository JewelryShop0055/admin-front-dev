import React, { useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import FindIdPassword from "./components/FindIdPassword";

import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import { actions } from "../../store/signIn/slice";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Border, FontSize, Padding } from "../../styleTypes";
import { useDispatch } from "react-redux";

const useStyles = makeStyles(
  createStyles({
    root: {
      width: "500px",
      margin: "auto",

      position: "relative",
      top: "200px",

      display: "grid",
      gridTemplateRows: "60px, 500px",
      gridGap: "20px",
      gridTemplateAreas: `
      "header"
      "container"`,
    },
    header: {
      gridArea: "header",
      fontSize: FontSize.LOGIN_HEADER,
      fontWeight: "bold",

      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      gridArea: "container",
      border: Border.DEFAULT_BORDER,
      borderRadius: "5px",
      padding: Padding.LOGIN_CONTAINER,

      display: "grid",
      gridTemplateRows: "1fr 1fr auto",
      gridGap: "20px",
      gridTemplateAreas: `
      "id"
      "password"
      "buttons"`,
    },
    id: {
      gridArea: "id",
    },
    password: {
      gridArea: "password",
    },
    buttons: {
      gridArea: "buttons",

      display: "flex",
      justifyContent: "space-around",
    },
  })
);

const LoginPage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [userValue, setUserValue] = useState({
    userId: String(process.env.REACT_APP_USER_ID),
    userPassword: String(process.env.REACT_APP_USER_PW),
  });
  const { userId, userPassword } = userValue;

  const handleChangeUserValue: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { name, value } = e.target;
    setUserValue({
      ...userValue,
      [name]: value,
    });
  };

  const [showPassword, setShowPassword] = useState(false);

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
      dispatch(
        actions.getAuthTokenPending({
          userId: userId,
          userPassword: userPassword,
        })
      );
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>Laviluz Admin Page</div>

      <form className={classes.container} onKeyPress={handleKeyPress}>
        <FormControl className={classes.id} variant="outlined">
          <InputLabel htmlFor="id">ID</InputLabel>
          <OutlinedInput
            name="userId"
            value={userId}
            onChange={handleChangeUserValue}
            labelWidth={20}
          />
        </FormControl>

        <FormControl className={classes.password} variant="outlined">
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            name="userPassword"
            type={showPassword ? "text" : "password"}
            value={userPassword}
            onChange={handleChangeUserValue}
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

        <div className={classes.buttons}>
          <Button
            variant="outlined"
            color="primary"
            onClick={async () => {
              dispatch(
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
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
