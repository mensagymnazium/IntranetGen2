import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import Icons from '../style/IconsBase64.json';

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

            <div className="container">
                <div className="card form-card bg-dark">
                    <div className="card-body">
                        <form onSubmit={this.handleSave} className="form-horizontal">
                            <div className="input-group row">
                                <div class="input-group-prepend">
                                    <div class="input-group-text">Jméno</div>
                                </div>
                                <input className="form-control" type="text" name="FullName" onChange={this.handleChange} value={this.state.FullName} />
                            </div><br />
                            <div className="input-group row">
                                <div class="input-group-prepend">
                                    <div class="input-group-text">Uživatelské Jméno</div>
                                </div>
                                <input className="form-control" type="text" name="UserName" onChange={this.handleChange} value={this.state.UserName} />
                            </div><br />
                            <div className="input-group row">
                                <div class="input-group-prepend">
                                    <div class="input-group-text">Heslo</div>
                                </div>
                                <input className="form-control" type="password" name="Password" onChange={this.handleChange} value={this.state.Password} />
                            </div><br />
                            <div className="input-group row">
                                <div class="input-group-prepend">
                                    <div class="input-group-text">E-Mail</div>
                                </div>
                                <input className="form-control" type="email" name="Mail" onChange={this.handleChange} value={this.state.Mail} />
                            </div><br />
                            <div className="input-group row">
                                <div class="input-group-prepend">
                                    <div class="input-group-text">Třída</div>
                                </div>
                                <select className="form-control" name="StudentClass" onChange={this.handleChange} value={this.state.StudentClass}>
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
                            </div>
                            <br /><br />
                            <div className="btn-group">
                                <input className="btn btn-primary" type="submit" value="Registrovat" />
                                <button className="btn btn-danger" type="button" onClick={() => { if (window.confirm("Vrátit se bez uložení změn?")) { window.location = "/login" } }}>Zpět</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>);

    }
}
