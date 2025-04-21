import Head from "next/head";
import styles from "@/styles/Home.module.css";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { HeaderBar } from "@/components/headerbar/headerbar";
import { useEvents } from "@/data-source/useEvents";
import { formatDate } from "date-fns";
import { add } from "date-fns/add";
import { pseudoNow } from "@/data-source/EventMapper";
import { useLoadData } from "@/data-source/useLoadData";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Event as CalendarEvent } from "@/types";

export default function Home() {
  useLoadData();
  const data = useEvents();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleEventClick = (info: {
    event: {
      title: string;
      start: Date | null;
      end: Date | null;
      backgroundColor: string;
    };
    jsEvent: MouseEvent;
  }) => {
    // Only proceed if we have valid dates
    if (!info.event.start || !info.event.end) return;
    
    // Extract event information from FullCalendar's event object
    const eventData: CalendarEvent = {
      title: info.event.title,
      start: info.event.start,
      end: info.event.end,
      color: info.event.backgroundColor,
    };

    setSelectedEvent(eventData);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  // Format event time for display
  const formatEventTime = (start: Date, end: Date) => {
    return `${formatDate(start, "HH:mm")} - ${formatDate(end, "HH:mm")}`;
  };

  return (
    <>
      <Head>
        <title>Uphill Schedule</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <HeaderBar />
        {data ? (
          <FullCalendar
            plugins={[timeGridPlugin]}
            initialView="timeGrid"
            now={add(pseudoNow, { days: -1 })}
            initialDate={pseudoNow}
            allDaySlot={false}
            headerToolbar={false}
            dayCount={data.columnsCount}
            themeSystem={"standard"}
            eventShortHeight={40}
            events={data.events}
            dayHeaders={true}
            dayHeaderContent={(args: { date: Date }) => {
              return data?.columnNameMapper(args.date);
            }}
            slotMinTime={formatDate(data.firstStart, "HH:00:00")}
            slotMaxTime={formatDate(
              add(data.lastEnd, { minutes: 30 }),
              "HH:00:00"
            )}
            expandRows={true}
            contentHeight="calc(100vh - 75px)"
            eventTimeFormat={{
              hour: "numeric",
              minute: "2-digit",
              hour12: false,
            }}
            slotLabelFormat={{
              hour: "numeric",
              minute: "2-digit",
              hour12: false,
            }}
            eventTextColor={"white"}
            dayHeaderFormat={{ weekday: "long", day: "numeric" }}
            slotEventOverlap={false}
            slotLaneClassNames="calendar-slot-lane"
            eventClick={handleEventClick}
          />
        ) : (
          <div>Loading...</div>
        )}

        {/* Event Details Dialog */}
        <Dialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          fullScreen={isMobile}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle sx={{ m: 0, p: 2, bgcolor: selectedEvent?.color }}>
            <Typography variant="h6" component="div" color="white">
              {selectedEvent?.title}
            </Typography>
            <IconButton
              aria-label="close"
              onClick={handleCloseDialog}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: "white",
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            {selectedEvent && (
              <>
                <Typography variant="body1" sx={{ mb: 1, fontWeight: "bold" }}>
                  Time:{" "}
                  {formatEventTime(selectedEvent.start, selectedEvent.end)}
                </Typography>

                {/* Extract more details from the title if possible */}
                {selectedEvent.title.includes(" - ") && (
                  <>
                    {/* Split the title which usually contains "Title - Place - Persons" */}
                    {selectedEvent.title.split(" - ").map((part, index) => {
                      const labels = ["Event", "Location", "People"];
                      // Skip the first part as it's already shown in the dialog title
                      if (index === 0) return null;

                      return (
                        <Typography key={index} variant="body1" sx={{ mt: 1 }}>
                          <strong>{labels[index]}:</strong> {part}
                        </Typography>
                      );
                    })}
                  </>
                )}
              </>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </>
  );
}
