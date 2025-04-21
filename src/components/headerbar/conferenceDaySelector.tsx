import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { ConferenceDay, ConferenceDayLabels } from "@/types";
import React from "react";
import { useAtom } from "jotai/index";
import { selectedConferenceDayAtom } from "@/state";

export const ConferenceDaySelector = () => {
  const [selectedConferenceDay, setSelectedConferenceDay] = useAtom(
    selectedConferenceDayAtom
  );

  return (
    <FormControl size={"small"} sx={{ minWidth: 120 }}>
      <InputLabel sx={{ color: "rgba(255, 255, 255, 0.8)" }}>Day</InputLabel>
      <Select
        variant={"outlined"}
        value={selectedConferenceDay}
        label="Day"
        onChange={(event) =>
          setSelectedConferenceDay(event.target.value as ConferenceDay)
        }
        sx={{
          color: "white",
          ".MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255, 255, 255, 0.3)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255, 255, 255, 0.6)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--accent-teal)",
          },
          ".MuiSvgIcon-root": { color: "rgba(255, 255, 255, 0.7)" },
        }}
      >
        {Object.entries(ConferenceDayLabels).map(([day, label]) => (
          <MenuItem
            key={day}
            value={day}
            sx={{ display: "flex", alignItems: "center" }}
          >
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
