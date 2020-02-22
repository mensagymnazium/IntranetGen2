import React, { useState, useEffect } from "react";
import { SubjectsInfoTable } from "./SubjectsInfoTable.js";
import SubjectApi from "./../services/SubjectApi";
import { msalAuth } from "../msal/MsalAuthProvider";

export const Subjects = props => {
  const [subjects, setSubjects] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const accessTokenRequest = {
        scopes: ["api://6842fe3c-f09c-4ec1-b6b0-1d15cf6a37bf/Subjects.Read"]
      };
      var bearerToken = null;
      try {
        bearerToken = await msalAuth.acquireTokenSilent(accessTokenRequest);
      } catch (error) {
        console.log("AquireTokenSilent failure");
        bearerToken = await msalAuth.acquireTokenPopup(accessTokenRequest);
      }
      if (bearerToken) {
        let apiUrl = "https://localhost:44392/";
        let api = new SubjectApi(apiUrl, bearerToken.accessToken);
        const result = api.GetAllSubjects();
        result
          .then(result => {
            setSubjects(result);
          })
          .catch(errors => setErrors(errors));
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
