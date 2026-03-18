import {ApiResponse, ConferenceDay, DaySchedule} from "@/types";
import {Config} from "@/config";

const fetchDay = async (conferenceDay: ConferenceDay): Promise<DaySchedule> => {
  const response = await fetch(`${Config.apiBaseUrl}/${conferenceDay}`, {
    headers: {'Authorization': `Bearer ${Config.apiToken}`},
  });
  const json: ApiResponse = await response.json();
  return json.data.map(item => ({
    ...item,
    persons: item.persons?.split(", ").filter(p => p.length > 0) ?? [],
  }));
};

export const GoogleSheetIntegration = {
  fetchConferenceDay: fetchDay,
}
