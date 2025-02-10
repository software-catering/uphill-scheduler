import {useEffect, useMemo, useState} from "react";
import {ConferenceDay1, DaySchedule, Event, FilterType, ScheduleEntry} from "@/types";
import {useAtom, useAtomValue} from "jotai/index";
import {
  selectedConferenceDayAtom,
  selectedFilterTypeAtom,
  selectedPersonsFilterAtom,
  selectedPlacesFilterAtom
} from "@/state";
import {fetchConferenceDay} from "@/data-source/googleSheetIntegration";
import {getColor} from "@/util/colors.util";
import {parseTime} from "@/util/date.util";

const toEvent = (selectedFilterType: FilterType) => (scheduleEntry: ScheduleEntry) => ({
  title: `${scheduleEntry.title} - ${scheduleEntry.place} - ${scheduleEntry.persons.join(', ')}`,
  start: parseTime(scheduleEntry.start),
  end: parseTime(scheduleEntry.end),
  color: getColor({filterType: selectedFilterType, entry: scheduleEntry}),
});

export const useEvents = (): { events: Event[], firstStart: Date, lastEnd: Date } | undefined => {

  const [daySchedule, setDaySchedule] = useState<DaySchedule | undefined>(undefined)
  const conferenceDay = useAtomValue(selectedConferenceDayAtom) ?? ConferenceDay1;
  const [selectedFilterType] = useAtom(selectedFilterTypeAtom);
  const [selectedPersonFilter] = useAtom(selectedPersonsFilterAtom);
  const [selectedPlaceFilter] = useAtom(selectedPlacesFilterAtom);

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
        if (daySchedule) {

          const events = daySchedule.filter(filterFn).map(toEvent(selectedFilterType))

          const {
            firstStart,
            lastEnd
          } = daySchedule.map(toEvent(selectedFilterType)).reduce((acc, event) => {
            if (event.start.getTime() < acc.firstStart) {
              acc.firstStart = event.start.getTime()
            }
            if (event.end.getTime() > acc.lastEnd) {
              acc.lastEnd = event.end.getTime()
            }
            return acc
          }, {firstStart: Number.MAX_SAFE_INTEGER, lastEnd: 0});


          return {
            events,
            firstStart: new Date(firstStart),
            lastEnd: new Date(lastEnd)
          }
        } else {
          return undefined
        }

      }
      , [daySchedule, filterFn, selectedFilterType]);
}
