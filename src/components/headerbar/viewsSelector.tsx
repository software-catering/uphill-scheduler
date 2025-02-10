import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import {Views} from "@/types";
import React from "react";
import {useAtom} from "jotai/index";
import {selectedViewTypeAtom} from "@/state";

export const ViewSelector = () => {

  const [selectedView, setSelectedView] = useAtom(selectedViewTypeAtom)

  return <ToggleButtonGroup
      value={selectedView}
      exclusive
      onChange={(event, value) => setSelectedView(value)}
      sx={{marginRight: 2}}
      size="small"
  >
    {Object.keys(Views).map((view) =>
        <ToggleButton key={view} value={view}>
          <h2>{view}</h2>
        </ToggleButton>)}
  </ToggleButtonGroup>
}
