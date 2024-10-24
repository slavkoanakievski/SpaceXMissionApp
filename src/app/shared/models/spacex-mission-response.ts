import { CrewModel } from "./crew-model";

export interface SpacexMissionResponse {
  id: string;
  name: string;
  flightNumber: string;
  dateUtc: string;
  dateLocal: string;
  success: boolean;
  rocket: string;
  crew: CrewModel[];
  webcast: string;
  wikipedia: string;
  smallImageUrl: string;
  largeImageUrl: string;
}
