import {useAtom} from "jotai";
import {selectedFilterTypeAtom, selectedPersonFilterAtom, selectedPlaceFilterAtom} from "@/state";
import {useMemo} from "react";
import {Typography} from "@mui/material";


export const FilterSummary = () => {
  const [selectedFilterType] = useAtom(selectedFilterTypeAtom)
  const [selectedPersonsFilter] = useAtom(selectedPersonFilterAtom)
  const [selectedPlaceFilter] = useAtom(selectedPlaceFilterAtom)

  const summary = useMemo(() => {
    switch (selectedFilterType) {
      case "persons":
        return selectedPersonsFilter
      case 'place':
        return selectedPlaceFilter
    }
  }, [selectedFilterType, selectedPersonsFilter, selectedPlaceFilter])

  return <Typography variant="h5" sx={{flexGrow: 1, textAlign: 'center'}}>{summary}</Typography>
}
