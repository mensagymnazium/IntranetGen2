import React from "react";
import { LoggedUserInfo } from "./LoggedUserInfo.js";
import { SubjectsInfoTable } from "./SubjectsInfoTable.js";

export const Subjects = () => {
  return (
    <div>
      <LoggedUserInfo name="Test" grade="Prima" role="0" />
      <SubjectsInfoTable />
    </div>
  );
};
