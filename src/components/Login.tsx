import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import Signup from "./Signup";
import { Link, RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps {}

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
  height: 450px;

  padding-top: 20px;

  div:nth-child(2) {
    margin-bottom: 10px;
  }
`;

const KakaoLoginButton = withStyles({
  root: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: "6px 12px",
    border: "1px solid",
    lineHeight: 1.5,
    fontWeight: "bold",
    color: "rgba(0,0,0,1)",
    backgroundColor: "rgba(251,229,77,1)",
    borderColor: "rgba(176,182,221,1)",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      backgroundColor: "rgba(251,229,77,1)",
      borderColor: "none",
      boxShadow: "rgba(0,0,0,1)",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "rgba(251,229,77,1)",
      borderColor: "none",
    },
  },
})(Button);

const NaverLoginButton = withStyles({
  root: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: "6px 12px",
    border: "1px solid",
    lineHeight: 1.5,
    color: "#ffffff",
    fontWeight: "bold",
    WebkitTextStrokeWidth: "0.01px",
    WebkitTextStrokeColor: "rgba(0,0,0,1)",
    backgroundColor: "rgba(0,195,0,1)",
    borderColor: "rgba(176,182,221,1)",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      backgroundColor: "rgba(0,195,0,1)",
      borderColor: "none",
      boxShadow: "rgba(0,0,0,1)",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "rgba(0,195,0,1)",
      borderColor: "none",
    },
  },
})(Button);

const GoogleLoginButton = withStyles({
  root: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: "6px 12px",
    border: "1px solid",
    lineHeight: 1.5,
    color: "rgba(0,0,0,1)",
    fontWeight: "bold",
    backgroundColor: "rgba(255,255,255,1)",
    borderColor: "rgba(176,182,221,1)",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      backgroundColor: "rgba(255,255,255,1)",
      borderColor: "none",
      boxShadow: "rgba(0,0,0,1)",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "rgba(255,255,255,1)",
      borderColor: "none",
    },
  },
})(Button);

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "45ch",
    },
  },
  btnStyle: {
    "& > *": {
      margin: theme.spacing(3),
      width: "20ch",
    },
  },
  authBtnStyle: {
    "& > *": {
      margin: theme.spacing(1),
      width: "33ch",
    },
  },
}));

function Login({}: Props) {
  const classes = useStyles();
  return (
    <>
      <LoginBlock>
        <h1>Laviluz Admin Page</h1>

        <InputBlock>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField id="outlined-basic" label="ID" variant="outlined" />
            <TextField
              id="outlined-basic"
              label="PASSWORD"
              variant="outlined"
            />
          </form>
          <div className={classes.btnStyle}>
            <Button variant="outlined" color="primary">
              <Link to="/ReserveManage">Log in</Link>
            </Button>

            <Signup />
          </div>

          <div className={classes.authBtnStyle}>
            <KakaoLoginButton variant="contained" color="primary" disableRipple>
              카카오톡으로 로그인
            </KakaoLoginButton>
            <br />
            <NaverLoginButton variant="contained" color="primary" disableRipple>
              네이버로 로그인
            </NaverLoginButton>
            <br />
            <GoogleLoginButton
              variant="contained"
              color="primary"
              disableRipple
            >
              Google로 로그인
            </GoogleLoginButton>
          </div>
        </InputBlock>
      </LoginBlock>
    </>
  );
}

export default Login;
