import React from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Error404 from "./pages/Error/Error404";
import LoginPage from "./pages/Login";
import Login from "./pages/Login/components/Login";
import TodaysCheckListMainPage from "./pages/TodaysCheckList/TodaysCheckListMainPage";
// import ReserveManage from "./components/ReserveManage";

const App: React.FC = () => {
  return (
    <div>
      <BrowserView>
        <Router>
          <Switch>
            <Route path="/" component={LoginPage} exact />

            {/* 오늘의 체크리스트 라우팅 */}
            <Route
              path="/TodaysChecklist"
              exact
              component={TodaysCheckListMainPage}
            />
            <Route
              path="/TodaysChecklist"
              component={TodaysCheckListMainPage}
            />
            <Route component={Error404} />
          </Switch>
        </Router>
      </BrowserView>

      <MobileView>
        <div>현재 모바일은 지원하지 않습니다. PC버전으로 사용해주세요</div>
      </MobileView>
    </div>
  );
};

export default App;
