import React, { Component } from "react";
import { Route, Switch } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { withAuth } from "./msal/MsalAuthProvider";
import { NoMatch } from "./components/NoMatch";
import { NavMenu } from "./components/NavMenu";
import { GraphData } from "./components/GraphData";
import { SubjectsInfoTable } from "./components/SubjectsInfoTable";
import { PrivateRoute } from "./components/PrivateRoute";
import { Role } from "./helpers/RoleEnum";
import SubjectCrud from "./components/DevExpress/SubjectCrud";
import SubjectSigning from "./components/DevExpress/SubjectSigning";

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
              path="/subjects"
              render={() => <SubjectsInfoTable {...this.props} />}
            />
            <Route
              exact
              path="/subjects-sign"
              render={() => <SubjectSigning {...this.props} />}
            />
            <Route exact path="/graph-data" component={GraphData} />
            <PrivateRoute
              path="/subject-edit"
              roles={[Role.Admin]}
              component={SubjectCrud}
            />
            <Route component={NoMatch} />
          </Switch>
        </Layout>
      </React.Fragment>
    );
  }
}
export const App = withAuth(RootApp);
