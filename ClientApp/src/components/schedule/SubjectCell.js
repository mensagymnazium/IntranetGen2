import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "../../style/SubjectSelectionTable.css";

export default class SubjectCell extends Component {
  render() {
    var link = `/${this.props.editMode ? "admin" : "subjects"}/${this.props.subject.id}`;

    return <div className="subjectCell">
      <Link to={link} replace className="scheduleLink">
        <div className="subjectNameWrapper" style={{ fontWeight: this.props.bold ? "bold" : "normal" }}>
          <div className="subjectName">{this.props.subject.name}</div>
          <div className="teacherName">{this.props.subject.teacher ? this.props.subject.teacher.name : ""}</div>
        </div>
      </Link>
      {this.props.editMode &&
        <>
          <button className="subjectCellEdit subjectCellCRUD" onClick={() => this.props.edit(this.props.subject.id)}><img src="https://img.icons8.com/material-rounded/24/000000/edit.png" alt="Edit" /></button>
          <button className="subjectCellRemove subjectCellCRUD" onClick={() => this.props.delete(this.props.subject.id)}><img src="https://img.icons8.com/material-rounded/24/000000/filled-trash.png" alt="Delete" /></button>
        </>
      }
    </div>;
  }
}