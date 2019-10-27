import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NavBar extends Component {
  render() {
    var style = { fontSize: "large", padding: "10px" } // We should probably move styles to a stylesheet

    return (<div id="navbar" style={{ borderBottom: "black solid 3px", margin: "0 -8px 10px" }}>
      <h1 style={{ display: "inline", padding: "10px" }}>Intranet</h1>
      <Link to="/" style={style}>Úvodní stránka</Link>
      <Link to="/login" style={style}>Přihlášení</Link>
        <Link to="/subjects" style={style}>Rozvrh</Link>
    </div>);
  }
}
