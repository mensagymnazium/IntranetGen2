import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./Home";
import { NoMatch } from "./NoMatch";
import { Layout } from "./Layout";
import { NavigationBar } from "./NavigationBar";
import { Subjects } from "./Subjects";

const App = () => (
  <React.Fragment>
    <NavigationBar />
    <Layout>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/subjects" component={Subjects} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    </Layout>
  </React.Fragment>
);

export default App;
