import type { ForecastRow, HistoricalRow } from "shared";
export declare function buildForecastSegment(historicalRows: HistoricalRow[], forecastRows: ForecastRow[]): {
    date: string;
    value: number;
    type: "historical" | "forecast";
}[];
