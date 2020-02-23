import React, { useState, useEffect } from "react";
import { SubjectsInfoTable } from "./SubjectsInfoTable.js";
import SubjectApi from "./../services/SubjectApi";
import { getTokenByScope } from "../helpers/TokenHelper";

export const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let scope = ["api://6842fe3c-f09c-4ec1-b6b0-1d15cf6a37bf/Subjects.Read"];
      getTokenByScope(scope).then(token => {
        let api = new SubjectApi(token.accessToken);
        const result = api.GetAllSubjects();
        result
          .then(result => {
            setSubjects(result);
          })
          .catch(errors => setErrors(errors));
      });
    }
    fetchData();
  }, []);

  return (
    <div>
      <SubjectsInfoTable subjects={subjects} />
    </div>
  );
};
