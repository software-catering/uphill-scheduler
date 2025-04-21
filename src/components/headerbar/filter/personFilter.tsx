import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Stack,
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
  
  // Select all persons of a specific role
  const selectAllForRole = (role: string, persons: Array<{name: string}>) => {
    const personNames = persons.map(person => person.name);
    const currentlySelected = new Set(selectedPersons);
    
    // Get names not already in the selection
    const namesToAdd = personNames.filter(name => !currentlySelected.has(name));
    
    if (namesToAdd.length > 0) {
      setSelectedPersons([...selectedPersons, ...namesToAdd]);
    }
  };
  
  // Unselect all persons of a specific role
  const unselectAllForRole = (role: string, persons: Array<{name: string}>) => {
    const personNamesToRemove = new Set(persons.map(person => person.name));
    
    setSelectedPersons(
      selectedPersons.filter(name => !personNamesToRemove.has(name))
    );
  };
  
  // Check if all persons of a role are selected
  const areAllRolePersonsSelected = (persons: Array<{name: string}>) => {
    return persons.every(person => selectedPersons.includes(person.name));
  };
  
  // Check if some (but not all) persons of a role are selected
  const areSomeRolePersonsSelected = (persons: Array<{name: string}>) => {
    return persons.some(person => selectedPersons.includes(person.name)) 
      && !areAllRolePersonsSelected(persons);
  };

  return (
    <FormControl sx={{ width: "100%" }}>
      <Box sx={{ 
        maxHeight: 'calc(100vh - 200px)', 
        overflow: 'auto',
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
        },
      }}>
        {Object.entries(personsDict).map(([role, persons], index) => {
          const allSelected = areAllRolePersonsSelected(persons);
          const someSelected = areSomeRolePersonsSelected(persons);
          
          return (
            <Box key={role} sx={{ mb: 2, position: 'relative' }}>
              {index > 0 && <Divider sx={{ my: 1 }} />}
              <Stack 
                direction="row" 
                alignItems="center" 
                justifyContent="space-between"
                sx={{ 
                  mb: 1,
                  position: 'sticky',
                  top: 0,
                  backgroundColor: 'background.paper',
                  backdropFilter: 'blur(8px)',
                  zIndex: 1,
                  py: 0.5,
                  backgroundColor: (theme) => 
                    theme.palette.mode === 'light' 
                      ? 'rgba(255, 255, 255, 0.95)' 
                      : 'rgba(18, 18, 18, 0.95)',
                }}
              >
                <Stack direction="row" alignItems="center">
                  <Checkbox
                    checked={allSelected}
                    indeterminate={someSelected}
                    onChange={(e) => {
                      if (e.target.checked) {
                        selectAllForRole(role, persons);
                      } else {
                        unselectAllForRole(role, persons);
                      }
                    }}
                    sx={{ ml: -1 }}
                  />
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    {role}
                  </Typography>
                </Stack>
                <Button 
                  size="small"
                  onClick={() => {
                    if (allSelected) {
                      unselectAllForRole(role, persons);
                    } else {
                      selectAllForRole(role, persons);
                    }
                  }}
                  sx={{ 
                    textTransform: 'none',
                    color: 'var(--accent-purple)',
                    '&:hover': {
                      backgroundColor: 'rgba(105, 58, 168, 0.08)'
                    }
                  }}
                >
                  {allSelected ? 'Unselect All' : 'Select All'}
                </Button>
              </Stack>
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
          );
        })}
      </Box>
    </FormControl>
  );
};
