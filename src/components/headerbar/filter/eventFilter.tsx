import React from "react";
import {AppBar, Box, Button, Dialog, Stack, Tab, Tabs, Toolbar, Typography} from "@mui/material";
import {FilterList} from "@mui/icons-material";
import {selectedFilterTypeAtom} from "@/state";
import {useAtom} from "jotai";
import {FilterType} from "@/types";
import {PlaceFilter} from "@/components/headerbar/filter/placeFilter";
import {PersonFilter} from "@/components/headerbar/filter/personFilter";

export const EventFilter = (): React.JSX.Element => {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleClose = () => setDialogOpen(false);

  const [filterType, setFilterType] = useAtom(selectedFilterTypeAtom)

  const handleChange = (_: unknown, value: FilterType) => setFilterType(value)

  const renderFilter = () => {
    switch (filterType) {
      case "place":
        return <PlaceFilter/>
      case "persons":
        return <PersonFilter/>
    }
  }
  return (
      <>
        <Button onClick={() => setDialogOpen(true)} color="inherit">
          <FilterList/>
        </Button>
        <Dialog
            fullScreen
            open={dialogOpen}
            onClose={handleClose}
        >
          <AppBar sx={{position: 'relative'}}>
            <Toolbar>
              <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                Filter Events
              </Typography>

              <Button autoFocus color="inherit" onClick={handleClose}>
                close
              </Button>
            </Toolbar>
          </AppBar>
          <Stack>
            <Box>
              <Tabs value={filterType} onChange={handleChange} centered>
                <Tab label="select places" value={"place" as FilterType}/>
                <Tab label="select persons" value={"persons" as FilterType}/>
                <Tab label="show all" value={"all" as FilterType}/>
              </Tabs>
            </Box>
            <Box sx={{paddingX: 2}}>
              {renderFilter()}
            </Box>
          </Stack>
        </Dialog>
      </>
  )
}
