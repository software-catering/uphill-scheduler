import {usePlaces} from "@/data-source/usePlaces";
import {Checkbox, FormControl, FormControlLabel, FormGroup} from "@mui/material";
import {useAtom} from "jotai";
import {selectedPlacesFilterAtom} from "@/state";

export const PlaceFilter = () => {

  const places = usePlaces();
  const [selectedPlaces, setSelectedPlaces] = useAtom(selectedPlacesFilterAtom)


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedPlaces([...selectedPlaces, event.target.name]);
    } else {
      setSelectedPlaces(selectedPlaces.filter(p => p !== event.target.name));
    }
  }

  return <FormControl>
    <FormGroup>
      {places.map(place =>
          <FormControlLabel key={place} control={<Checkbox onChange={handleChange} name={place}
                                                           checked={selectedPlaces.includes(place)}/>}
                            label={place}/>
      )}
    </FormGroup>
  </FormControl>

}
