import {ConferenceDay, DaySchedule, Person, Place, RawLocationEntry, RawSheetEntry} from "@/types";
import {Config} from "@/config";


const getUrlFor = (tabName: string): string => {
  return `${Config.sheetUrl}/${tabName}`
}

export const GoogleSheetIntegration = {

  fetchConferenceDay: async (conferenceDay: ConferenceDay): Promise<DaySchedule> => fetch(getUrlFor(conferenceDay
  )).then(response => response.json()).then((data: RawSheetEntry[]) =>
      data.map(item => ({...item, persons: item.persons?.split(", ") ?? []}))),

  fetchPersons: async (): Promise<Person[]> => fetch(getUrlFor("Persons")).then(response => response.json()),

  fetchPlaces: async (): Promise<Place[]> => fetch(getUrlFor("Places")).then(response => response.json()).then((data: RawLocationEntry[]) => data.map(entry =>
      entry.name
  ))
}
