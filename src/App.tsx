import React from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { TestPage } from "./api/testLogin";
import Login from "./components/Login/Login";
import TodaysCheckListMainPage from "./components/TodaysCheckList/TodaysCheckListMainPage";
// import ReserveManage from "./components/ReserveManage";

const App: React.FC = () => {
  return (
    <div>
      <BrowserView>
        <Router>
          <Switch>
            <Route path="/" component={Login} exact />

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
            <Route path="/test" exact component={TestPage} />
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
