import {useEffect, useState} from "react";
import {fetchPlaces} from "@/data-source/googleSheetIntegration";
import {Place} from "@/types";

export const usePlaces = () => {

  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    fetchPlaces().then(setPlaces);
  }, [])

  return places;
}
