import React from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthRouth } from "./components/AuthRoute";
import Error404 from "./pages/Error/Error404";
import ItemCategoryPage from "./pages/ItemCategory_N_Workshop";

import LoginPage from "./pages/Login";

import TodaysCheckListMainPage from "./pages/TodaysCheckList/TodaysCheckListMainPage";

const App: React.FC = () => {
  return (
    <div>
      <BrowserView>
        <Router>
          <Switch>
            <Route path="/" component={LoginPage} exact />

            <AuthRouth
              path="/TodaysChecklist"
              exact
              component={TodaysCheckListMainPage}
            />

            <AuthRouth
              path="/Category_N_Workshop"
              exact
              component={ItemCategoryPage}
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
