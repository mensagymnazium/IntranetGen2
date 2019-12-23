import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

export default class SubjectDetailsAdmin extends Component {
  render() {
    var subject = this.props.subject;

    return (
      <div className="SubjectDetailsDiv card text-center border-secondary">
        <div className="card-header"><h2>{subject.name}</h2></div>
        <div className="card-body">
          <ReactMarkdown source={subject.description} className="text-left" />
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><span className="badge badge-dark">Vyučující:</span> {subject.teacher ? subject.teacher.name : <i>Žádný</i>}</li>
            <li className="list-group-item"><span className="badge badge-dark">Hodina: </span> {subject.period.toString()}</li>
            <li className="list-group-item"><span className="badge badge-dark">Oblast: </span> {subject.category}</li>
            <li className="list-group-item"><span className="badge badge-dark">Kapacita: </span> {subject.students + "/" + subject.capacity}</li>
          </ul>
        </div>
        <div className="card-footer">
          <div className="btn-group">
            <button className="btn btn-primary" onClick={() => this.props.edit(subject.id)}>Upravit</button>
            <button className="btn btn-danger" onClick={() => this.props.delete(subject.id)}>Smazat</button>
          </div>
        </div>
      </div>
    );
  }
}
