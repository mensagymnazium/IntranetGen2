import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

export default class StudentRegister extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            FirstName: "",
            lastname: "",
            email: "",
            password: "",
            grade: "",
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


        if (!userinfo.FirstName) {
            return this.setState({ error: "Zadejte jméno" });
        }
        else if (!userinfo.lastname) {
            return this.setState({ error: "Zadejte příjmení" });
        }
        else if (!userinfo.username) {
            return this.setState({ error: "Zadejte uživatelské jméno" });
        }
        else if (!userinfo.password) {
            return this.setState({ error: "Zadejte heslo" });
        }
        else if (!userinfo.email) {
            return this.setState({ error: "Zadejte email" });
        }
        else { this.setState({ error: "" }) }
        


        fetch("api/StudentDb", {
            method:"Post", body: userinfo })
            .then(this.setState({ error: "success" }))

            .then((responseJson) => {

            this.props.history.push("/StudentRegister");

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
                <label>Jméno</label>
                <input type="text" name="FirstName" onChange={this.handleChange} />
                <label>Přijmení</label>
                <input type="text" name="lastname" onChange={this.handleChange}/>
                <label>Třída</label>
                
                <select name="grade" onChange={this.handleChange}>
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
                <input type="text" name="username" onChange={this.handleChange} />
                <br />
                <label>Heslo</label>
                <input type="password" name="password" onChange={this.handleChange} />
                <br />
                <label>Mail</label>
                <input type="email" name="email" onChange={this.handleChange}/>             
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
