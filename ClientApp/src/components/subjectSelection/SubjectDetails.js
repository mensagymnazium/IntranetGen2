import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

export default class SubjectDetails extends Component {
  render() {
    var subject = this.props.subject;

    return (<div className="SubjectDetailsDiv">
      <h2>{subject.name}</h2>

      <ReactMarkdown source={subject.description} />

      <div>Vyučující: {subject.teacher ? subject.teacher.name : <i>Žádný</i>}</div>
      <div>Hodina: {subject.period.toString()}</div>
      <div>Kapacita: {subject.students}/{subject.capacity}</div>

      <div>
        <button onClick={() => this.props.select(subject.id)}>Přihlásit</button>
      </div>
    </div>);
  }
}
