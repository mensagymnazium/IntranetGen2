import React, { Component } from 'react';
import { Helmet } from 'react-helmet';


export default class TeacherRegister extends Component {
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

        var userinfo = event.target;
        //userinfo.password.value = userinfo.password.GetHashCode().toString();
        
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
        


        fetch("api/TeacherDb", {
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
                <input type="text" name="firstname" onChange={this.handleChange} />
                <label>Přijmení</label>
                <input type="text" name="lastname" onChange={this.handleChange}/>
                
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
                <input type="submit" value="Registrovat" />
            </form>

        <form action="/Login">
        <input type="submit" value="Zpátky na login" />
        </form>
        </>);

    }
}
