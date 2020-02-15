import React, { useState, useEffect } from "react";
import { LoggedUserInfo } from "./LoggedUserInfo.js";
import { SubjectsInfoTable } from "./SubjectsInfoTable.js";
import SubjectApi from "./../services/SubjectApi";

export const Subjects = props => {
  const { user, apiUrl, bearerToken } = props;
  let api;
  if (user) {
    api = new SubjectApi(apiUrl, bearerToken);
  } else {
    api = null;
  }
  const [subjects, setSubjects] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = api.GetAllSubjects();
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
