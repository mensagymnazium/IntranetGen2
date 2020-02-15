import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { SubjectInformation } from "./SubjectInformation";
import { TableSchedule } from "./TableSchedule.js";

export const SubjectsInfoTable = props => {
  let subjects = props.subjects;
  const [subjectInfo, setSubjectInfo] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState({});
  const signedSubjects = new Set();

  const handleInfoClick = e => {
    console.log(subjects);
    let item = subjects.find(subject => subject.id === +e.target.id);
    setSelectedSubject(item);
    setSubjectInfo(true);
  };

  const handleSignUpClick = e => {
    let item = subjects.find(subject => subject.id === e.target.id);
    signedSubjects.add(item);

    console.log(subjects);
  };

  return (
    <React.Fragment>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Název</th>
            <th>Den</th>
            <th>Hodina</th>
            <th>Typ</th>
            <th>Vyučující</th>
            <th>Kapacita</th>
            <th>Více info</th>
            <th>Zapsat</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map(row => {
            return (
              <tr>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.day}</td>
                <td>{row.period}</td>
                <td>{row.category}</td>
                <td>{row.teacher}</td>
                <td>
                  {row.enrolledStudents}/{row.capacity}
                </td>
                <td>
                  <button id={row.id} onClick={e => handleInfoClick(e)}>
                    Více info
                  </button>
                </td>
                <td>
                  <button id={row.id} onClick={e => handleSignUpClick(e)}>
                    Click
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <SubjectInformation
        selectedSubject={selectedSubject}
        show={subjectInfo}
        onHide={() => setSubjectInfo(false)}
      />

      <TableSchedule />
    </React.Fragment>
  );
};
