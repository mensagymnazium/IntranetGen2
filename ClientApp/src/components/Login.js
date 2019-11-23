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
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.username == "") {
            return this.setState({ error: "Zadejte uživatelské jméno" });
        }
        else if (this.state.password == "") {
            return this.setState({ error: "Zadejte heslo" });
        }
        else { this.setState({ error: "" }) }

        /*fetch("api/StudentDb", {
            method: "Get", body: userinfo,
        })
            .then((response) => response.json())
            .then(this.setState({ error: "success" }))

            .then((responseJson) => {

                this.props.history.push("/register");

            });
*/    
}

    
  render() {
    return (<>
      <Helmet>
        <title>Přihlášení | Intranet</title>
      </Helmet>

      <h1>
        Přihlašte se
      </h1>

        

            

        <form onSubmit={this.handleSubmit}>
            {
                
                <h3>
                    {this.state.error}
                </h3>
            }
            <input type="text" name="username" placeholder="Uživatelské jméno" onChange = { this.handleChange } /> 
            <br />
            <input type="text" name="password" placeholder="Heslo" onChange={this.handleChange}/> 
            <br/>
            <input type="submit" value="Přihlásit" />
            
        </form>
        <form action="/StudentRegister">
            <input type="submit" value="Registrovat Studenta" />
        </form>
        <form action="/TeacherRegister">
            <input type="submit" value="Registrovat Učitele" />
        </form>
        
    </>);
  }
}
