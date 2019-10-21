import React, { Component } from 'react';
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
        var selectedSubject = this.state.subjects.find(subject => subject.id === this.props.match.params.subject);
        console.log(this.props.match.params.subject);

        return (<>
            <Helmet>
                <title>Rozvrh | Intranet</title>
            </Helmet>

            <SubjectSelectionTable subjects={this.state.subjects} selectedSubject={selectedSubject ? selectedSubject.id : null} />

            {(() => {
                if (selectedSubject) {
                    return (<>
                        <Helmet>
                            <title>{selectedSubject.name} | Rozvrh | Intranet</title>
                        </Helmet>

                        <SubjectDetails subject={selectedSubject} select = {(id) => this.selectSubject(id)}/>
                    </>);
                }
            })()}
        </>);
    }
}
