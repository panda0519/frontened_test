import type { ForecastRow, HistoricalRow } from "shared";
interface TrajectoryChartProps {
    historicalData: HistoricalRow[] | undefined;
    forecastData: ForecastRow[] | undefined;
    selectedStationId?: string | number;
}
export declare function TrajectoryChart({ historicalData, forecastData, selectedStationId, }: TrajectoryChartProps): import("react").JSX.Element;
export {};
