import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';

import SubjectSchedule from '../schedule/SubjectSchedule';
import SubjectDetailsAdmin from './SubjectDetailsAdmin';

import Subject from "../../objects/Subject";

export default class SubjectAdmin extends Component {
  constructor() {
    super();

    this.state = {};
    this.editSubject = this.editSubject.bind(this);
    this.deleteSubject = this.deleteSubject.bind(this);
  }

  componentDidMount() {
    this.fetchSubjects();
  }

  async fetchSubjects() {
    var response = await fetch("/api/subject/");
    var subjects = await response.json();
    subjects = subjects.map(Subject.from);
    this.setState({ subjects });
  }

  editSubject(subjectId) {
    var subject = this.state.subjects.find(subject => subject.id === subjectId);

    this.props.history.push(`/admin/edit/${subject.id}`);
  }

  async deleteSubject(subjectId) {
    var subject = this.state.subjects.find(subject => subject.id === subjectId);

    var simpleName = subject.name.match(/[^ ]+/)[0] || "ano";
    var response = window.prompt(`Opravdu chcete smazat předmět "${subject.name}?\n\nPokud ano, napiště "${simpleName}":`);

    if (response.toLocaleUpperCase() === simpleName.toLocaleUpperCase()) {
      var result = await fetch(`/api/subject/${subject.id}`, {
        method: "DELETE"
      });

      if (result.ok) {
        this.fetchSubjects();
      } else {
        window.alert("Nastala chyba");
      }
    }
  }


  render() {
      if (!this.state.subjects) {
          return <div className="container text-center"><div className="badge badge-info"><div className="spinner-grow spinner-grow-sm text-light" /> Načítám data...</div></div>;
    }

    var selectedSubjectId = parseInt(this.props.match.params.subject);
    var selectedSubject = this.state.subjects.find(subject => subject.id === selectedSubjectId);

    if (selectedSubjectId && !selectedSubject) {
      return <Redirect to="/admin" />
    }

    return (<>
      <Helmet>
        <title>Správa předmětů | Intranet</title>
      </Helmet>

      <SubjectSchedule
        subjects={this.state.subjects}
        selectedSubject={selectedSubject ? selectedSubject.id : null}
        cellProps={{
          editMode: true,
          edit: (id) => this.editSubject(id),
          delete: (id) => this.deleteSubject(id)
        }}
      />


      {selectedSubject &&
        <>
          <Helmet>
            <title>{selectedSubject.name} | Správa předmětů | Intranet</title>
          </Helmet>

        <SubjectDetailsAdmin
          subject={selectedSubject}
          edit={this.editSubject}
          delete={this.deleteSubject}
        />
        </>
      }

      <button onClick={() => this.props.history.push("/admin/edit/")}>Nový Předmět</button>
    </>);
  }
}
