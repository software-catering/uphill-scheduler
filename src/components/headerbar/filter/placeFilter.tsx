import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from "@mui/material";
import { useAtom } from "jotai";
import { placesAtom, selectedPlacesFilterAtom } from "@/state";
import { useAtomValue } from "jotai/index";

export const PlaceFilter = () => {
  const places = useAtomValue(placesAtom);
  const [selectedPlaces, setSelectedPlaces] = useAtom(selectedPlacesFilterAtom);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedPlaces([...selectedPlaces, event.target.name]);
    } else {
      setSelectedPlaces(selectedPlaces.filter((p) => p !== event.target.name));
    }
  };
  
  // Check if all places are selected
  const areAllPlacesSelected = () => {
    return places.length > 0 && places.every(place => selectedPlaces.includes(place));
  };
  
  // Check if some (but not all) places are selected
  const areSomePlacesSelected = () => {
    return places.some(place => selectedPlaces.includes(place)) && !areAllPlacesSelected();
  };
  
  // Select all places
  const selectAllPlaces = () => {
    setSelectedPlaces([...places]);
  };
  
  // Unselect all places
  const unselectAllPlaces = () => {
    setSelectedPlaces([]);
  };
  
  const allSelected = areAllPlacesSelected();
  const someSelected = areSomePlacesSelected();

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
        <Stack 
          direction="row" 
          alignItems="center" 
          justifyContent="space-between"
          sx={{ 
            mb: 1,
            position: 'sticky',
            top: 0,
            backgroundColor: (theme) => 
              theme.palette.mode === 'light' 
                ? 'rgba(255, 255, 255, 0.95)' 
                : 'rgba(18, 18, 18, 0.95)',
            backdropFilter: 'blur(8px)',
            zIndex: 1,
            py: 0.5,
          }}
        >
          <Stack direction="row" alignItems="center">
            <Checkbox
              checked={allSelected}
              indeterminate={someSelected}
              onChange={(e) => {
                if (e.target.checked) {
                  selectAllPlaces();
                } else {
                  unselectAllPlaces();
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
              Places
            </Typography>
          </Stack>
          <Button 
            size="small"
            onClick={() => {
              if (allSelected) {
                unselectAllPlaces();
              } else {
                selectAllPlaces();
              }
            }}
            sx={{ 
              textTransform: 'none',
              color: 'var(--accent-teal)',
              '&:hover': {
                backgroundColor: 'rgba(0, 165, 173, 0.08)'
              }
            }}
          >
            {allSelected ? 'Unselect All' : 'Select All'}
          </Button>
        </Stack>
        <FormGroup>
          {places.map((place) => (
            <FormControlLabel
              key={place}
              control={
                <Checkbox
                  onChange={handleChange}
                  name={place}
                  checked={selectedPlaces.includes(place)}
                />
              }
              label={place}
            />
          ))}
        </FormGroup>
      </Box>
    </FormControl>
  );
};
