import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import {ConferenceDay1, ConferenceDay2, ConferenceDayLabels} from "@/types";
import React from "react";
import {useAtom} from "jotai/index";
import {selectedConferenceDayAtom} from "@/state";

export const ConferenceDaySelector = () => {

  const [selectedConferenceDay, setSelectedConferenceDay] = useAtom(selectedConferenceDayAtom)

  return <ToggleButtonGroup
      value={selectedConferenceDay}
      exclusive
      onChange={(event, value) => setSelectedConferenceDay(value)}
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
}
