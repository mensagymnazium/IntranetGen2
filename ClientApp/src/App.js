import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { AuthContext } from "./objects/Auth";

import Home from './components/Home';
import NavBar from './components/NavBar';
import NotFound from './components/NotFound';

import SubjectSelection from './components/subjectSelection/SubjectSelection';
import SubjectAdmin from './components/subjectAdmin/SubjectAdmin';
import SubjectEdit from './components/subjectAdmin/SubjectEdit';

import Login from './components/Login';
import UserRegister from './components/UserRegister';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style/Forms.css';

export default class App extends Component {
  displayName = App.name

  render() {
    return (<>
      <AuthContext.Provider value={false}>
            <NavBar />
            <div id="page_root">
          <Switch>
            <Route exact path="/" component={Home} />

            <Route path="/login" component={Login} />

            <Route path="/subjects/:subject([0-9]+)?" component={SubjectSelection} />

            <Route path="/admin/edit/:subject([0-9]+)?" component={SubjectEdit} />

            <Route path="/admin/:subject([0-9]+)?" component={SubjectAdmin} />

            <Route path="/UserRegister" component={UserRegister} />

            <Route component={NotFound} />
          </Switch>
        </div>
      </AuthContext.Provider>
    </>);
  }
}
