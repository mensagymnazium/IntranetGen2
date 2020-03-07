import React, { Component } from "react";
import { Route, Switch } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { withAuth } from "./msal/MsalAuthProvider";
import { NoMatch } from "./components/NoMatch";
import { NavMenu } from "./components/NavMenu";
import { GraphData } from "./components/GraphData";
import { SubjectsInfoTable } from "./components/SubjectsInfoTable";

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
            <Route exact path="/graph-data" component={GraphData} />
            <Route component={NoMatch} />
          </Switch>
        </Layout>
      </React.Fragment>
    );
  }
}
export const App = withAuth(RootApp);
