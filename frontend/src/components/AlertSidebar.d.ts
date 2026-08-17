import type { HistoricalRow, Station } from "shared";
interface AlertSidebarProps {
    stations: Station[] | undefined;
    historicalData: HistoricalRow[] | undefined;
    selectedStationId?: string | number;
    onSelectStation?: (stationId: string | number) => void;
    isOpen?: boolean;
}
export declare function AlertSidebar({ stations, historicalData, selectedStationId, onSelectStation, isOpen, }: AlertSidebarProps): import("react").JSX.Element | null;
export {};
