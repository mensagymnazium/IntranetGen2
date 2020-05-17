import { Grade, SubjectType, Day, TimePeriod } from "./Enums";

export const Types = [
  SubjectType.LanguageCommunication,
  SubjectType.MathApplication,
  SubjectType.Informatics,
  SubjectType.HumanSociety,
  SubjectType.HumanNature,
  SubjectType.ArtCulture,
  SubjectType.HumanHealth,
  SubjectType.HumanWork
];

export const Categories = [
  SubjectType.Graduational,
  SubjectType.ForeignLanguage,
  SubjectType.Seminars,
  SubjectType.SpecialSeminars
];

export const Days = [
  Day.Monday,
  Day.Tuesday,
  Day.Wednesday,
  Day.Thursday,
  Day.Friday
];

export const TimePeriods = [
  TimePeriod.FirstSecond,
  TimePeriod.ThirdFourth,
  TimePeriod.FifthSixth,
  TimePeriod.SeventhEighth,
  TimePeriod.NinthTenth
];
export const Grades = [
  Grade.Prima,
  Grade.Sekunda,
  Grade.Tercie,
  Grade.Kvarta,
  Grade.Kvinta,
  Grade.Sexta,
  Grade.Septima,
  Grade.Oktava
];
