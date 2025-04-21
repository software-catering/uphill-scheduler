import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {Views, ViewType} from "@/types";
import React from "react";
import {useAtom} from "jotai/index";
import {selectedViewTypeAtom} from "@/state";

export const ViewSelector = () => {
  const [selectedView, setSelectedView] = useAtom(selectedViewTypeAtom)

  return (
    <FormControl size={"small"} sx={{ minWidth: 140 }}>
      <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>View</InputLabel>
      <Select
        variant={"outlined"}
        value={selectedView}
        label="View"
        onChange={(event) => setSelectedView(event.target.value as ViewType)}
        sx={{
          color: 'white',
          '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.3)' },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.6)' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--accent-purple)' },
          '.MuiSvgIcon-root': { color: 'rgba(255, 255, 255, 0.7)' }
        }}
      >
        {Object.keys(Views).map((view) => (
          <MenuItem 
            key={view} 
            value={view}
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              padding: '8px 16px'
            }}
          >
            {view}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
