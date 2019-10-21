﻿import React, { Component } from 'react';

export default class SubjectInfoBoard extends Component {
    render() {
        return (<div>
            <h2>{this.props.subject.name}</h2>

            <div style={{whiteSpace: "pre-wrap"}}>{this.props.subject.description}</div><br/>

            <div>Vyučující: {this.props.subject.teacher}</div>
            <div>Hodina: {this.props.subject.period.toString()}</div>
            <div>Oblast: {this.props.subject.category}</div>
            <div>Kapacita: {this.props.subject.students + "/" + this.props.subject.capacity}</div>

            <button onClick={() => this.props.select(this.props.subject.id)}>Přihlásit</button>
        </div>);
    }
}
