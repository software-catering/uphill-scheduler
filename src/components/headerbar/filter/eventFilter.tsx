import React from "react";
import {
  AppBar, 
  Box, 
  Button, 
  Dialog, 
  Fab, 
  Stack, 
  Tab, 
  Tabs, 
  Toolbar, 
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import {FilterList, Check} from "@mui/icons-material";
import {selectedFilterTypeAtom} from "@/state";
import {useAtom} from "jotai";
import {FilterType} from "@/types";
import {PlaceFilter} from "@/components/headerbar/filter/placeFilter";
import {PersonFilter} from "@/components/headerbar/filter/personFilter";

export const EventFilter = (): React.JSX.Element => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = () => setDialogOpen(false);

  const [filterType, setFilterType] = useAtom(selectedFilterTypeAtom);

  const handleChange = (_: unknown, value: FilterType) => setFilterType(value);

  const renderFilter = () => {
    switch (filterType) {
      case "place":
        return <PlaceFilter/>
      case "persons":
        return <PersonFilter/>
      default:
        return (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '200px',
            flexDirection: 'column',
            gap: 2,
            color: 'text.secondary'
          }}>
            <Typography variant="body1">Showing all events</Typography>
            <Typography variant="body2">
              No filters applied
            </Typography>
          </Box>
        );
    }
  };

  return (
    <>
      <Button 
        onClick={() => setDialogOpen(true)} 
        color="inherit"
        sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
      >
        <FilterList/>
      </Button>
      <Dialog
        fullScreen
        open={dialogOpen}
        onClose={handleClose}
        sx={{
          '& .MuiDialog-paper': {
            bgcolor: theme => theme.palette.mode === 'dark' ? '#121212' : '#f5f5f5',
          }
        }}
      >
        <AppBar 
          position="sticky"
          sx={{
            background: 'var(--primary)',
            boxShadow: '0 1px 4px rgba(0, 0, 0, 0.15)'
          }}
        >
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                fontWeight: 500, 
                fontSize: { xs: '1.1rem', sm: '1.25rem' } 
              }}
            >
              Filter Events
            </Typography>

            <Button 
              variant="contained"
              color="inherit" 
              onClick={handleClose}
              sx={{ 
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                borderRadius: '20px',
                px: 3,
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                fontWeight: 500,
                textTransform: 'none',
              }}
            >
              Apply
            </Button>
          </Toolbar>
        </AppBar>
        
        <Stack sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={filterType} 
              onChange={handleChange} 
              variant="fullWidth"
              centered
              sx={{
                '& .MuiTabs-indicator': {
                  backgroundColor: 'var(--accent-pink)'
                },
                '& .Mui-selected': {
                  color: 'var(--accent-pink) !important'
                },
                '& .MuiTab-root': {
                  minHeight: '48px',
                  fontSize: { xs: '0.85rem', sm: '0.9rem' },
                  textTransform: 'none',
                  fontWeight: 500,
                }
              }}
            >
              <Tab label="Places" value={"place" as FilterType}/>
              <Tab label="People" value={"persons" as FilterType}/>
              <Tab label="All Events" value={"all" as FilterType}/>
            </Tabs>
          </Box>
          
          <Box sx={{
            paddingX: 2,
            paddingBottom: 0,
            flex: 1,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {renderFilter()}
          </Box>
        </Stack>
        
        {isMobile && filterType !== 'all' && (
          <Fab
            color="primary"
            sx={{
              position: 'fixed',
              bottom: 16,
              right: 16,
              bgcolor: 'var(--accent-teal)',
              '&:hover': {
                bgcolor: 'var(--accent-purple)',
              }
            }}
            onClick={handleClose}
          >
            <Check />
          </Fab>
        )}
      </Dialog>
    </>
  );
}
