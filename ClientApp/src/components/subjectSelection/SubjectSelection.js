﻿import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';

import SubjectSchedule from '../schedule/SubjectSchedule';
import SubjectDetails from './SubjectDetails';

import Subject from "../../objects/Subject";

export default class SubjectSelection extends Component {
  constructor() {
    super();

    this.state = {};
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

  selectSubject(subjectId) {
    var subject = this.state.subjects.find(subject => subject.id === subjectId);

    console.log(`Přihlášen předmět "${subject.name}" s ID "${subjectId}".`);
  }


    render() {
      if (!this.state.subjects) {
          return <div className="container text-center"><div className="badge badge-info"><div className="spinner-grow spinner-grow-sm text-light" /> Načítám data...</div></div>;
    }

    var selectedSubjectId = parseInt(this.props.match.params.subject);
    var selectedSubject = this.state.subjects.find(subject => subject.id === selectedSubjectId);

    if (selectedSubjectId && !selectedSubject) {
      return <Redirect to="/subjects" />
    }

    return (<>
      <Helmet>
        <title>Editace předmětů | Intranet</title>
      </Helmet>

        <div className="container-fluid">
            <div className="row">
                <SubjectSchedule className={selectedSubject?"col-9":"col"}
        subjects={this.state.subjects}
        selectedSubject={selectedSubject ? selectedSubject.id : null}
      />

      {selectedSubject &&
        <>
          <Helmet>
            <title>{selectedSubject.name} | Rozvrh | Intranet</title>
          </Helmet>

            <SubjectDetails className="col" subject={selectedSubject} select={(id) => this.selectSubject(id)} />
        </>
            }
            </div>
        </div>
    </>);
  }
}
