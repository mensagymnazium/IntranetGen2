import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

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
      
    

        var studenturl = "api/StudentDb/" + this.state.UserName + "/" + this.state.Password; 
        var teacherurl = "api/TeacherDb/" + this.state.UserName + "/" + this.state.Password;
        
     
        fetch(studenturl) //calls the Get method with the URL created above. If the password matches an alert pops up. 
            .then(response => response.json())
            .then(result => {
                if (result) { alert("Údaje se rovnají těm v studentské databázi. Bohužel Vás ještě nemůžeme autorizovat"); }
            });

        fetch(teacherurl)
            .then(response => response.json())
            .then(result => {
                if (result) { alert("Údaje se rovnají těm v učitelské databázi. Bohužel Vás ještě nemůžeme autorizovat"); }
            });

  
                
}



  render() {
    return (<>
      <Helmet>
        <title>Přihlášení | Intranet</title>
      </Helmet>

      


        <form onSubmit={this.handleSubmit}>
            {
               
            }
            <input type="text" name="UserName" placeholder="Uživatelské jméno" onChange={this.handleChange} value={this.state.UserName} /> 
            <br />
            <input type="password" name="Password" placeholder="Heslo" onChange={this.handleChange} value={this.state.Password} /> 
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
