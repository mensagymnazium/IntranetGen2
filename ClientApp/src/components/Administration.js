import React from "react";
import SubjectCrud from "./DevExpress/SubjectCrud";
import GradesRulesCrud from "./DevExpress/GradesRulesCrud";

class Administration extends React.Component {
  render() {
    return (
      <div>
        <h3>Předměty</h3>
        <SubjectCrud {...this.props} />
        <br />
        <h3>Pravidla</h3>
        <GradesRulesCrud {...this.props} />
      </div>
    );
  }
}

export default Administration;
