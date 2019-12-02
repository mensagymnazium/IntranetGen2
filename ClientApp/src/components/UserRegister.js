import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

export default class UserRegister extends Component {
    constructor() {
        super();
        this.state = {
            UserName: "",
            FirstName: "",
            LastName: "",
            Mail: "",
            Password: "",
            StudentClass: "",
           
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSave = this.handleSave.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }


    handleSave(event) {
        event.preventDefault();

      
        const userinfo =
        {
            UserName: this.state.UserName,
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            Mail: this.state.Mail,
            Password: this.state.Password,
            StudentClass: this.state.StudentClass,
        }




        if (!userinfo.FirstName) {
            alert("Zadejte jméno");
            return
        }
        else if (!userinfo.LastName) {
            alert("Zadejte příjmení");
            return
        }
        else if (!userinfo.UserName) {
            alert("Zadejte uživatelské jméno");
            return
        }
        else if (!userinfo.Password) {
            alert("Zadejte heslo");
            return
        }
        else if (!userinfo.StudentClass || userinfo.StudentClass == "really" ) {
            alert("Zadejte třídu");
            return
        }
        else if (!userinfo.Mail) {
            alert("Zadejte mail");
            return 
        }
      
        
     
     

        fetch("api/UserDb", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(userinfo),
        })
            
        

    }  
        
    
 
    render() {

        
        return (<>
            <Helmet>
                <title>Registrace | Intranet</title>
            </Helmet>
           
           
            

            <form onSubmit={this.handleSave}>
                
                <label>Jméno</label>
                <input type="text" name="FirstName" onChange={this.handleChange} value={this.state.FirstName} />
                <label>Přijmení</label>
                <input type="text" name="LastName" onChange={this.handleChange} value={this.state.LastName} />
                <label>Třída</label>
                
                <select name="StudentClass" onChange={this.handleChange} value={this.state.StudentClass}>
                    <option  value={"really"}>Vyber třídu</option>
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
                <input type="text" name="UserName" onChange={this.handleChange} value={this.state.UserName} />
                <br />
                <label>Heslo</label>
                <input type="password" name="Password" onChange={this.handleChange} value={this.state.Password} />
                <br />
                <label>Mail</label>
                <input type="email" name="Mail" onChange={this.handleChange} value={this.state.Mail} />             
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
