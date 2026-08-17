import "maplibre-gl/dist/maplibre-gl.css";
import type { Station } from "shared";
interface StationMapProps {
    stations: Station[] | undefined;
    selectedStationId?: string | number;
    onSelectStation?: (stationId: string | number) => void;
}
export declare function StationMap({ stations, selectedStationId, onSelectStation, }: StationMapProps): import("react").JSX.Element;
export {};
