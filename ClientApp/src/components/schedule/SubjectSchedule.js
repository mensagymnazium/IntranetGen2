import React, { Component } from 'react';

import SubjectCell from './SubjectCell';

import { dayNames, periodNames } from "../../objects/Period";

export default class SubjectSchedule extends Component {
  renderSubject(subject) {
    return <SubjectCell
      subject={subject}
      bold={subject.id === this.props.selectedSubject}
      key={subject.id}
      {...this.props.cellProps} />;
  }

  renderPeriod(period, periodName, subjects) {
    return (
        <div key={period} className="subjectsRow scheduleRow">
            <div className="row">
                <div className="periodName col-2">
                  <h5>{periodName}</h5>
                </div>

                <div className="subjectsSubRow card-columns col-10">
                  {
                    subjects.map(subject => this.renderSubject(subject))
                  }
            </div>
        </div>
      </div>
    );
  }

  renderDay(day, dayName, subjects) {
    return (
      <React.Fragment key={day}>
            <div className="dayName scheduleRow">
                <h4>{dayName}</h4><hr/>
        </div>

        {
          periodNames.map((periodName, period) => {
            var periodSubjects = subjects.filter(subject => subject.period.period === period);
            if (periodSubjects.length) {
              return this.renderPeriod(period, periodName, periodSubjects);
            }
            return null;
          })
        }
      </React.Fragment>
    );
  }

  render() {
    return (<>
        <div className="subjectTable card text-center border-secondary">
            <div className="card-body">
            <ul className="list-group list-group-flush">
        {
          dayNames.map((dayName, day) => {
            var daySubjects = this.props.subjects.filter(subject => subject.period.day === day);
              if (daySubjects.length) {
                  return <li className="list-group-item">{this.renderDay(day, dayName, daySubjects)}</li>;
                }
                return null;
              })
                    }
                </ul>
            </div>
      </div>
    </>);
  }
}

