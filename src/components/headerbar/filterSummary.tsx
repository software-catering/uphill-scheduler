import {useAtom} from "jotai";
import {selectedFilterTypeAtom, selectedPersonsFilterAtom, selectedPlacesFilterAtom} from "@/state";
import {useMemo} from "react";
import {Typography} from "@mui/material";


export const FilterSummary = () => {
  const [selectedFilterType] = useAtom(selectedFilterTypeAtom)
  const [selectedPersonsFilter] = useAtom(selectedPersonsFilterAtom)
  const [selectedPlacesFilter] = useAtom(selectedPlacesFilterAtom)

  const summary = useMemo(() => {
    switch (selectedFilterType) {
      case "persons":
        return selectedPersonsFilter?.join(', ')
      case 'place':
        return selectedPlacesFilter?.join(', ')
      case 'all':
        return 'All events'
    }
  }, [selectedFilterType, selectedPersonsFilter, selectedPlacesFilter])

  return <Typography variant="h5" sx={{flexGrow: 1, textAlign: 'center'}}>{summary}</Typography>
}
