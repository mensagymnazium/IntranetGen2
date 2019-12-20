import React, { Component } from 'react';
import { Link } from "react-router-dom";

import "../../style/SubjectSelectionTable.css";
import Icons from "../../style/IconsBase64.json";

export default class SubjectCell extends Component {
  render() {
    var link = `/${this.props.editMode ? "admin" : "subjects"}/${this.props.subject.id}`;

    return (
        <Link to={link} replace className="scheduleLink" title={this.props.subject.description}>
            <div className={"subjectCell card text-center " + (this.props.bold ? "border-primary" : "border-secondary")}>
                <div className="card-body">

                    <div className="subjectNameWrapper">
                        <div className={"subjectName " + (this.props.bold ? "h4" : "h6")}>{this.props.subject.name}</div>
                        <div className={"teacherName " + (this.props.bold ? "h6" : "h8")}>{this.props.subject.teacher}</div>
                    </div></div>

                {this.props.CRUDMode ?
                    <div className="card-footer"><div className="btn-group">
                        <button className="btn btn-primary subjectCellEdit subjectCellCRUD" onClick={() => window.location = "/edit/" + this.props.subject.id}><img height="30vh" src={Icons.edit} alt="Edit Icon" /></button>
                        <button className="btn btn-danger subjectCellRemove subjectCellCRUD" onClick={() => this.props.remove(this.props.subject.id)}><img height="30vh" src={Icons.delete} alt="Remove Icon" /></button>
                    </div></div> : null}

            </div></Link>);
  }
}