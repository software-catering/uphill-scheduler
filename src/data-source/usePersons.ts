import {useEffect, useState} from "react";
import {fetchPersons} from "@/data-source/googleSheetIntegration";
import {Person} from "@/types";

export const usePersons = () => {

  const [persons, setPersons] = useState<Person[]>([]);

  useEffect(() => {
    fetchPersons().then(setPersons)
  }, []);

  return persons
}
