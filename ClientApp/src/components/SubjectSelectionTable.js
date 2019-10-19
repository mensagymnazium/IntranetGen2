import React, { Component } from 'react';

import SubjectCell from './SubjectCell';
import "../style/SubjectSelectionTable.css";

import { dayNames, periodNames } from "../objects/Period";

export default class SubjectSelectionTable extends Component {
    render() {
        return (<>
            <div className="subjectTable">
                {
                    dayNames.map((dayName, day) => {
                        var daySubjects = this.props.subjects.filter(subject => subject.period.day === day);
                        if (daySubjects.length) {
                            return (<React.Fragment key={day}>
                                <div className="dayName scheduleRow">{dayName}</div>
                                {
                                    periodNames.map((periodName, period) => {
                                        var periodSubjects = daySubjects.filter(subject => subject.period.period === period);
                                        if (periodSubjects.length) {
                                            return (<div key={period} className="scheduleRow">
                                                <div className="periodName">
                                                    {periodName}
                                                </div>
                                                <div className="subjectsSubRow">
                                                    {
                                                        periodSubjects.map(subject => {
                                                            return <SubjectCell subject={subject} key={subject.id}/>;
                                                        })
                                                    }
                                                </div>
                                            </div>);
                                        }
                                        return null;
                                    })
                                }
                            </React.Fragment>);
                        }
                        return null;
                    })
                }
            </div>
        </>)
    }
}

