import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export default class Login extends Component {
  render() {
    return (<>
      <Helmet>
        <title>Přihlášení | Intranet</title>
      </Helmet>

      <h1>
        Přihlašte se
      </h1>
        <form>
            <input type="text" placeholder="Uživatelské jméno"/> 
            <br />
            <input type="text" placeholder="Heslo" /> 
            <br/>
            <input type="submit" value="Přihlásit" />
            
        </form>
        <form action="/register">
            <input type="submit" value="Registrovat" />
        </form>
        
    </>);
  }
}
