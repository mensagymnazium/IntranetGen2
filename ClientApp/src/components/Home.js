import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { insertOrUpdateUser } from "./../services/UserApi";
import { getTokenByScope } from "../helpers/TokenHelper";
import { getUserGroup } from "../services/GraphService";

import { Grade } from "./../helpers/Enums";

export const Home = props => {
  let user = {
    Email: props.auth.user.userName,
    StudentClass: ""
  };

  useEffect(() => {
    async function getUserGroups() {
      let scope = ["user.read"];
      let token = await getTokenByScope(scope);
      let groups = await getUserGroup(token);
      console.log(groups);
      user.StudentClass = await getStudentClass(groups.value);
      console.log(user.StudentClass);
      apiInsertOrUpdateUser();
    }
    async function apiInsertOrUpdateUser() {
      try {
        insertOrUpdateUser(user);
      } catch (error) {
        console.log(error);
        //TODO Logger
      }
    }
    getUserGroups();
  }, [user]);

  return (
    <React.Fragment>
      <Helmet>
        <title>Intranet</title>
      </Helmet>
      <div className="container">
        <div className="alert alert-warning border border-warning">
          <p>Toto je hlavní stránka nového Intranetu</p>
          <p>Ještě není jasný, jestli sem něco dáme nebo ne</p>
          <p>
            Tato stránka byla vykreslena v <b>{new Date().toLocaleString()}</b>.
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

async function getStudentClass(groups) {
  var gradesList = [
    Grade.Prima,
    Grade.Sekunda,
    Grade.Tercie,
    Grade.Kvarta,
    Grade.Kvinta,
    Grade.Sexta,
    Grade.Septima,
    Grade.Oktava
  ];
  return gradesList.find(name =>
    groups.find(group => group.displayName === name)
  );
}
