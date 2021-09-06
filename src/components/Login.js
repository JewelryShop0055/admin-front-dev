import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Signup from "./Signup";

const LoginBlock = styled.div`
  margin-top: 20rem;
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

function Login() {
  const classes = useStyles();

  //기본 id, pw입력값 공백상태초기화
  const [userID, setUserID] = useState("");
  const [userPassword, setUserPassword] = useState("");

  //id,pw입력후 로그인 클릭 or 엔터시 dispatch되고, 해당 값을 server단에서 비교한 후 입장 (현재는 간단하게만)
  const onChangeId = (e) => setUserID(e.idString);
  const onSubmitId = (e) => {};

  //signup 클릭시 모달창을 띄우고, 회원가입에 필요한 인증창을 올림
  const [signup, setSignup] = useState(false);
  const onSignupClick = () => {
    setSignup(true);
  };

  const onDispatchSignupData = () => {
    console.log("작성완료");
    setSignup(false);
  };
  const onCancelSignup = () => {
    console.log("취소");
    setSignup(false);
  };

  return (
    <center>
      <LoginBlock>
        <h1>Laviluz Admin Page</h1>

        <InputBlock>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label="ID"
              variant="outlined"
              onSubmit={onChangeId}
            />
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
    </center>
  );
}

export default Login;
