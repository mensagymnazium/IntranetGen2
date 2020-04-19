import React from "react";
import "./../styles/TableSchedule.css";

export const TableSchedule = subjects => {
  var days = ["Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek"];

  return (
    <table className="schedule">
      <caption>Tvorba rozvrhu</caption>
      <thead>
        <tr> {generateHours()} </tr>
      </thead>
      <tbody>{generateTable(days, subjects)}</tbody>
    </table>
  );
};
const generateTable = (days, subjects) => {
  var table = [];
  days.map(day => {
    table.push(<tr> {generateDay(day, subjects)} </tr>);
  });
  return table;
};

const generateDay = (day, subjects) => {
  var row = [];
  row.push(<td>{day}</td>);
  for (var i = 1; i < 11; i++) {
    row.push(<td></td>);
  }
  return row;
};

const generateHours = () => {
  var hours = [];
  hours.push(<th scope="col"></th>);
  for (var i = 1; i < 11; i++) {
    hours.push(<th scope="col">{i}</th>);
  }
  return hours;
};
