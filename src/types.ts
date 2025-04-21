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

export type ConferenceDay = "2025-04-23" | "2025-04-24" | "2025-04-25";

export const ConferenceDayLabels: Record<ConferenceDay, string> = {
  "2025-04-23": "Wed",
  "2025-04-24": "Thu",
  "2025-04-25": "Fri",
};

export const SpeakerEvent: ConferenceDay = "2025-04-23";
export const ConferenceDay1: ConferenceDay = "2025-04-24";
export const ConferenceDay2: ConferenceDay = "2025-04-25";

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
