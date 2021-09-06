import React from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { Route } from "react-router";
import ReserveManage from "./components/ReserveManage";
import LoginContainer from "./container/LoginContainer";
function App() {
  return (
    <>
      <BrowserView>
        <Route path="/" exact component={LoginContainer} />
        <Route path="/ReserveManage" component={ReserveManage} />
      </BrowserView>

      <MobileView>
        <div>현재 모바일은 지원하지 않습니다. PC버전으로 사용해주세요</div>
      </MobileView>
    </>
  );
}

export default App;
