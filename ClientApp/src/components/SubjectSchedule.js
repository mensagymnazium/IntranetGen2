import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import SubjectSelectionTable from './SubjectSelectionTable';
import SubjectInfoBoard from './SubjectInfoBoard';
import FakeSubjects from "../Subjects.json";
import Subject from "../objects/Subject";

export default class SubjectSchedule extends Component {
  constructor() {
    super();

    this.state = {
      subjects: FakeSubjects.map(Subject.from)
    };
  }

  render() {
    return this.state.subjects.map(subject => (
      <div key={subject.id}>
        <h3>{subject.name}</h3> <i>{subject.teacher}</i> - {subject.period.toString()}<br />
        {subject.description}
      </div>
    ));


    /*
    return (<>
      <Helmet>
        <title>Rozvrh | Intranet</title>
      </Helmet>

      <SubjectSelectionTable subjects={subjects} />

      <Route path="/subjects/:subject" render={(props) => {
        var subject = props.match.params.subject;
        var active_subject = subjects.find(x => x.id == subject);

        return (<>
          <Helmet>
            <title>{subject} | Rozvrh | Intranet</title>
          </Helmet>
          <SubjectInfoBoard
            id={active_subject.id}
            name={active_subject.name}
            teacher={active_subject.teacher}
            time={days[active_subject.day] + "; " + periods[active_subject.period]}
            desc={active_subject.desc}
            type={active_subject.type}
            capacity={active_subject.capacity + "/" + active_subject.capacityMax}
          />

        </>);
      }} />
    </>);
    */
  }
}
