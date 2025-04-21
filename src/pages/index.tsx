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

export default function Home() {
  useLoadData();
  const data = useEvents();

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
            slotMinTime={formatDate(
              add(data.firstStart, { hours: -1 }),
              "HH:00:00"
            )}
            slotMaxTime={formatDate(
              add(data.lastEnd, { hours: 1 }),
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
            dayHeaderFormat={{ weekday: 'long', day: 'numeric' }}
            slotEventOverlap={false}
            slotLaneClassNames="calendar-slot-lane"
          />
        ) : (
          <div>Loading...</div>
        )}
      </main>
    </>
  );
}
