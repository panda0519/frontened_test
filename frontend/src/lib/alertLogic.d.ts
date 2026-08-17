import type { HistoricalRow } from "shared";
export declare function computeAlertState(previousState: "ON" | "OFF", currentPercentage: number): "ON" | "OFF";
export declare function deriveCurrentAlertState(stationHistoryRows: HistoricalRow[]): "ON" | "OFF";
export declare function splitPlottableStations<T extends {
    station_id: string;
    name: string;
    latitude: number;
    longitude: number;
}>(stations: T[]): {
    plottable: T[];
    missing: T[];
};
