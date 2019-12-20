import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Icons from '../style/IconsBase64.json';

export default class NavBar extends Component {
  render() {
      return (
          <nav className="navbar navbar-expand-sm navbar-dark bg-dark sticky-top" style={{ "margin-bottom": "15px" }} id="navbar">
              <h1 className="navbar-brand display-1">Intranet</h1>
              <div className="btn-group">
                  <Link className="btn btn-primary navbar-btn nav-item" to="/">           <img alt="Home-Icon" src={Icons.home} height="30vh" /> Úvodní stránka</Link>
                  <Link className="btn btn-primary navbar-btn nav-item" to="/subjects">   <img alt="Subjects-Icon" src={Icons.grid} height="30vh" /> Rozvrh</Link>
                  <Link className="btn btn-primary navbar-btn nav-item" to="/login">      <img alt="Login-Icon" src={Icons.login} height="30vh" /> Přihlášení</Link>
                  <Link className="btn btn-primary navbar-btn nav-item" to="/admin">      <img alt="Admin-Icon" src={Icons.admin} height="30vh" /> Správa předmětů</Link>
              </div>
        </nav>);
  }
}
