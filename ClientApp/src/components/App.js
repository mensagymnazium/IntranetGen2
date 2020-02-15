import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./Home";
import { NoMatch } from "./NoMatch";
import { Layout } from "./Layout";
import { NavigationBar } from "./NavigationBar";
import { Subjects } from "./Subjects";
import Api from "../services/Api";

const App = props => {
  return (
    <React.Fragment>
      <NavigationBar />
      <Layout>
        <Router>
          <Switch>
            <Route exact path="/" render={() => <Home {...props} />} />
            <Route
              exact
              path="/subjects"
              render={() => <Subjects {...props} />}
            />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </Layout>
    </React.Fragment>
  );
};

export default App;
