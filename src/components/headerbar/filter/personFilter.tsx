import {
  Box,
  Button,
  Checkbox,
  Collapse,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useAtom } from "jotai";
import { personsAtom, selectedPersonsFilterAtom } from "@/state";
import { useAtomValue } from "jotai/index";
import { useState } from "react";
import { ExpandMore, ExpandLess, Search, Clear } from "@mui/icons-material";

export const PersonFilter = () => {
  const personsDict = useAtomValue(personsAtom);
  const [selectedPersons, setSelectedPersons] = useAtom(
    selectedPersonsFilterAtom
  );
  
  // State for collapsible sections
  const [expandedRoles, setExpandedRoles] = useState<Record<string, boolean>>({});
  
  // State for search
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedPersons([...selectedPersons, event.target.name]);
    } else {
      setSelectedPersons(
        selectedPersons.filter((p) => p !== event.target.name)
      );
    }
  };
  
  // Toggle expanded state of a role section
  const toggleRoleExpanded = (role: string) => {
    setExpandedRoles({
      ...expandedRoles,
      [role]: !isRoleExpanded(role)
    });
  };
  
  // Check if a role section is expanded
  const isRoleExpanded = (role: string) => {
    return !!expandedRoles[role];
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
  
  // Filter persons based on search term
  const filterPersonsBySearch = (persons: Array<{name: string}>) => {
    if (!searchTerm) return persons;
    return persons.filter(person => 
      person.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  
  // Count selected persons of a role
  const getSelectedCountForRole = (persons: Array<{name: string}>) => {
    return persons.filter(person => selectedPersons.includes(person.name)).length;
  };

  return (
    <FormControl sx={{ width: "100%" }}>
      {/* Search field */}
      <TextField
        placeholder="Search people..."
        variant="outlined"
        size="small"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ 
          mb: 2,
          '& .MuiOutlinedInput-root': {
            borderRadius: '20px',
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
          endAdornment: searchTerm ? (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                onClick={() => setSearchTerm("")}
                size="small"
              >
                <Clear fontSize="small" />
              </IconButton>
            </InputAdornment>
          ) : null
        }}
      />
      
      <Box sx={{ 
        maxHeight: 'calc(100vh - 260px)', 
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
          const filteredPersons = filterPersonsBySearch(persons);
          if (filteredPersons.length === 0 && searchTerm) return null;
          
          const allSelected = areAllRolePersonsSelected(persons);
          const someSelected = areSomeRolePersonsSelected(persons);
          const selectedCount = getSelectedCountForRole(persons);
          
          return (
            <Box key={role} sx={{ mb: 2, position: 'relative' }}>
              {index > 0 && <Divider sx={{ my: 1 }} />}
              <Stack 
                direction="row" 
                alignItems="center" 
                sx={{ 
                  position: 'sticky',
                  top: 0,
                  backgroundColor: (theme) => 
                    theme.palette.mode === 'light' 
                      ? 'rgba(255, 255, 255, 0.95)' 
                      : 'rgba(18, 18, 18, 0.95)',
                  backdropFilter: 'blur(8px)',
                  zIndex: 1,
                  py: 0.5,
                  px: 1,
                  borderRadius: '4px',
                }}
              >
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
                  sx={{ 
                    padding: '10px',
                    '& .MuiSvgIcon-root': { fontSize: 24 }
                  }}
                />
                
                <Stack 
                  direction="row" 
                  alignItems="center" 
                  justifyContent="space-between"
                  sx={{ 
                    flexGrow: 1,
                    cursor: 'pointer', 
                    py: 1,
                  }}
                  onClick={() => toggleRoleExpanded(role)}
                >
                  <Stack direction="column" spacing={0}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: "bold",
                        fontSize: '1rem',
                      }}
                    >
                      {role}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: '0.75rem' }}
                    >
                      {selectedCount} of {persons.length} selected
                    </Typography>
                  </Stack>
                  
                  <IconButton 
                    edge="end" 
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleRoleExpanded(role);
                    }}
                  >
                    {isRoleExpanded(role) ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                </Stack>
              </Stack>
              
              <Collapse in={isRoleExpanded(role) || !!searchTerm}>
                <Box sx={{ pl: 1, pr: 1, pt: 1 }}>
                  {filteredPersons.length > 0 ? (
                    <FormGroup>
                      {filteredPersons.map((person) => (
                        <FormControlLabel
                          key={person.name}
                          control={
                            <Checkbox
                              onChange={handleChange}
                              name={person.name}
                              checked={selectedPersons.includes(person.name)}
                              sx={{ 
                                padding: '8px',
                                '& .MuiSvgIcon-root': { fontSize: 22 }
                              }}
                            />
                          }
                          label={
                            <Typography sx={{ fontSize: '0.9rem' }}>
                              {person.name}
                            </Typography>
                          }
                          sx={{ 
                            margin: 0,
                            '.MuiFormControlLabel-label': {
                              userSelect: 'none'
                            }
                          }}
                        />
                      ))}
                    </FormGroup>
                  ) : (
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ py: 2, textAlign: 'center' }}
                    >
                      No matching people found
                    </Typography>
                  )}
                </Box>
              </Collapse>
              
            </Box>
          );
        })}
      </Box>
    </FormControl>
  );
};
