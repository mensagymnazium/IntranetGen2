import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';

import SubjectSelectionTable from './SubjectSelectionTable';
import SubjectDetails from './SubjectDetails';
import SubjectDetailsCRUD from './SubjectDetailsCRUD';

import FakeSubjects from "../Subjects.json";
import Subject from "../objects/Subject";

export default class SubjectSchedule extends Component {
    constructor() {
        super();

        this.state = {
            subjects: FakeSubjects.map(Subject.from),
            CRUD: true,
            editing: false
        };
    }

    selectSubject(subjectId) {
        var subject = this.state.subjects.find(subject => subject.id === subjectId);

        console.log(`Zvolen předmět "${subject.name}" s ID "${subjectId}"`);
    }

    editSubject(subjectId, newData) {
        var subject = this.state.subjects.find(subject => subject.id === subjectId);
        console.log(`Editován Předmět "${subject.name} s ID "${subjectId}"`);
    }
    createSubject(newData) {
        var newId = newData.name.value.toLowerCase();
        var IdReplace = 'áéěíýóúůžščřďťň ';
        var IdReplaceBy = 'aeeiyouuzscrdtn_';
        for (var i = 0; i < newId.length; i++) {
            if (IdReplace.includes(newId[i])) {
                newId = newId.substr(0, i) + IdReplaceBy[IdReplace.indexOf(newId[i])] + newId.substr(i + 1);
            }
        }

        //var subject = this.state.subjects.find(subject => subject.id === subjectId);
        console.log(`Vytvořen Předmět "${newData.name.value}" s ID "${newId}"`);
    }
    removeSubject(subjectId) {
        var subject = this.state.subjects.find(subject => subject.id === subjectId);
        if (!window.confirm(`Jste si tímto jisti?\nPředmět "${subject.name}" (${subject.id}) bude trvale smazán.`)) { return; }
        console.log(`Odstraněn Předmět "${subject.name}" s ID "${subject.id}"`);
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

            <SubjectSelectionTable subjects={this.state.subjects} selectedSubject={selectedSubject ? selectedSubject.id : null} />

            {selectedSubject && 
                <>
                    <Helmet>
                        <title>{selectedSubject.name} | Rozvrh | Intranet</title>
                    </Helmet>

                {this.state.editing ?
                    <SubjectDetailsCRUD subject={selectedSubject} openEmptyEditor={() => { this.state.editing = true }} openEditor={() => { this.state.editing = true }} CRUDMode={this.state.CRUD} />
                    : <SubjectDetails subject={selectedSubject} select={(id) => this.selectSubject(id)} openEmptyEditor={() => { this.state.editing = true }} remove={(id) => this.removeSubject(id)} openEditor={() => { this.state.editing = true; console.log("Oepn Editor") }} CRUDMode={this.state.CRUD} />}
                </>
            }
        </>);
    }
}
