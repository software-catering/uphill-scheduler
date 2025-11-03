export type RawSheetEntry = {
  start: string;
  end: string;
  title: string;
  place: string;
  persons: string;
};

export type RawPersonEntry = {
  name: string;
  role: string;
};

export type RawLocationEntry = {
  name: string;
};

export type Place = string;
export type PersonName = string;

export type Role = string;
export type Person = { name: PersonName; role: Role };
export type PersonsDict = Record<Role, Person[]>;

export type ScheduleEntry = {
  start: string;
  end: string;
  title: string;
  place: Place;
  persons: PersonName[];
};

export type DaySchedule = ScheduleEntry[];

export const DAY_1 = "2026-05-06";
export const DAY_2 = "2026-05-07";
export const DAY_3 = "2026-05-08";


export type ConferenceDay = typeof DAY_1 | typeof DAY_2 | typeof DAY_3;

export const ConferenceDayLabels: Record<ConferenceDay, string> = {
  [DAY_1]: "Wed",
  [DAY_2]: "Thu",
  [DAY_3]: "Fri",
};

export const SpeakerEvent: ConferenceDay = DAY_1;
export const ConferenceDay1: ConferenceDay = DAY_2;
export const ConferenceDay2: ConferenceDay = DAY_3;

export type Event = {
  title: string;
  start: Date;
  end: Date;
  color: string;
};

export type FilterType = "place" | "persons" | "all";

export type ViewType = "by Places" | "by Persons" | "combined";
export const Views: Record<ViewType, ViewType> = {
  "by Places": "by Places",
  "by Persons": "by Persons",
  combined: "combined",
};
