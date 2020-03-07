import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { TableSchedule } from "./TableSchedule.js";
import { SubjectData } from "./SubjectData";
import { getAllSubjects } from "./../services/SubjectApi";
import { getTokenByScope } from "../helpers/TokenHelper";
import { getSignedSubjects } from "./../services/UserApi";

export const SubjectsInfoTable = () => {
  const [subjects, setSubjects] = useState([]);
  const [signedSubjects, setSignedSubjects] = useState([]);
  const [triggerApi, setTriggerApi] = useState();

  useEffect(() => {
    async function apiGetAllSubjects() {
      try {
        let result = await getAllSubjects();
        setSubjects(result.data);
      } catch (error) {
        console.log(error);
        //TODO Logger
      }
    }
    apiGetSignedSubjects();
    apiGetAllSubjects();
  }, [triggerApi]);

  async function apiGetSignedSubjects() {
    try {
      var signedSubjects = await getSignedSubjects();
      setSignedSubjects(signedSubjects.data);
    } catch (error) {
      console.log(error);
      //TODO Logger
    }
  }

  return (
    <React.Fragment>
      <Table responsive>
        <thead>
          <tr>
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
            let signed = false;
            if (signedSubjects.some(subject => subject.id === row.id)) {
              signed = true;
            }

            return (
              <SubjectData
                subject={row}
                signed={signed}
                setTriggerApi={setTriggerApi}
              />
            );
          })}
        </tbody>
      </Table>

      <TableSchedule />
    </React.Fragment>
  );
};
