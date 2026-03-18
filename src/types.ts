export type RawSheetEntry = {
  start: string;
  end: string;
  title: string;
  place: string;
  persons: string;
  comment: string;
};

export type ApiResponse = {
  title: string;
  slug: string;
  data: RawSheetEntry[];
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

export const DAY_1 = "06-05-2026";
export const DAY_2 = "07-05-2026";
export const DAY_3 = "08-05-2026";


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
