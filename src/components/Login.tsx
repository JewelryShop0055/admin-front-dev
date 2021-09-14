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
  height: 260px;

  padding-top: 20px;

  div:nth-child(2) {
    margin-bottom: 10px;
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "45ch",
    },
  },
}));

//RouteIf를 이용한 임시 로그인체크
// => ID와 PASSWORD항목을 아예 따로 분류해서 상태정리해야함 + id, pw는 정규식처리를 통해 영문, ~!@#$%^&*() 특문 외의 문자입력시 영어로 입력중이 아니라는것을 알리기
interface UserId {
  onSubmitUserId: (name: string) => void;
}

interface UserPassword {
  onSubmitUserPassword: (name: string) => void;
}

function Login(
  { onSubmitUserId }: UserId,
  { onSubmitUserPassword }: UserPassword
) {
  const classes = useStyles();

  const [userIdForm, setUserIdForm] = useState("");
  const [userPasswordForm, setUserPasswordForm] = useState("");

  const id = userIdForm;
  const password = userPasswordForm;

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUserIdForm(value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUserPasswordForm(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(userIdForm);
    console.log(userPasswordForm);
    setUserIdForm("");
    setUserPasswordForm("");
  };

  // const [userIdentification, setUserIdentification] = useState({
  //   userId: "",
  //   userPassword: "",
  // });
  // const { userId, userPassword } = userIdentification;
  // const onChangeUserId = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { userId, value } = e.target;
  //   setUserIdentification({
  //     ...userIdentification,
  //     [userId]: value,
  //   });
  // };
  // const onUserIdSubmit = (e: React.FormEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  // };

  return (
    <>
      <LoginBlock>
        <h1>Laviluz Admin Page</h1>

        <InputBlock>
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <TextField
              id="outlined-basic"
              label="ID"
              variant="outlined"
              name="id"
              onChange={onChangeId}
              value={id}
            />
            <TextField
              id="outlined-basic"
              label="PASSWORD"
              variant="outlined"
              name="password"
              onChange={onChangePassword}
              value={password}
            />

            <div className="btn">
              <Button variant="outlined" color="primary" type="submit">
                <Link to="/TodaysCheckList">Log in</Link>
              </Button>

              <Signup />
            </div>
          </form>
        </InputBlock>
      </LoginBlock>
    </>
  );
}

export default Login;
