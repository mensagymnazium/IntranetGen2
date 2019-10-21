import Period from "./Period";

export default class Subject {
  id;
  name;
  category;
  teacher;
  description;
  period;
  students;
  capacity;

  constructor(id, name, category, teacher, description, period, students, capacity) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.teacher = teacher;
    this.description = description;
    this.period = period;
    this.students = students;
    this.capacity = capacity;
  }

  toString() {
    return this.name;
  }

  static from(data) {
    return new Subject(
      data.id,
      data.name,
      data.category,
      data.teacher,
      data.description,
      new Period(data.period.day, data.period.period),
      data.students,
      data.capacity
    );
  }
}