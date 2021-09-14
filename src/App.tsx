import React from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
// import ReserveManage from "./components/ReserveManage";
import TodaysCheckList from "./components/TodaysCheckList";

const App: React.FC = () => {
  return (
    <div>
      <BrowserView>
        <Router>
          <Switch>
            <Route path="/" component={Login} exact />
            <Route path="/TodaysChecklist" component={TodaysCheckList} />
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
