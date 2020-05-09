import React from "react";
import SubjectSigning from "./DevExpress/SubjectSigning";
import SigningInfo from "./SigningInfo";

class StudentSigns extends React.Component {
  render() {
    return (
      <div>
        <SigningInfo />
        <br />
        <h3>
          <strong>Zápisy: </strong>
        </h3>
        <SubjectSigning {...this.props} />
      </div>
    );
  }
}

export default StudentSigns;
