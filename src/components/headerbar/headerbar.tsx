import React from "react";
import {AppBar, Toolbar} from "@mui/material";
import {EventFilter} from "@/components/headerbar/filter/eventFilter";
import {FilterSummary} from "@/components/headerbar/filterSummary";
import {ConferenceDaySelector} from "@/components/headerbar/conferenceDaySelector";
import {ViewSelector} from "@/components/headerbar/viewsSelector";

export const HeaderBar = (): React.JSX.Element => {
  return <AppBar 
    position="static" 
    sx={{
      background: 'var(--primary)',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    }}
  >
    <Toolbar sx={{padding: 0.5, columnGap: 0.5}}>
      <ConferenceDaySelector/>
      <ViewSelector/>
      <FilterSummary/>
      <EventFilter/>
    </Toolbar>
  </AppBar>
}
