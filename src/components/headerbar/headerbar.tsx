import React from "react";
import { AppBar, Box, Toolbar } from "@mui/material";
import { EventFilter } from "@/components/headerbar/filter/eventFilter";
import { ConferenceDaySelector } from "@/components/headerbar/conferenceDaySelector";
import { ViewSelector } from "@/components/headerbar/viewsSelector";

export const HeaderBar = (): React.JSX.Element => {
  return (
    <AppBar
      position="static"
      sx={{
        background: "var(--primary)",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar
        sx={{ padding: { xs: 0.3, sm: 0.5 }, columnGap: { xs: 0.3, sm: 0.5 } }}
      >
        <ConferenceDaySelector />
        <ViewSelector />
        <Box sx={{ flexGrow: 1 }} />
        <EventFilter />
      </Toolbar>
    </AppBar>
  );
};
