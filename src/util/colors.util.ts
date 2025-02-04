import {FilterType, ScheduleEntry} from "@/types";

const cache: { [type: string]: { [key: string]: string } } = {};


export const getColor = ({filterType, entry}: { filterType: FilterType, entry: ScheduleEntry }) => {

  const type = filterType;
  const key = filterType === "persons" ? entry.place : entry.persons.join(", ");

  if (!cache[type]) {
    cache[type] = {};
  }
  if (!cache[type][key]) {
    cache[type][key] = palette2[Object.keys(cache[type]).length % palette2.length];
  }
  return cache[type][key];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const palette = [
  "#4A88C5",
  "#97E589",
  "#F4D44E",
  "#EA79A3",
  "#7948A2",
  "#B84656",
  "#81C953",
  "#F7BAD3",
  "#BE8CE5",
  "#AB2838",
  "#88AEDB",
  "#D18623",
  "#5D2A7B",
  "#43AA47",
  "#EE8EA5",
  "#3D6FAD",
  "#C56A1D",
  "#9E1C29",
  "#BBDAF2",
  "#E8C539",
]

const palette2 = [
  "#0F0E11", //Near Black)
  "#18363E", //Ocean Teal)
  "#2D5F6E", //Deep Cyan)
  "#20498A", //Navy Blue)
  "#3D6FAD", //Royal Blue)
  "#7C1715", //Barn Red)
  "#9E1C29", //Crimson)
  "#AB2838", //Wine Red)
  "#B2336C", //Berry Pink)
  "#5D2A7B", //Royal Purple)
  "#7948A2", //Amethyst)
  "#842D78", //Magenta)
  "#674AB3", //Electric Violet)
  "#28662B", //Forest Green)
  "#2A8636", //Emerald)
  "#174DB1", //Yacht Blue)
  "#297EA1", //Pool Teal)
  "#3A3C44", //Graphite)
  "#4B1517", //Oxblood)
  "#5A2555" //Plum)
]
