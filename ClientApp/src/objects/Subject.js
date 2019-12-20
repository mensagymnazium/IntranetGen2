import Period from "./Period";
import Teacher from "./Teacher";

export const gradeNames = [
  "Prima",
  "Sekunda",
  "Tercie",
  "Kvarta",
  "Kvinta",
  "Sexta",
  "Septima",
  "Oktáva"
]

export default class Subject {
  id;
  name;
  teacher;
  description;
  period;
  students;
  capacity;
  grades;

  constructor(id, name, teacher, description, period, students, capacity, grades) {
    this.id = id;
    this.name = name;
    this.teacher = teacher;
    this.description = description;
    this.period = period;
    this.students = students;
    this.capacity = capacity;
    this.grades = grades;
  }

  toString() {
    return this.name;
  }

  static from(data) {
    return new Subject(
      data.id,
      data.name,
      data.teacher && new Teacher(data.teacher.id, data.teacher.name),
      data.description,
      new Period(data.period.day, data.period.period),
      data.students,
      data.capacity,
      data.grades
    );
  }
}