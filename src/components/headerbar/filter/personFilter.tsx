import {FormControl, FormControlLabel, Radio, RadioGroup} from "@mui/material";
import {useAtom} from "jotai";
import {selectedPersonFilterAtom} from "@/state";
import {usePersons} from "@/data-source/usePersons";
import {Person} from "@/types";

export const PersonFilter = () => {

  const persons = usePersons();
  const [selectedPerson, setSelectedPerson] = useAtom(selectedPersonFilterAtom)

  const handleChange = (event: unknown, value: Person) => {
    setSelectedPerson(value);
  }

  return <FormControl>
    <RadioGroup onChange={handleChange}
                value={selectedPerson ?? ''}
    >
      {persons.map(person =>
          <FormControlLabel key={person} value={person} control={<Radio/>} label={person}/>)}
    </RadioGroup>
  </FormControl>

}
