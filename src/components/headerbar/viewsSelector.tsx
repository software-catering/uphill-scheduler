import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {Views, ViewType} from "@/types";
import React from "react";
import {useAtom} from "jotai/index";
import {selectedViewTypeAtom} from "@/state";

export const ViewSelector = () => {

  const [selectedView, setSelectedView] = useAtom(selectedViewTypeAtom)


  return <FormControl size={"small"}>
    <InputLabel>View</InputLabel>
    <Select
        variant={"outlined"}
        value={selectedView}
        label="View"
        onChange={(event) => setSelectedView(event.target.value as ViewType)}
    >
      {Object.keys(Views).map((view) =>
          <MenuItem key={view} value={view}>{view}</MenuItem>)}
    </Select>
  </FormControl>
}
