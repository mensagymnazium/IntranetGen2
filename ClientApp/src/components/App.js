import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./Home";
import { NoMatch } from "./NoMatch";
import { Layout } from "./Layout";
import { NavigationBar } from "./NavigationBar";
import { Subjects } from "./Subjects";
import Api from "../services/Api";

const App = props => {
  const { user, apiUrl, bearerToken } = props;
  let api;
  if (user) {
    api = new Api(apiUrl, bearerToken);
  } else {
    api = null;
  }
  return (
    <React.Fragment>
      <NavigationBar />
      <Layout>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Home user={user} api={api} />}
            />
            <Route
              exact
              path="/subjects"
              render={() => <Subjects user={user} api={api} />}
            />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </Layout>
    </React.Fragment>
  );
};

export default App;
