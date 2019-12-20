import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import Icons from '../style/IconsBase64.json';

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            UserName: "",
            Password: "",
            error: "",
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
              
        

        if (!this.state.UserName) {
            alert("Zadejte uživatelské jméno");
            return
        }
        else if (!this.state.Password) {
            alert("Zadejte heslo");
            return
        }
      
    

        var userurl = "api/UserDb/" + this.state.UserName + "/" + this.state.Password;
        
     
        fetch(userurl) //calls the Get method with the URL created above. If the password matches an alert pops up. 
            .then(response => response.json())
            .then(result => {
                if (result) { alert("Údaje se rovnají těm v uživatelskéské databázi. Bohužel Vás ještě nemůžeme autorizovat"); }
            });

  
                
}



  render() {
    return (<>
      <Helmet>
        <title>Přihlášení | Intranet</title>
      </Helmet>


        <div className="container">
            <div className="card form-card bg-dark">
                <div className="card-body">
                    <form onSubmit={this.handleSubmit} className="form-horizontal">
                        <div className="input-group row">
                            <div className="input-group-prepend">
                                <div className="input-group-text"><img alt="Login-Icon" src={Icons.user} height="24vh" /></div>
                            </div>
                            <input className="form-control" type="text" name="UserName" placeholder="Uživatelské jméno" onChange={this.handleChange} value={this.state.UserName} />
                        </div>
                        <br />
                        <div className="input-group row">
                            <div className="input-group-prepend">
                                <div className="input-group-text"><img alt="Password-Icon" src={Icons.pass} height="24vh" /></div>
                            </div>
                            <input className="form-control" type="password" name="Password" placeholder="Heslo" onChange={this.handleChange} value={this.state.Password} />
                        </div>
                        <br /><br />
                        <div className="btn-group">
                            <input className="btn btn-success" type="submit" value="Přihlásit" />
                            <button className="btn btn-info" type="button" onClick={() => { window.location = "/UserRegister" }}>Registrovat Uživatele</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>);
  }
}
