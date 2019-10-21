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
                </div>
            </Link>
        </div>;
    }
}