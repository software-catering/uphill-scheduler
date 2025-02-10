import {useEffect, useState} from "react";
import {fetchPersons} from "@/data-source/googleSheetIntegration";
import {Person} from "@/types";

const sortByRoleAndName = (a: Person, b: Person) => {
  if (a.role === b.role) {
    return a.name?.localeCompare(b.name);
  }
  return a.role?.localeCompare(b.role);
}

export const usePersons = () => {

  const [persons, setPersons] = useState<Person[]>([]);

  useEffect(() => {
    fetchPersons().then(persons => setPersons(persons.sort(sortByRoleAndName)));
  }, []);

  return persons
}
