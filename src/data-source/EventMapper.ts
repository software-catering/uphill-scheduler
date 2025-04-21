import {Event, FilterType, ScheduleEntry, ViewType} from "@/types";
import {add} from "date-fns/add";
import {formatDate} from "date-fns";
import {ColorMapper} from "@/util/ColorMapper";

export const pseudoNow = new Date(2000, 1, 1)


export class EventMapper {

  private readonly columns: Record<string, { date: Date, name: string }> = {}
  private nextDate = pseudoNow;
  private readonly colorMapper = new ColorMapper();

  private firstStart: number | undefined;
  private lastEnd: number | undefined;

  public constructor(private selectedFilterType: FilterType, private selectedViewType: ViewType) {
  }

  get firstStartDate(): Date {
    if (this.firstStart === undefined) {
      return new Date(pseudoNow.getFullYear(), pseudoNow.getMonth(), pseudoNow.getDate(), 0, 0, 0, 0);
    } else {
      return new Date(this.firstStart);
    }
  }

  get lastEndDate(): Date {
    if (this.lastEnd === undefined) {
      return new Date(pseudoNow.getFullYear(), pseudoNow.getMonth(), pseudoNow.getDate(), 23, 59, 59, 999);
    } else {
      return new Date(this.lastEnd);
    }
  }

  public get columnsCount(): number {
    return Object.keys(this.columns).length
  }

  public get columnNameMapper(): (date: Date) => string {
    const toDateString = (date: Date) => formatDate(date, 'yyyy-MM-dd')

    const columnsByDateString = Object.entries(this.columns).reduce((acc, [columnName, {date}]) => {
      acc[toDateString(date)] = columnName
      return acc
    }, {} as Record<string, string>)

    return (date: Date) => columnsByDateString[toDateString(date)] || ""

  }

  public parseTime = (time: string, columnName: string): Date => {
    if (!this.columns[columnName]) {
      this.columns[columnName] = {
        date: this.nextDate,
        name: columnName
      }
      this.nextDate = add(this.nextDate, {days: 1})
    }


    const columnDate = this.columns[columnName].date;

    const [hours, minutes] = time?.split(':').map(Number);
    const result = new Date(columnDate.getFullYear(), columnDate.getMonth(), columnDate.getDate(), hours, minutes, 0, 0);

    this.collectMinMaxTimeRange(result);
    return result;
  }

  public toEvents = (scheduleEntry: ScheduleEntry): Event[] => {
    switch (this.selectedViewType) {
      case "combined":
        return this.toCombinedEvents(scheduleEntry);
      case "by Persons":
        return this.toEventsByPersons(scheduleEntry);
      case "by Places":
        return this.toEventsByPlaces(scheduleEntry);
      case null:
        return [];
    }
  }

  private collectMinMaxTimeRange(result: Date) {
    const pseudoNowWithTime = new Date(pseudoNow.getFullYear(), pseudoNow.getMonth(), pseudoNow.getDate(), result.getHours(), result.getMinutes(), 0, 0);
    if (this.firstStart === undefined || this.firstStart > pseudoNowWithTime.getTime()) {
      this.firstStart = pseudoNowWithTime.getTime();
    }
    if (this.lastEnd === undefined || this.lastEnd < pseudoNowWithTime.getTime()) {
      this.lastEnd = pseudoNowWithTime.getTime();
    }
  }

  private toCombinedEvents = (scheduleEntry: ScheduleEntry): Event[] => {
    let colorKey: string;
    
    if (this.selectedFilterType === "persons") {
      // Use person names for coloring when filtering by persons
      colorKey = scheduleEntry.persons.join('');
    } else if (this.selectedFilterType === "place") {
      // Use place name for coloring when filtering by places
      colorKey = scheduleEntry.place;
    } else {
      // Default to place-based coloring for "all" filter
      colorKey = scheduleEntry.place;
    }
    
    return [{
      title: `${scheduleEntry.title} - ${scheduleEntry.place} - ${scheduleEntry.persons.join(', ')}`,
      start: this.parseTime(scheduleEntry.start, ''),
      end: this.parseTime(scheduleEntry.end, ''),
      color: this.colorMapper.getColor(colorKey),
    }];
  }

  private toEventsByPersons = (scheduleEntry: ScheduleEntry): Event[] => {
    const persons = scheduleEntry.persons.length > 0 ? scheduleEntry.persons : ['🤗 A L L'];

    return persons.map(person => ({
      title: `${scheduleEntry.title} ${scheduleEntry.place ? `- ${scheduleEntry.place}` : ''}`,
      start: this.parseTime(scheduleEntry.start, person),
      end: this.parseTime(scheduleEntry.end, person),
      color: this.colorMapper.getColor(scheduleEntry.title),
    }));
  }

  private toEventsByPlaces = (scheduleEntry: ScheduleEntry): Event[] => {
    return [{
      title: `${scheduleEntry.title} - ${scheduleEntry.place} - ${scheduleEntry.persons.join(', ')}`,
      start: this.parseTime(scheduleEntry.start, scheduleEntry.place),
      end: this.parseTime(scheduleEntry.end, scheduleEntry.place),
      color: this.colorMapper.getColor(scheduleEntry.persons.join('')),
    }];
  }
}
