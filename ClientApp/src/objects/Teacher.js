export default class Subject {
  id;
  name;

  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  toString() {
    return this.name;
  }
}