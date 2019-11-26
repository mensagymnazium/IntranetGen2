import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import SubjectSchedule from './components/SubjectSchedule';
import NotFound from './components/NotFound';
import NavBar from './components/NavBar';
import SubjectManagement from './components/SubjectManagement';
import StudentRegister from './components/StudentRegister';
import TeacherRegister from './components/TeacherRegister';
import { AuthContext } from "./objects/Auth";
import PrivateRoute from "./objects/PrivateRoute";
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

          <Route path="/subjects/:subject?" component={SubjectSchedule} />

          <Route path="/edit/:subject?" component={SubjectManagement} />  

          <Route path="/StudentRegister" component={StudentRegister} />   

          <Route path="/TeacherRegister" component={TeacherRegister} />
          
          <Route component={NotFound} />
        </Switch>
              </div>
          </AuthContext.Provider>
    </>);
  }
}
