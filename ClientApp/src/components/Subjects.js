import React, { useState, useEffect } from "react";
import { LoggedUserInfo } from "./LoggedUserInfo.js";
import { SubjectsInfoTable } from "./SubjectsInfoTable.js";
import SubjectApi from "./../services/SubjectApi";
import { msalAuth } from "../msal/MsalAuthProvider";

export const Subjects = props => {
  // if (user) {
  //   api = new SubjectApi(apiUrl, bearerToken);
  // } else {
  //   api = null;
  // }

  let apiUrl = "https://localhost:44392/";

  const [subjects, setSubjects] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const accessTokenRequest = {
        scopes: ["Subjects.Read"]
      };
      let bearerToken = await msalAuth.acquireTokenSilent(accessTokenRequest);
      console.log(bearerToken.idToken.rawIdToken);
      // let api = new SubjectApi(apiUrl, bearerToken.idToken.rawIdToken);
      // const result = api.GetAllSubjects();
      // result
      //   .then(result => {
      //     setSubjects(result);
      //   })
      //   .catch(errors => setErrors(errors));
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
