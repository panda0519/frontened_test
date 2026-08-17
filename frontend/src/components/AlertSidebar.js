import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { deriveCurrentAlertState } from "../lib/alertLogic";
import { StatusBadge } from "./StatusBadge";
import { ScrollArea } from "./ui/scroll-area";
export function AlertSidebar({ stations, historicalData, selectedStationId, onSelectStation, isOpen = true, }) {
    const alertingStations = useMemo(() => {
        if (!stations || !historicalData)
            return [];
        return stations
            .map((station) => {
            const stationHistory = historicalData.filter((h) => String(h.Station_ID) === String(station.station_id));
            const alertState = deriveCurrentAlertState(stationHistory);
            const currentReading = [...stationHistory].sort((a, b) => new Date(b.Time).getTime() - new Date(a.Time).getTime())[0];
            return {
                station,
                alertState,
                currentReading,
            };
        })
            .filter((s) => s.alertState === "ON")
            .sort((a, b) => {
            const aPercentage = a.currentReading?.Estimated_SoE_Proxy_Pct || 0;
            const bPercentage = b.currentReading?.Estimated_SoE_Proxy_Pct || 0;
            return bPercentage - aPercentage; // Descending
        });
    }, [stations, historicalData]);
    if (!isOpen)
        return null;
    return (_jsxs("div", { className: "w-full md:w-80 bg-gray-800 border-r border-gray-700 flex flex-col h-full", children: [_jsxs("div", { className: "p-4 border-b border-gray-700", children: [_jsx("h2", { className: "text-lg font-bold", children: "Active Alerts" }), _jsxs("p", { className: "text-sm text-gray-400", children: [alertingStations.length, " station(s)"] })] }), alertingStations.length === 0 ? (_jsx("div", { className: "flex-1 flex items-center justify-center text-gray-400 text-sm text-center p-4", children: "No active alerts" })) : (_jsx(ScrollArea, { className: "flex-1", children: _jsx("div", { className: "space-y-2 p-4", children: alertingStations.map(({ station, currentReading }) => (_jsxs("button", { type: "button", onClick: () => onSelectStation?.(station.station_id), className: `w-full text-left p-3 rounded cursor-pointer transition ${String(selectedStationId) === String(station.station_id)
                            ? "bg-gray-700"
                            : "bg-gray-800 hover:bg-gray-700 border border-gray-700"}`, children: [_jsxs("div", { className: "flex justify-between items-start mb-2", children: [_jsxs("div", { children: [_jsx("p", { className: "font-semibold text-white", children: station.name }), _jsx("p", { className: "text-xs text-gray-400", children: station.block })] }), _jsx(StatusBadge, { status: station.official_category })] }), _jsxs("p", { className: "text-sm text-gray-300", children: ["Estimated SoE:", " ", (currentReading?.Estimated_SoE_Proxy_Pct || 0).toFixed(1), "%"] })] }, station.station_id))) }) }))] }));
}
