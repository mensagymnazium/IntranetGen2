import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

export default class SubjectDetailsAdmin extends Component {
  render() {
    var subject = this.props.subject;

    return (<div className="SubjectDetailsDiv">
      <h2>{subject.name}</h2>

      <ReactMarkdown source={subject.description} />

      <div>Vyučující: {subject.teacher ? subject.teacher.name : <i>Žádný</i>}</div>
      <div>Hodina: {subject.period.toString()}</div>
      <div>Kapacita: {subject.students}/{subject.capacity}</div>

      <div>
        <button onClick={() => this.props.edit(this.props.subject.id)}>Upravit</button>
        <button onClick={() => this.props.delete(this.props.subject.id)}>Smazat</button>
      </div>
    </div>);
  }
}
