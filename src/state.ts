import {atomWithStorage} from 'jotai/utils';
import {
  ConferenceDay,
  ConferenceDay1,
  DaySchedule,
  FilterType,
  Person,
  PersonName,
  Place,
  ViewType
} from "@/types";
import {atom} from "jotai";

export const selectedConferenceDayAtom = atomWithStorage('selectedConferenceDay', ConferenceDay1);

export const selectedViewTypeAtom = atomWithStorage<ViewType>('selectedViewType', 'by Places');

export const selectedFilterTypeAtom = atomWithStorage<FilterType>('selectedFilterType', 'all');

export const selectedPersonsFilterAtom = atomWithStorage<PersonName[]>('selectedPersonsFilter', []);

export const selectedPlacesFilterAtom = atomWithStorage<Place[]>('selectedPlacesFilter', []);

export const personsAtom = atom<Person[]>([]);
export const placesAtom = atom<Place[]>([]);

export const daySchedulesAtom = atom<Record<ConferenceDay, DaySchedule> | undefined>(undefined);
