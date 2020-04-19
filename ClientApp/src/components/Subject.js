import React from "react";
import "../styles/Subject.css";

export const Subject = props => {
  const { name, teacher } = props;
  return (
    <div>
      <div className="subject" style={{ backgroundColor: "red" }}>
        <p>{name} </p>
        <p className="teacher">{teacher}</p>
      </div>
      />
    </div>
  );
};
