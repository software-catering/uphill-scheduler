import {
  Box,
  Button,
  Checkbox,
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
import { placesAtom, selectedPlacesFilterAtom } from "@/state";
import { useAtomValue } from "jotai/index";
import { useState } from "react";
import { Search, Clear } from "@mui/icons-material";

export const PlaceFilter = () => {
  // Flex container to use full height
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100%',
  };
  const places = useAtomValue(placesAtom);
  const [selectedPlaces, setSelectedPlaces] = useAtom(selectedPlacesFilterAtom);
  
  // State for search
  const [searchTerm, setSearchTerm] = useState("");

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
  
  // Select all filtered places
  const selectAllFilteredPlaces = () => {
    const filteredPlaces = filterPlacesBySearch();
    const currentlySelected = new Set(selectedPlaces);
    
    // Get places not already in the selection
    const placesToAdd = filteredPlaces.filter(place => !currentlySelected.has(place));
    
    if (placesToAdd.length > 0) {
      setSelectedPlaces([...selectedPlaces, ...placesToAdd]);
    }
  };
  
  // Unselect all places
  const unselectAllPlaces = () => {
    setSelectedPlaces([]);
  };
  
  // Unselect all filtered places
  const unselectAllFilteredPlaces = () => {
    const filteredPlaces = new Set(filterPlacesBySearch());
    setSelectedPlaces(selectedPlaces.filter(place => !filteredPlaces.has(place)));
  };
  
  // Filter places based on search term
  const filterPlacesBySearch = () => {
    if (!searchTerm) return places;
    return places.filter(place => 
      place.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  
  const filteredPlaces = filterPlacesBySearch();
  const allSelected = areAllPlacesSelected();
  const someSelected = areSomePlacesSelected();
  const selectedCount = selectedPlaces.length;

  return (
    <FormControl sx={{ ...containerStyle, width: "100%" }}>
      {/* Search field */}
      <TextField
        placeholder="Search places..."
        variant="outlined"
        size="small"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ 
          mb: 2,
          flexShrink: 0,
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
        height: '100%', 
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
            px: 1,
            borderRadius: '4px',
          }}
        >
          <Stack direction="row" alignItems="center">
            <Checkbox
              checked={allSelected}
              indeterminate={someSelected}
              onChange={(e) => {
                if (e.target.checked) {
                  if (searchTerm) {
                    selectAllFilteredPlaces();
                  } else {
                    selectAllPlaces();
                  }
                } else {
                  if (searchTerm) {
                    unselectAllFilteredPlaces();
                  } else {
                    unselectAllPlaces();
                  }
                }
              }}
              sx={{ 
                padding: '10px',
                '& .MuiSvgIcon-root': { fontSize: 24 }
              }}
            />
            <Stack direction="column">
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  fontSize: '1rem',
                }}
              >
                Places
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: '0.75rem' }}
              >
                {selectedCount} of {places.length} selected
              </Typography>
            </Stack>
          </Stack>
          <Button 
            size="small"
            onClick={() => {
              if (searchTerm) {
                if (filteredPlaces.every(place => selectedPlaces.includes(place))) {
                  unselectAllFilteredPlaces();
                } else {
                  selectAllFilteredPlaces();
                }
              } else {
                if (allSelected) {
                  unselectAllPlaces();
                } else {
                  selectAllPlaces();
                }
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
            {searchTerm 
              ? (filteredPlaces.every(place => selectedPlaces.includes(place)) ? 'Unselect Filtered' : 'Select Filtered')
              : (allSelected ? 'Unselect All' : 'Select All')
            }
          </Button>
        </Stack>
        
        {filteredPlaces.length > 0 ? (
          <FormGroup sx={{ px: 1 }}>
            {filteredPlaces.map((place) => (
              <FormControlLabel
                key={place}
                control={
                  <Checkbox
                    onChange={handleChange}
                    name={place}
                    checked={selectedPlaces.includes(place)}
                    sx={{ 
                      padding: '8px',
                      '& .MuiSvgIcon-root': { fontSize: 22 }
                    }}
                  />
                }
                label={
                  <Typography sx={{ fontSize: '0.9rem' }}>
                    {place}
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
            No matching places found
          </Typography>
        )}
      </Box>
    </FormControl>
  );
};
