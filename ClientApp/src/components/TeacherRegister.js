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

        var userinfo = new FormData(event.target);

        //userinfo.password.value = userinfo.password.GetHashCode().toString();

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
        


        fetch("api/TeacherDbController", {
            method:"POST",body: userinfo })
            .then(this.setState({ error: "success" }))

            .then((responseJson) => {

            this.props.history.push("/TeacherRegister");

            });
    

    }  
        
  

    render() {
        return (<>
            <Helmet>
                <title>Registrace | Intranet</title>
            </Helmet>
           


            <form onSubmit={this.handleSave}>
                <h3>
                    {this.state.error}
                </h3>
                <h3>
                    {this.state.password}
                </h3>
                <label>Jméno</label>
                <input type="text" name="FirstName" onChange={this.handleChange} />
                <label>Přijmení</label>
                <input type="text" name="LastName" onChange={this.handleChange}/>
                
                <br />
                <label>Uživatelské jméno</label>
                <input type="text" name="UserName" onChange={this.handleChange} />
                <br />
                <label>Heslo</label>
                <input type="password" name="Password" onChange={this.handleChange} />
                <br />
                <label>Mail</label>
                <input type="email" name="Mail" onChange={this.handleChange}/>             
                <br />
                <input type="submit" value="Registrovat" />
            </form>

        <form action="/Login">
        <input type="submit" value="Zpátky na login" />
        </form>
        </>);

    }
}
