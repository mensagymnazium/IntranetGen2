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
        fetch("api/StudentDb", { method: "Post", body: userinfo });
        }


    render() {
        return (<>
            <Helmet>
                <title>Registrace | Intranet</title>
            </Helmet>
           


            <form>
                <label>Jméno</label>
                <input type="text" name="firstname" />
                <label>Přijmení</label>
                <input type="text" name="lastname" />
                <label>Třída</label>
                <select>
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
                <input type="text" name="username" />
                <br />
                <label>Mail</label>
                <input type="text" name="email" />             
                <br />
                <label>Heslo</label>
                <input type="text" name="password"/>

                <br />
                <input type="submit" value="Registrovat" />
            </form>
        </>);

    }
}
