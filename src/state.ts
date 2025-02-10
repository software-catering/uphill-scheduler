import {atomWithStorage} from 'jotai/utils';
import {ConferenceDay1, FilterType, PersonName, Place, ViewType} from "@/types";

export const selectedConferenceDayAtom = atomWithStorage('selectedConferenceDay', ConferenceDay1);

export const selectedViewTypeAtom = atomWithStorage<ViewType>('selectedViewType', 'byPlaces');

export const selectedFilterTypeAtom = atomWithStorage<FilterType>('selectedFilterType', 'persons');

export const selectedPersonsFilterAtom = atomWithStorage<PersonName[]>('selectedPersonsFilter', []);

export const selectedPlacesFilterAtom = atomWithStorage<Place[]>('selectedPlacesFilter', []);

