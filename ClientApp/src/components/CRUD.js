import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';

import SubjectSelectionTable from './SubjectSelectionTable';
import SubjectDetailsCRUD from './SubjectDetailsCRUD';

import FakeSubjects from "../Subjects.json";
import Subject from "../objects/Subject";

export default class CRUD extends Component {
    constructor() {
        super();

        this.state = {
            subjects: FakeSubjects.map(Subject.from)
        };
    }

    selectSubject(subjectId) {
        var subject = this.state.subjects.find(subject => subject.id === subjectId);

        console.log(`Zvolen předmět "${subject.name}" s ID "${subjectId}"`);
    }

    editSubject(subjectId, newData) {
        var subject = this.state.subjects.find(subject => subject.id === subjectId); {/*Tady bychom měli zkontrolovat změny a to co se změnilo propsat*/}
        console.log(`Editován Předmět "${subject.name} s ID "${subjectId}"`);
    }
    createSubject(subjectId, newData) {
        var subject = this.state.subjects.find(subject => subject.id === subjectId);
        console.log(`Vytvořen Předmět "${subject.name} s ID "${subjectId}"`);
    }
    removeSubject(subjectId, newData) {
        var subject = this.state.subjects.find(subject => subject.id === subjectId);
        console.log(`Odstraněn Předmět "${subject.name}" s ID "${subjectId}"`);
    }

    render() {
        var selectedSubjectId = this.props.match.params.subject;
        var selectedSubject = this.state.subjects.find(subject => subject.id === selectedSubjectId);

        if (selectedSubjectId && !selectedSubject) {
            return <Redirect to="/CRUD" />
        }

        return (<>
            <Helmet>
                <title>Editace | Intranet</title>
            </Helmet>

            <SubjectSelectionTable subjects={this.state.subjects} selectedSubject={selectedSubject ? selectedSubject.id : null} CRUDMode={true}/>

            {selectedSubject &&
                <>
                    <Helmet>
                        <title>{selectedSubject.name} | Editace | Intranet</title>
                    </Helmet>

                <SubjectDetailsCRUD subject={selectedSubject} select={(id) => this.selectSubject(id)} create={(id, form) => this.createSubject(id,form)} delete={(id, form) => this.deleteSubject(id, form)} edit={(id, form) => this.editSubject(id,form)}/>
                </>
            }
        </>);
    }
}
