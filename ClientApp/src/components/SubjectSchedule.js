import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';
import { Link } from "react-router-dom";

import SubjectSelectionTable from './SubjectSelectionTable';
import SubjectDetails from './SubjectDetails';

import FakeSubjects from "../Subjects.json";
import Subject from "../objects/Subject";

export default class SubjectSchedule extends Component {
    constructor() {
        super();

        this.state = {
            subjects: FakeSubjects.map(Subject.from),
            CRUD: true
        };
    }

    selectSubject(subjectId) {
        var subject = this.state.subjects.find(subject => subject.id === subjectId);

        console.log(`Přihlášen předmět "${subject.name}" s ID "${subjectId}".`);
    }
    removeSubject(subjectId) {
        var subject = this.state.subjects.find(subject => subject.id === subjectId);

        console.log(`Odstraněn předmět "${subject.name}" s ID "${subjectId}".`);
    }
    

    render() {
        var selectedSubjectId = this.props.match.params.subject;
        var selectedSubject = this.state.subjects.find(subject => subject.id === selectedSubjectId);
        
        if (selectedSubjectId && !selectedSubject) {
            return <Redirect to="/subjects"/>
        }

        return (<>
            <Helmet>
                <title>Rozvrh | Intranet</title>
            </Helmet>

            <SubjectSelectionTable subjects={this.state.subjects} selectedSubject={selectedSubject ? selectedSubject.id : null} CRUDMode={this.state.CRUD} remove={(id) => this.removeSubject(id)} />
            

            {selectedSubject &&
                <>
                    <Helmet>
                        <title>{selectedSubject.name} | Rozvrh | Intranet</title>
                    </Helmet>

                <SubjectDetails subject={selectedSubject} select={(id) => this.selectSubject(id)} remove={(id) => this.removeSubject(id)} CRUDMode={this.state.CRUD} />
                </>
            }
            <hr /><Link to={"/edit/"}><button>Nový Předmět</button></Link>
        </>);
    }
}
