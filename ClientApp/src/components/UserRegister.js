import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

export default class UserRegister extends Component {
    constructor() {
        super();

        this.state = {
            UserName: "",
            FullName: "",
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

        const userinfo = {
            UserName: this.state.UserName,
            FullName: this.state.FullName,
            Mail: this.state.Mail,
            Password: this.state.Password,
            StudentClass: this.state.StudentClass,
            Role: "Student"
        }

        if (!userinfo.FullName) {
            alert("Zadejte jméno");
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
        else if (!userinfo.StudentClass || userinfo.StudentClass === "really") {
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
                <input type="text" name="FullName" onChange={this.handleChange} value={this.state.FullName} />

                <select name="StudentClass" onChange={this.handleChange} value={this.state.StudentClass}>
                    <option value={"really"}>Vyber třídu</option>
                    <option value={0}>Prima</option>
                    <option value={1}>Sekunda</option>
                    <option value={2}>Tercie</option>
                    <option value={3}>Kvarta</option>
                    <option value={4}>Kvinta</option>
                    <option value={5}>Sexta</option>
                    <option value={6}>Septima</option>
                    <option value={7}>Oktáva</option>
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
