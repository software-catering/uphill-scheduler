import {atomWithStorage} from 'jotai/utils';
import {ConferenceDay1, FilterType, Person, Place} from "@/types";

export const selectedConferenceDayAtom = atomWithStorage('selectedConferenceDay', ConferenceDay1);

export const selectedFilterTypeAtom = atomWithStorage<FilterType>('selectedFilterType', 'persons');

export const selectedPersonFilterAtom = atomWithStorage<Person | undefined>('selectedPersonFilter', undefined);

export const selectedPlaceFilterAtom = atomWithStorage<Place | undefined>('selectedLocationFilter', undefined);

