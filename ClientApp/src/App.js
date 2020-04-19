import React, { Component } from "react";
import { Route, Switch } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { withAuth } from "./msal/MsalAuthProvider";
import { NoMatch } from "./components/NoMatch";
import { NavMenu } from "./components/NavMenu";
import { GraphData } from "./components/GraphData";
import { PrivateRoute } from "./components/PrivateRoute";
import { Role } from "./helpers/Enums";
import Administration from "./components/Administration";
import StudentSigns from "./components/StudentSigns";
import Students from "./components/DevExpress/Students";
import "./styles/Base.css";

class RootApp extends Component {
  render() {
    return (
      <React.Fragment>
        <NavMenu {...this.props} />
        <Layout>
          <Switch>
            <Route exact path="/" render={() => <Home {...this.props} />} />
            <Route
              exact
              path="/subjects-sign"
              render={() => <StudentSigns {...this.props} />}
            />
            <Route exact path="/graph-data" component={GraphData} />
            <PrivateRoute
              path="/subject-edit"
              roles={[Role.Admin, Role.Teacher]}
              component={Administration}
            />
            <PrivateRoute
              path="/students"
              roles={[Role.Admin, Role.Teacher]}
              component={Students}
            />
            <Route component={NoMatch} />
          </Switch>
        </Layout>
      </React.Fragment>
    );
  }
}
export const App = withAuth(RootApp);
