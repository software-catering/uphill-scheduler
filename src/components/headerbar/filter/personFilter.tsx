import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { useAtom } from "jotai";
import { personsAtom, selectedPersonsFilterAtom } from "@/state";
import { useAtomValue } from "jotai/index";

export const PersonFilter = () => {
  const persons = useAtomValue(personsAtom);
  const [selectedPersons, setSelectedPersons] = useAtom(
    selectedPersonsFilterAtom
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedPersons([...selectedPersons, event.target.name]);
    } else {
      setSelectedPersons(
        selectedPersons.filter((p) => p !== event.target.name)
      );
    }
  };

  return (
    <FormControl>
      <FormGroup>
        {persons.map((person) => (
          <FormControlLabel
            key={person.name}
            control={
              <Checkbox
                onChange={handleChange}
                name={person.name}
                checked={selectedPersons.includes(person.name)}
              />
            }
            label={`[${person.role}] ${person.name}`}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};
