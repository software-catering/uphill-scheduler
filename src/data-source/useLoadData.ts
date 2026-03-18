import {GoogleSheetIntegration} from "@/data-source/googleSheetIntegration";
import {
  ConferenceDay,
  DAY_1,
  DAY_2,
  DAY_3,
  DaySchedule,
  Person,
  PersonsDict,
} from "@/types";
import {useEffect, useState} from "react";
import {useAtom} from "jotai";
import {daySchedulesAtom, personsAtom, placesAtom} from "@/state";

const getDaySchedules = async (): Promise<
  Record<ConferenceDay, DaySchedule>
> => {
  const [day1, day2, day3] = await Promise.all([
    GoogleSheetIntegration.fetchConferenceDay(DAY_1),
    GoogleSheetIntegration.fetchConferenceDay(DAY_2),
    GoogleSheetIntegration.fetchConferenceDay(DAY_3),
  ]);
  return {[DAY_1]: day1, [DAY_2]: day2, [DAY_3]: day3};
};

const extractPersons = (schedules: Record<ConferenceDay, DaySchedule>): Person[] => {
  const nameSet = new Set<string>();
  Object.values(schedules).forEach(daySchedule =>
    daySchedule.forEach(entry =>
      entry.persons.forEach(name => {
        if (name) nameSet.add(name);
      })
    )
  );
  return Array.from(nameSet)
    .sort((a, b) => a.localeCompare(b))
    .map(name => ({name, role: "Team"}));
};

const extractPlaces = (schedules: Record<ConferenceDay, DaySchedule>): string[] => {
  const placeSet = new Set<string>();
  Object.values(schedules).forEach(daySchedule =>
    daySchedule.forEach(entry => {
      if (entry.place) placeSet.add(entry.place);
    })
  );
  return Array.from(placeSet).sort();
};

export const useLoadData = () => {
  const [, setPersons] = useAtom(personsAtom);
  const [, setPlaces] = useAtom(placesAtom);
  const [, setDaySchedules] = useAtom(daySchedulesAtom);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const daySchedules = await getDaySchedules();

      const persons = extractPersons(daySchedules);
      const personsDict = persons.reduce(toPersonsDict, {});
      setPersons(personsDict);

      const places = extractPlaces(daySchedules);
      setPlaces(places);

      setDaySchedules(daySchedules);
      setLoaded(true);
    })();
  }, [setDaySchedules, setPersons, setPlaces]);
  return loaded;
};

const toPersonsDict = (acc: PersonsDict, next: Person) => {
  if (!acc[next.role]) {
    acc[next.role] = [];
  }

  acc[next.role].push(next);
  return acc;
};
