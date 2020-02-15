import React, { useState, useEffect } from "react";
import { LoggedUserInfo } from "./LoggedUserInfo.js";
import { SubjectsInfoTable } from "./SubjectsInfoTable.js";

export const Subjects = props => {
  const [subjects, setSubjects] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = props.api.GetAllSubjects();
      result
        .then(result => setSubjects(result))
        .catch(errors => setErrors(errors));
    }
    fetchData();
  }, []);

  return (
    <div>
      <LoggedUserInfo name={props.user} grade="Prima" role="0" />
      <SubjectsInfoTable subjects={subjects} />
    </div>
  );
};
