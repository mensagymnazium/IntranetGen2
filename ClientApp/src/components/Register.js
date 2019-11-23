import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
 
export default class Register extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            firstname: "",
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
        const userinfo = new FormData(event.target);
        if (this.state.firstname == "") {
            return this.setState({ error: "Zadejte jméno" });
        }
        else if (this.state.lastname == "") {
              return this.setState({ error: "Zadejte příjmení" });
          }
        else if (this.state.username == "") {
            return this.setState({ error: "Zadejte uživatelské jméno" });
        }
        else if (this.state.password == "") {
            return this.setState({ error: "Zadejte heslo" });
        }
        else if (this.state.email == "") {
            return this.setState({ error: "Zadejte email" });
        }
        else { this.setState({ error: "" }) }
        
       

        fetch("api/StudentDb", { method: "Post", body: userinfo });
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
                <input type="text" name="firstname" onChange={this.handleChange} />
                <label>Přijmení</label>
                <input type="text" name="lastname" onChange={this.handleChange}/>
                <label>Třída</label>
                <select name="grade" onChange={this.handleChange}>
                    <option value="Prima">Prima</option>
                    <option value="Sekunda">Sekunda</option>
                    <option value="Tercie">Tercie</option>
                    <option value="Kvarta">Kvarta</option>
                    <option value="Kvinta">Kvinta</option>
                    <option value="Sexta">Sexta</option>
                    <option value="Septima">Septima</option>
                    <option value="Oktava">Oktáva</option>
                </select> 
                <br />
                <label>Uživatelské jméno</label>
                <input type="text" name="username" onChange={this.handleChange} />
                <br />
                <label>Heslo</label>
                <input type="text" name="password" onChange={this.handleChange} />
                <br />
                <label>Mail</label>
                <input type="text" name="email" onChange={this.handleChange}/>             
                <br />
                <br />
                <input type="submit" value="Registrovat" />
            </form>
        </>);

    }
}
