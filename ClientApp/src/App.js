import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import SubjectSchedule from './components/SubjectSchedule';
import NotFound from './components/NotFound';
import NavBar from './components/NavBar';

export default class App extends Component {
  displayName = App.name

  render() {
    return (<>
      <NavBar />
      <div id="page_root">
        <Switch>
          <Route exact path="/" component={Home} />

          <Route path="/login" component={Login} />

          <Route path="/subjects/:subject?" component={SubjectSchedule} />

          <Route component={NotFound} />
        </Switch>
      </div>
    </>);
  }
}
