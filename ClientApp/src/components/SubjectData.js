import React, { useState, useEffect } from "react";
import { getTokenByScope } from "./../helpers/TokenHelper";
import {
  signUpSubject,
  unSignUpSubject,
  getSignedSubjects
} from "./../services/UserApi";
import { SubjectInformation } from "./SubjectInformation";

export const SubjectData = props => {
  const { subject, setTriggerApi, signed } = props;
  console.log(signed);
  const [subjectInfo, setSubjectInfo] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState({});

  const handleInfoClick = () => {
    setSelectedSubject(subject);
    setSubjectInfo(true);
  };

  async function handleSignUpClick() {
    let scope = ["api://6842fe3c-f09c-4ec1-b6b0-1d15cf6a37bf/User.Write"];
    try {
      let token = await getTokenByScope(scope);
      await signUpSubject(token.accessToken, subject.id);
      setTriggerApi(`Signed ${props.id}`);
    } catch (error) {
      console.log(error);
      //TODO Logger
    }
  }

  async function handleUnSignUpClick() {
    let scope = ["api://6842fe3c-f09c-4ec1-b6b0-1d15cf6a37bf/User.Write"];
    try {
      let token = await getTokenByScope(scope);
      await unSignUpSubject(token.accessToken, subject.id);
      setTriggerApi(`Unsigned ${props.id}`);
    } catch (error) {
      console.log(error);
      //TODO Logger
    }
  }

  return (
    <React.Fragment>
      <tr>
        <td>{subject.name}</td>
        <td>{subject.day}</td>
        <td>{subject.period}</td>
        <td>{subject.type}</td>
        <td>{subject.teacher}</td>
        <td>
          {subject.enrolledStudents}/{subject.capacity}
        </td>
        <td>
          <button onClick={e => handleInfoClick(e)}>Více info</button>
        </td>
        <td>
          {signed === true ? (
            <button onClick={e => handleUnSignUpClick()}>Odhlásit se</button>
          ) : (
            <button onClick={e => handleSignUpClick()}>Click</button>
          )}
        </td>
      </tr>

      <SubjectInformation
        selectedSubject={selectedSubject}
        show={subjectInfo}
        onHide={() => setSubjectInfo(false)}
      />
    </React.Fragment>
  );
};
