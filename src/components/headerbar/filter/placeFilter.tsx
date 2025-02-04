import {usePlaces} from "@/data-source/usePlaces";
import {FormControl, FormControlLabel, Radio, RadioGroup} from "@mui/material";
import {Place} from '@/types';
import {useAtom} from "jotai";
import {selectedPlaceFilterAtom} from "@/state";

export const PlaceFilter = () => {

  const places = usePlaces();
  const [selectedPlace, setSelectedPlace] = useAtom(selectedPlaceFilterAtom)

  const handleChange = (event: unknown, value: Place) => {
    setSelectedPlace(value);
  }

  return <FormControl>
    <RadioGroup onChange={handleChange}
                value={selectedPlace ?? ''}
    >
      {places.map(location =>
          <FormControlLabel key={location} value={location} control={<Radio/>} label={location}/>)}
    </RadioGroup>
  </FormControl>

}
