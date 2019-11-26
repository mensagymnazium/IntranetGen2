import React, { Component } from 'react';
import { Helmet } from 'react-helmet';


export default class TeacherRegister extends Component {
    constructor() {
        super();
        this.state = {
            UserName: "",
            FirstName: "",
            LastName: "",
            Mail: "",
            Password: "",
            
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

        const userinfo =
        {
            UserName: this.state.UserName,
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            Mail: this.state.Mail,
            Password: this.state.Password,
           
        }


        if (!userinfo.FirstName) {
            return this.setState({ error: "Zadejte jméno" });
        }
        else if (!userinfo.LastName) {
            return this.setState({ error: "Zadejte příjmení" });
        }
        else if (!userinfo.UserName) {
            return this.setState({ error: "Zadejte uživatelské jméno" });
        }
        else if (!userinfo.Password) {
            return this.setState({ error: "Zadejte heslo" });
        }
        else if (!userinfo.Mail) {
            return this.setState({ error: "Zadejte email" });
        }
        else { this.setState({ error: "" }) }
        


        fetch("api/TeacherDb", {
            method: "POST",
            headers: { "Content-Type": 'application/json', },
            body: JSON.stringify(userinfo)
        });
        

    }  
        
  

    render() {
        return (<>
            <Helmet>
                <title>Registrace | Intranet</title>
            </Helmet>
           


            <form onSubmit={this.handleSave}>
                
                <label>Jméno</label>
                <input type="text" name="FirstName" onChange={this.handleChange} value={this.state.FirstName}/>
                <label>Přijmení</label>
                <input type="text" name="LastName" onChange={this.handleChange} value={this.state.LastName}/>
                
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
                <input type="submit" value="Registrovat"/>
            </form>

        <form action="/Login">
        <input type="submit" value="Zpátky na login" />
        </form>
        </>);

    }
}
