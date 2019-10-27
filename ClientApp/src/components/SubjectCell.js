import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "../style/SubjectSelectionTable.css";

export default class SubjectCell extends Component {
    render() {
        return <div className = "subjectCell">
            <Link to={"/subjects/" + this.props.subject.id} className="scheduleLink">
                <div className = "subjectNameWrapper" style={{fontWeight: this.props.bold ? "bold" : "normal"}}>
                    <div className = "subjectName">{this.props.subject.name}</div>
                    <div className = "teacherName">{this.props.subject.teacher}</div>
                    {this.props.CRUDMode ?
                        <>
                            <button className="subjectCellEdit subjectCellCRUD" onClick={() => window.location =  "/edit/" + this.props.subject.id }><img src="https://img.icons8.com/material-rounded/24/000000/edit.png" alt="Edit Icon" /></button>
                            <button className="subjectCellRemove subjectCellCRUD" onClick={() => this.props.remove(this.props.subject.id)}><img src="https://img.icons8.com/material-rounded/24/000000/filled-trash.png" alt="Remove Icon" /></button>
                        </> : null}
                </div>
            </Link>
        </div>;
    }
}