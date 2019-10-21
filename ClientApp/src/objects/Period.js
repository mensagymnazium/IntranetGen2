export const dayNames = [
  "Pondělí",
  "Úterý",
  "Středa",
  "Čtvrtek",
  "Pátek",
  "Sobota",
  "Neděle"
]

export const periodNames = [
  "1. - 2.",
  "3. - 4.",
  "5. - 6.",
  "7. - 8.",
  "9. - 10."
]

export default class Period {
  day;
  period;

  constructor(day, period) {
    this.day = day;
    this.period = period;
  }

  get dayName() {
    return dayNames[this.day];
  }

  get periodName() {
    return periodNames[this.period];
  }

  toString() {
    return `${this.dayName}; ${this.periodName}`;
  }
}