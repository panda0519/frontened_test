import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useAquiferQueries } from "../hooks/useAquiferQueries";
import { useTheme } from "../hooks/useTheme";
import { deriveCurrentAlertState } from "../lib/alertLogic";
import { AlertSidebar } from "./AlertSidebar";
import { ErrorBanner } from "./ErrorBanner";
import { LoadingState } from "./LoadingState";
import { MetricCard } from "./MetricCard";
import { StationMap } from "./StationMap";
import { TrajectoryChart } from "./TrajectoryChart";
import { Button } from "./ui/button";
export function DashboardLayout() {
    const { theme, setTheme } = useTheme();
    const [selectedStationId, setSelectedStationId] = useState(null);
    // Fetch all data
    const { stations, historical, forecast, isPending, error, refetch } = useAquiferQueries();
    // Auto-select first station on initial load
    if (!selectedStationId &&
        stations.data &&
        stations.data.length > 0 &&
        !isPending) {
        setSelectedStationId(stations.data[0].station_id);
    }
    const selectedStation = stations.data?.find((s) => String(s.station_id) === String(selectedStationId));
    const stationHistory = historical.data?.filter((h) => String(h.Station_ID) === String(selectedStationId)) || [];
    const stationForecast = forecast.data?.filter((f) => String(f.Station_ID) === String(selectedStationId)) || [];
    const alertState = deriveCurrentAlertState(stationHistory);
    // Get latest reading for metrics
    const latestReading = [...stationHistory].sort((a, b) => new Date(b.Time).getTime() - new Date(a.Time).getTime())[0];
    // Compute metrics for the selected station
    const waterLevel = latestReading?.Water_Level;
    const soePercentage = latestReading?.Estimated_SoE_Proxy_Pct;
    const officialCategory = selectedStation?.official_category || latestReading?.Official_Category;
    return (_jsxs("div", { className: "flex flex-col h-screen bg-gray-900 text-gray-100", children: [_jsxs("header", { className: "sticky top-0 z-50 border-b border-gray-700 bg-gray-800 px-4 py-4 flex items-center justify-between", children: [_jsx("h1", { className: "text-2xl font-bold", children: "\uD83C\uDF0A AquaSentinel" }), _jsx(Button, { variant: "outline", size: "sm", onClick: () => setTheme(theme === "dark" ? "light" : "dark"), className: "text-gray-200 border-gray-600 hover:bg-gray-700", children: theme === "dark" ? "☀️ Light" : "🌙 Dark" })] }), error && _jsx(ErrorBanner, { message: error.message, onRetry: refetch }), isPending && _jsx(LoadingState, {}), !isPending && !error && (_jsxs("main", { className: "flex-1 flex overflow-hidden", children: [_jsx(AlertSidebar, { stations: stations.data, historicalData: historical.data, selectedStationId: selectedStationId || undefined, onSelectStation: (id) => setSelectedStationId(id) }), _jsxs("div", { className: "flex-1 overflow-y-auto p-6 space-y-6", children: [selectedStation ? (_jsxs(_Fragment, { children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsx(MetricCard, { label: "Water Level", value: waterLevel?.toFixed(2) ?? "N/A", unit: "m", status: officialCategory }), _jsx(MetricCard, { label: "SoE Percentage", value: soePercentage?.toFixed(1) ?? "N/A", unit: "%" }), _jsx(MetricCard, { label: "Alert Status", value: alertState })] }), _jsx(TrajectoryChart, { historicalData: stationHistory, forecastData: stationForecast, selectedStationId: selectedStationId || undefined })] })) : (_jsx("div", { className: "text-gray-400", children: "Select a station to view details" })), _jsx("div", { className: "h-96 w-full rounded-lg overflow-hidden border border-gray-700", children: _jsx(StationMap, { stations: stations.data, selectedStationId: selectedStationId || undefined, onSelectStation: (id) => setSelectedStationId(id) }) })] })] }))] }));
}
