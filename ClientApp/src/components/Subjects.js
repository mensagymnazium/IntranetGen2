import React, { useState, useEffect } from "react";
import { SubjectsInfoTable } from "./SubjectsInfoTable.js";
import { getAllSubjects } from "./../services/SubjectApi";
import { getTokenByScope } from "../helpers/TokenHelper";

export const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let scope = ["api://6842fe3c-f09c-4ec1-b6b0-1d15cf6a37bf/Subjects.Read"];
      try {
        let token = await getTokenByScope(scope);
        let result = await getAllSubjects(token.accessToken);
        setSubjects(result.data);
      } catch (error) {
        console.log(error);
        //TODO Logger
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <SubjectsInfoTable subjects={subjects} />
    </div>
  );
};
