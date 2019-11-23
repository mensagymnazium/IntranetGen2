import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

export default class StudentRegister extends Component {
    constructor() {
        super();
        this.state = {
            UserName: "",
            FirstName: "",
            LastName: "",
            Mail: "",
            Password: "",
            StudentClass: "",
            error: "",
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSave = this.handleSave.bind(this)
    }
   
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

  
    handleSave(event) {
        event.preventDefault();
       

        const userinfo = new FormData(event.target);



        if (!userinfo.get("FirstName")) {
            alert("Zadejte jméno");
            return
        }
        else if (!userinfo.get("LastName")){
            alert("Zadejte příjmení");
            return 
        }
        else if (!userinfo.get("UserName")) {
            alert("Zadejte uživatelské jméno");
            return 
        }
        else if (!userinfo.get("Password")) {
            alert("Zadejte heslo");
            return 
        }
        else if (!userinfo.get("Mail")) {
            alert("Zadejte mail");
            return 
        }
        else { this.setState({ error: "" }) }
        
      
     
/*
        fetch("api/StudentDb", {
            method: "POST", body: userinfo, headers: { 'Content-Type': 'application/json' } })
            .then(this.setState({ error: "success" }))

            .then((responseJson) => {

                this.props.history.push("/api/studebtdb");

            });
   */

    }  
        
    
 
    render() {

        
        return (<>
            <Helmet>
                <title>Registrace | Intranet</title>
            </Helmet>
           
            <h3>
                {this.state.error}
            </h3>

            <form onSubmit={this.handleSave}>
                
                <label>Jméno</label>
                <input type="text" name="FirstName"  />
                <label>Přijmení</label>
                <input type="text" name="LastName" />
                <label>Třída</label>
                
                <select name="StudentClass">
                    <option value={10}>Prima</option>
                    <option value={20}>Sekunda</option>
                    <option value={30}>Tercie</option>
                    <option value={40}>Kvarta</option>
                    <option value={50}>Kvinta</option>
                    <option value={60}>Sexta</option>
                    <option value={70}>Septima</option>
                    <option value={80}>Oktáva</option>
                </select>
                
                <br />
                <label>Uživatelské jméno</label>
                <input type="text" name="UserName"/>
                <br />
                <label>Heslo</label>
                <input type="password" name="Password"/>
                <br />
                <label>Mail</label>
                <input type="email" name="Mail"/>             
                <br />
                <br />
                <input type="submit" value="Registrovat" />
            </form>

        <form action="/Login">
        <input type="submit" value="Zpátky na login" />
        </form>
        </>);

    }
}
