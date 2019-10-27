import React, { Component } from 'react';

import SubjectCell from './SubjectCell';
import "../style/SubjectSelectionTable.css";

import { dayNames, periodNames } from "../objects/Period";

export default class SubjectSelectionTable extends Component {
    renderPeriod(period, periodName, subjects) {
        return (
            <div key={period} className="subjectsRow scheduleRow">
                <div className="periodName">
                    {periodName}
                </div>
        
                <div className="subjectsSubRow">
                    {
                        subjects.map(subject => {
                            return <SubjectCell subject={subject} bold={subject.id === this.props.selectedSubject} key={subject.id} CRUDMode={this.props.CRUDMode} remove={(id) => this.props.remove ? this.props.remove(id) : null}/>;
                        })
                    }
                </div>
            </div>
        );
    }

    renderDay(day, dayName, subjects) {
        return (
            <React.Fragment key={day}>
                <div className="dayName scheduleRow">
                    {dayName}
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
            <div className="subjectTable">
                {
                    dayNames.map((dayName, day) => {
                        var daySubjects = this.props.subjects.filter(subject => subject.period.day === day);
                        if (daySubjects.length) {
                            return this.renderDay(day, dayName, daySubjects);
                        }
                        return null;
                    })
                }
            </div>
        </>);
    }
}

