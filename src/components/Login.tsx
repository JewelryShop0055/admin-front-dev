import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
  height: 292px;

  padding-top: 20px;

  div:nth-child(2) {
    margin-bottom: 10px;
  }
`;

const SignupModal = styled.div`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
`;

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "45ch",
    },
  },
  btnStyle: {
    "& > *": {
      margin: theme.spacing(3.8),
      width: "12ch",
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
            <Link to="/ReserveManage">
              <Button variant="outlined" color="primary">
                Log in
              </Button>
            </Link>
            <Signup />
          </div>
        </InputBlock>
      </LoginBlock>
    </>
  );
}

export default Login;
