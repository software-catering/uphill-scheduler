import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import {
  ConferenceDay,
  ConferenceDay1,
  ConferenceDay2,
  ConferenceDayLabels,
  SpeakerEvent,
} from "@/types";
import React from "react";
import { useAtom } from "jotai/index";
import { selectedConferenceDayAtom } from "@/state";

export const ConferenceDaySelector = () => {
  const [selectedConferenceDay, setSelectedConferenceDay] = useAtom(
    selectedConferenceDayAtom
  );

  return (
    <FormControl size={"small"}>
      <InputLabel>Day</InputLabel>
      <Select
        variant={"outlined"}
        value={selectedConferenceDay}
        label="Day"
        onChange={(event) =>
          setSelectedConferenceDay(event.target.value as ConferenceDay)
        }
      >
        <MenuItem value={SpeakerEvent}>
          {ConferenceDayLabels[SpeakerEvent]}
        </MenuItem>
        <MenuItem value={ConferenceDay1}>
          {ConferenceDayLabels[ConferenceDay1]}
        </MenuItem>
        <MenuItem value={ConferenceDay2}>
          {ConferenceDayLabels[ConferenceDay2]}
        </MenuItem>
      </Select>
    </FormControl>
  );
};
