import {
  ConferenceDay,
  ConferenceDay1,
  DaySchedule,
  FilterType,
  Person,
  PersonName,
  PersonsDict,
  Place,
  ViewType,
} from "@/types";
import { atom } from "jotai";
import { atomWithHash } from "jotai-location";

export const selectedConferenceDayAtom = atomWithHash("cd", ConferenceDay1);

export const selectedViewTypeAtom = atomWithHash<ViewType>("vt", "by Places");

export const selectedFilterTypeAtom = atomWithHash<FilterType>("ft", "all");

export const selectedPersonsFilterAtom = atomWithHash<PersonName[]>("p", []);

export const selectedPlacesFilterAtom = atomWithHash<Place[]>(
  "selectedPlacesFilter",
  []
);

export const personsAtom = atom<PersonsDict>({});
export const placesAtom = atom<Place[]>([]);

export const daySchedulesAtom = atom<
  Record<ConferenceDay, DaySchedule> | undefined
>(undefined);
