import React from "react";
import {AppBar, ToggleButton, ToggleButtonGroup, Toolbar} from "@mui/material";
import {useAtom} from "jotai";
import {selectedConferenceDayAtom} from "@/state";
import {ConferenceDay1, ConferenceDay2, ConferenceDayLabels} from "@/types";
import {EventFilter} from "@/components/headerbar/filter/eventFilter";
import {FilterSummary} from "@/components/headerbar/filterSummary";

export const HeaderBar = (): React.JSX.Element => {

  const [selectedConferenceDay, setSelectedConferenceDay] = useAtom(selectedConferenceDayAtom)

  return <AppBar position="static">
    <Toolbar sx={{padding: 1}}>
      <ToggleButtonGroup
          value={selectedConferenceDay}
          exclusive
          onChange={(event, value) => setSelectedConferenceDay(value)}
          aria-label="text alignment"
          sx={{marginRight: 2}}
          size="small"
      >
        <ToggleButton value={ConferenceDay1} aria-label="left aligned">
          <h2>{ConferenceDayLabels[ConferenceDay1]}</h2>
        </ToggleButton>
        <ToggleButton value={ConferenceDay2} aria-label="centered">
          <h2>{ConferenceDayLabels[ConferenceDay2]}</h2>
        </ToggleButton>
      </ToggleButtonGroup>
      <FilterSummary/>

      <EventFilter/>
    </Toolbar>
  </AppBar>
}
