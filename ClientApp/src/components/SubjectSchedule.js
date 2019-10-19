import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import SubjectSelectionTable from './SubjectSelectionTable';
import SubjectDetails from './SubjectDetails';

import FakeSubjects from "../Subjects.json";
import Subject from "../objects/Subject";

export default class SubjectSchedule extends Component {
    constructor() {
        super();

        this.state = {
            subjects: FakeSubjects.map(Subject.from)
        };
    }

    selectSubject(subjectID) {
        var subject = this.state.subjects.find(subject => subject.id === subjectID);
        
        console.log(`Přihlášen předmět "${subject.name}".`);
    }

    render() {
        return (<>
            <Helmet>
                <title>Rozvrh | Intranet</title>
            </Helmet>

            <SubjectSelectionTable subjects={this.state.subjects} />

            <Route path="/subjects/:subject" render={(props) => {
                var subject = this.state.subjects.find(subject => subject.id === props.match.params.subject);

                if (subject) {
                    return (<>
                        <Helmet>
                            <title>{subject.name} | Rozvrh | Intranet</title>
                        </Helmet>

                        <SubjectDetails subject={subject} select = {(id) => this.selectSubject(id)}/>
                    </>);
                }
            }}/>
        </>);
    }
}
