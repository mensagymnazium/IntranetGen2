import React, { Component } from 'react';
import FakeSubjects from "../Subjects.json";
import Subject from "../objects/Subject";
import { Link } from "react-router-dom";

export default class CRUD extends Component {
    constructor() {
        super();

        this.state = {
            subjects: FakeSubjects.map(Subject.from)
        };
    }

    editSubject(subject, newData) {
        if (!subject) { this.createSubject(newData); } else {
            console.log(`Editován Předmět "${subject.name} s ID "${subject.id}"`);
            window.location = "/subjects/" + newData.id.value;
        }
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
        console.log(`Vytvořen Předmět "${newData.name.value}" s ID "${newId}"`);
        window.location = "/subjects/" + newData.id.value;
    }

    removeSubject(subjectId) {
        var subject = this.state.subjects.find(subject => subject.id === subjectId);
        if (!window.confirm(`Jste si tímto jisti?\nPředmět "${subject.name}" (${subject.id}) bude trvale smazán.`)) { return; }
        console.log(`Odstraněn Předmět "${subject.name}" s ID "${subject.id}"`);
    }


    render() {
        var selectedSubjectId = this.props.match.params.subject;
        var selectedSubject = this.state.subjects.find(subject => subject.id === selectedSubjectId);
        
        return (

            <div>
            <br /><br />
                <form id="SubjectCRUDForm">
                    <input type="text" name="name" defaultValue={selectedSubject ? selectedSubject.name : ""} />
                    <hr />
                    <span>Vyučující: </span><input type="text" name="teacher" defaultValue={selectedSubject ? selectedSubject.teacher : ""} />
                    <br /><span>Den: </span>
                    <select name="day" defaultValue={selectedSubject ? selectedSubject.period.day : 0}>
                        <option value={0}>Pondělí</option>
                        <option value={1}>Úterý</option>
                        <option value={2}>Středa</option>
                        <option value={3}>Čtvrtek</option>
                        <option value={4}>Pátek</option>
                    </select>
                    <span> Perioda: </span>
                    <select name="period" defaultValue={selectedSubject ? selectedSubject.period.period : 0}>
                        <option value={0}>1. - 2.</option>
                        <option value={1}>3. - 4.</option>
                        <option value={2}>5. - 6.</option>
                        <option value={3}>7. - 8.</option>
                        <option value={4}>9. - 10.</option>
                    </select>
                
                    <br /><span>Oblast: </span>{/*To be added*/}
                    <br /><span>Maximální Kapacita: </span><input type="number" name="capacity" defaultValue={selectedSubject ? selectedSubject.capacity : 20} />
                    <br /><br /><textarea name="description" style={{ whiteSpace: "pre-wrap" }} rows="4" cols="40" defaultValue={selectedSubject ? selectedSubject.description : ""} />

                    <hr /><p>ID: {selectedSubject ? selectedSubjectId : "New Subject"}</p><hr />
                    <button type="button" onClick={() => { if (window.confirm("Vrátit se bez uložení změn?")) { window.location = "/subjects/" + selectedSubjectId } }}>Zpět</button>
                    <button type="button" onClick={() => this.editSubject(selectedSubject ? selectedSubject : null, document.getElementById("SubjectCRUDForm"))}>Uložit změny</button>
                    <button type="button" onClick={() => this.removeSubject(selectedSubjectId)}>Odstranit</button>

            </form>
        </div>);
}
}
