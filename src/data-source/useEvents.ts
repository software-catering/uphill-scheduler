import { useMemo } from "react";
import { ConferenceDay1, Event, ScheduleEntry } from "@/types";
import { useAtomValue } from "jotai";
import {
  daySchedulesAtom,
  selectedConferenceDayAtom,
  selectedFilterTypeAtom,
  selectedPersonsFilterAtom,
  selectedPlacesFilterAtom,
  selectedViewTypeAtom,
} from "@/state";
import { EventMapper } from "@/data-source/EventMapper";

export const useEvents = ():
  | {
      events: Event[];
      firstStart: Date;
      lastEnd: Date;
      columnsCount: number;
      columnNameMapper: (date: Date) => string;
    }
  | undefined => {
  const conferenceDay =
    useAtomValue(selectedConferenceDayAtom) ?? ConferenceDay1;
  const selectedFilterType = useAtomValue(selectedFilterTypeAtom);
  const selectedViewType = useAtomValue(selectedViewTypeAtom);
  const selectedPersonFilter = useAtomValue(selectedPersonsFilterAtom);
  const selectedPlaceFilter = useAtomValue(selectedPlacesFilterAtom);
  const daySchedules = useAtomValue(daySchedulesAtom);

  const hasMandatoryFields = (entry: ScheduleEntry): boolean =>
    !!(entry.title && entry.start && entry.end);

  const filterFn = useMemo(() => {
    switch (selectedFilterType) {
      case "persons":
        return (entry: ScheduleEntry) =>
          entry.persons.some((person) => selectedPersonFilter.includes(person));
      case "place":
        return (entry: ScheduleEntry) =>
          selectedPlaceFilter.includes(entry.place);
      case "all":
      default:
        return () => true;
    }
  }, [selectedFilterType, selectedPersonFilter, selectedPlaceFilter]);

  return useMemo(() => {
    if (
      daySchedules &&
      selectedPlaceFilter &&
      selectedPersonFilter &&
      conferenceDay
    ) {
      const daySchedule = daySchedules[conferenceDay];
      if(!daySchedule) {
        console.warn(`No schedule found for conference day: ${conferenceDay}. Available days: ${Object.keys(daySchedules).join(", ")}`);
      }else {
        const eventMapper = new EventMapper(
            selectedFilterType,
            selectedViewType,
            selectedPersonFilter,
            selectedPlaceFilter
        );
        const events = daySchedule
        .filter(hasMandatoryFields)
        .filter(filterFn)
        .flatMap((entry) => eventMapper.toEvents(entry));

        return {
          events,
          firstStart: eventMapper.firstStartDate,
          lastEnd: eventMapper.lastEndDate,
          columnNameMapper: eventMapper.columnNameMapper,
          columnsCount: eventMapper.columnsCount,
        };
      }
    } else {
      return undefined;
    }
  }, [
    daySchedules,
    conferenceDay,
    filterFn,
    selectedFilterType,
    selectedPersonFilter,
    selectedPlaceFilter,
    selectedViewType,
  ]);
};
