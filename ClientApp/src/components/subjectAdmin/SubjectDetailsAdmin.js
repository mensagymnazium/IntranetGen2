import React, { Component } from 'react';

export default class SubjectDetailsAdmin extends Component {
  render() {
    return (<div className="SubjectDetailsDiv">
      <h2>{this.props.subject.name}</h2>

      <div style={{ whiteSpace: "pre-wrap" }}>{this.props.subject.description}</div><br />

      <div>Vyučující: {this.props.subject.teacher ? this.props.subject.teacher.name : ""}</div>
      <div>Hodina: {this.props.subject.period.toString()}</div>
      <div>Kapacita: {this.props.subject.students}/{this.props.subject.capacity}</div>
      <br />

      <button onClick={() => this.props.edit(this.props.subject.id)}>Upravit</button>
      <button onClick={() => this.props.delete(this.props.subject.id)}>Smazat</button>
    </div>);
  }
}
