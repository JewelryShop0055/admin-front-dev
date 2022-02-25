import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { actions as signInActions } from "../../store/signIn/slice";

import { actions as signOutActions } from "../../store/signOut/slice";
import { SnackBarMessageType } from "../../types";
import { getAuthTokenFromCookies } from "../../util/auth";
import prettyTime from "../../util/prettyTime";
import alertSnackBarMessage from "../../util/snackBarUitls";
import { topNavigaionStyles } from "./TopNavigation";

export default function AutoSignOut() {
  const classes = topNavigaionStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  //로그아웃
  const signOut = () => {
    dispatch(signOutActions.getSignOutPending());
    history.push("/loginPage");
  };
  const signOutRef = useRef(signOut);
  signOutRef.current = signOut;

  const [remainTime, setRemainTime] = useState<number>(0);
  const remainTimeRef = useRef(remainTime);
  remainTimeRef.current = remainTime;

  const [delayTime, setDelayTime] = useState<number>(0);
  const delayTimeRef = useRef(delayTime);
  delayTimeRef.current = delayTime;

  const [isRemainTimeExtended, setIsRemainTimeExtended] =
    useState<boolean>(false);

  const autoLogoutTimer = () => {
    const intervalTime = 1000;
    const expectedTime = Date.now() + intervalTime;

    setTimeout(
      () => {
        setDelayTime(Date.now() - expectedTime);

        if (remainTimeRef.current >= 1) {
          setRemainTime(remainTimeRef.current - 1);
        }
        if (remainTimeRef.current < 1) {
          alertSnackBarMessage({
            message: "자동로그아웃 되었습니다.",
            type: SnackBarMessageType.WARNING,
          });
          signOutRef.current();
        }
      },
      remainTimeRef.current < 1
        ? 0
        : Math.max(0, intervalTime - delayTimeRef.current)
    );
  };

  const extendRemainTime = () => {
    //1시간연장
    dispatch(
      signInActions.getAuthTokenRefreshPending({
        refreshToken: getAuthTokenFromCookies("user_refresh_token")!.toString(),
      })
    );
    setRemainTime(3599);
    setIsRemainTimeExtended(true);
  };

  useEffect(() => {
    if (isRemainTimeExtended) {
      setIsRemainTimeExtended(false);
      return;
    }

    if (remainTime >= 1) {
      autoLogoutTimer();
    }
  }, [remainTime]);

  useEffect(() => {
    const loginTime = Number(window.localStorage.getItem("signin"));
    const nowRemainTime = 3600 - Math.floor((Date.now() - loginTime) / 1000);
    setRemainTime(nowRemainTime);
  }, []);

  return (
    <>
      <div className={classes.remainTime}>
        {prettyTime(remainTime)} 후 자동 로그아웃
      </div>
      <button className={classes.extendTimeBtn} onClick={extendRemainTime}>
        사용시간 연장
      </button>
      <button className={classes.signOutBtn} onClick={signOut}>
        로그아웃
      </button>
    </>
  );
}
