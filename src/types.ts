export type RawSheetEntry = {
  "start": string,
  "end": string,
  "title": string,
  "place": string,
  "persons": string,
}

export type RawPersonEntry = {
  name: string;
  role: string;
}

export type RawLocationEntry = {
  name: string;

}

export type Place = string;
export type PersonName = string;
export type Person = { name: PersonName, role: string };

export type ScheduleEntry = {
  "start": string,
  "end": string,
  "title": string,
  "place": Place,
  "persons": PersonName[],
}

export type DaySchedule = ScheduleEntry[]

export type ConferenceDay = '2025-04-24' | '2025-04-25'

export const ConferenceDayLabels: Record<ConferenceDay, string> = {
  "2025-04-24": "Thu",
  "2025-04-25": "Fri"
}

export const ConferenceDay1: ConferenceDay = '2025-04-24'
export const ConferenceDay2: ConferenceDay = '2025-04-25'

export type Event = {
  title: string,
  start: Date,
  end: Date,
  color: string
}

export type FilterType = 'place' | 'persons' | 'all';

export type ViewType = 'byPlaces' | 'byPersons' | 'combined';
export const Views: Record<ViewType, ViewType> = {
  byPlaces: 'byPlaces',
  byPersons: 'byPersons',
  combined: 'combined'
}
