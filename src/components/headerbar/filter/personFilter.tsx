import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { useAtom } from "jotai";
import { personsAtom, selectedPersonsFilterAtom } from "@/state";
import { useAtomValue } from "jotai/index";

export const PersonFilter = () => {
  const personsDict = useAtomValue(personsAtom);
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
    <FormControl sx={{ width: "100%" }}>
      {Object.entries(personsDict).map(([role, persons], index) => (
        <Box key={role} sx={{ mb: 2 }}>
          {index > 0 && <Divider sx={{ my: 1 }} />}
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: "bold",
              mt: 1,
              mb: 1,
            }}
          >
            {role}
          </Typography>
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
                label={person.name}
              />
            ))}
          </FormGroup>
        </Box>
      ))}
    </FormControl>
  );
};
