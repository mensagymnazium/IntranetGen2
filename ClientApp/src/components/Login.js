import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            error: "",
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
  render() {
    return (<>
      <Helmet>
        <title>Přihlášení | Intranet</title>
      </Helmet>

      <h1>
        Přihlašte se
      </h1>
        <form>
            <input type="text" name="username" placeholder="Uživatelské jméno"/> 
            <br />
            <input type="text" name="password" placeholder="Heslo" /> 
            <br/>
            <input type="submit" value="Přihlásit" />
            
        </form>
        <form action="/register">
            <input type="submit" value="Registrovat" />
        </form>
        
    </>);
  }
}
