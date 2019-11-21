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
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
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
