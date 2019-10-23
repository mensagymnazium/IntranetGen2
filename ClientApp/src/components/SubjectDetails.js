import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class SubjectDetails extends Component {
    render() {
        return (<div>
            <h2>{this.props.subject.name}</h2>
            
            <div style={{whiteSpace: "pre-wrap"}}>{this.props.subject.description}</div><br/>

            <div>Vyučující: {this.props.subject.teacher}</div>
            <div>Hodina: {this.props.subject.period.toString()}</div>
            <div>Oblast: {this.props.subject.category}</div>
            <div>Kapacita: {this.props.subject.students + "/" + this.props.subject.capacity}</div>
            <br/>
            
            {(!this.props.CRUDMode ?
                <button onClick={() => this.props.select(this.props.subject.id)}>Přihlásit</button> :
                <>
                    <Link to={"/edit/" + this.props.subject.id}><button>Upravit předmět</button></Link>
                    <Link to={"/edit/"}><button>Nový Předmět</button></Link>
                </>
             )}
                
        </div>);
    }
}
