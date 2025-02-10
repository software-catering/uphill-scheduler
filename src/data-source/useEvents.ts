import {useEffect, useMemo, useState} from "react";
import {ConferenceDay1, DaySchedule, Event, ScheduleEntry} from "@/types";
import {useAtom, useAtomValue} from "jotai/index";
import {
  selectedConferenceDayAtom,
  selectedFilterTypeAtom,
  selectedPersonsFilterAtom,
  selectedPlacesFilterAtom,
  selectedViewTypeAtom
} from "@/state";
import {fetchConferenceDay} from "@/data-source/googleSheetIntegration";
import {EventMapper} from "@/data-source/EventMapper";


export const useEvents = (): {
  events: Event[],
  firstStart: Date,
  lastEnd: Date,
  columnsCount: number,
  columnNameMapper: (date: Date) => string
} | undefined => {

  const [daySchedule, setDaySchedule] = useState<DaySchedule | undefined>(undefined)
  const conferenceDay = useAtomValue(selectedConferenceDayAtom) ?? ConferenceDay1;
  const [selectedFilterType] = useAtom(selectedFilterTypeAtom);
  const [selectedViewType] = useAtom(selectedViewTypeAtom);
  const [selectedPersonFilter] = useAtom(selectedPersonsFilterAtom);
  const [selectedPlaceFilter] = useAtom(selectedPlacesFilterAtom);

  const hasMandatoryFields = (entry: ScheduleEntry): boolean => !!(entry.title && entry.start && entry.end)

  const filterFn = useMemo(() => {
    switch (selectedFilterType) {
      case 'persons':
        return (entry: ScheduleEntry) => entry.persons.some(person => selectedPersonFilter.includes(person))
      case 'place':
        return (entry: ScheduleEntry) => selectedPlaceFilter.includes(entry.place)
      case 'all':
      default:
        return () => true;
    }
  }, [selectedFilterType, selectedPersonFilter, selectedPlaceFilter])

  useEffect(() => {
    fetchConferenceDay(conferenceDay).then(setDaySchedule)
  }, [conferenceDay])

  return useMemo(() => {

        if (daySchedule && selectedPlaceFilter && selectedPersonFilter) {
          const eventMapper = new EventMapper(selectedFilterType, selectedViewType);
          const events = daySchedule.filter(hasMandatoryFields).filter(filterFn).flatMap(entry => eventMapper.toEvents(entry))

          return {
            events,
            firstStart: eventMapper.firstStartDate,
            lastEnd: eventMapper.lastEndDate,
            columnNameMapper: eventMapper.columnNameMapper,
            columnsCount: eventMapper.columnsCount
          }
        } else {
          return undefined
        }

      }
      , [daySchedule, filterFn, selectedFilterType, selectedPersonFilter, selectedPlaceFilter, selectedViewType]);
}
