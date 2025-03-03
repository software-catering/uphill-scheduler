import { GoogleSheetIntegration } from "@/data-source/googleSheetIntegration";
import {
  ConferenceDay,
  ConferenceDay1,
  ConferenceDay2,
  DaySchedule,
  Person,
  SpeakerEvent,
} from "@/types";
import { useEffect, useState } from "react";
import { useAtom } from "jotai/index";
import { daySchedulesAtom, personsAtom, placesAtom } from "@/state";

const sortByRoleAndName = (a: Person, b: Person) => {
  if (a.role === b.role) {
    return a.name?.localeCompare(b.name);
  }
  return a.role?.localeCompare(b.role);
};

const getPersons = async () =>
  GoogleSheetIntegration.fetchPersons().then((persons) =>
    persons.sort(sortByRoleAndName)
  );
const getPlaces = GoogleSheetIntegration.fetchPlaces;

const getDaySchedules = async (): Promise<
  Record<ConferenceDay, DaySchedule>
> => {
  const day1 = await GoogleSheetIntegration.fetchConferenceDay(SpeakerEvent);
  const day2 = await GoogleSheetIntegration.fetchConferenceDay(ConferenceDay1);
  const day3 = await GoogleSheetIntegration.fetchConferenceDay(ConferenceDay2);
  return { "2025-04-23": day1, "2025-04-24": day2, "2025-04-25": day3 };
};

export const useLoadData = () => {
  const [, setPersons] = useAtom(personsAtom);
  const [, setPlaces] = useAtom(placesAtom);
  const [, setDaySchedules] = useAtom(daySchedulesAtom);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const persons = await getPersons();
      setPersons(persons);

      const places = await getPlaces();
      setPlaces(places);

      const daySchedules = await getDaySchedules();
      setDaySchedules(daySchedules);
      setLoaded(true);
    })();
  }, [setDaySchedules, setPersons, setPlaces]);
  return loaded;
};
