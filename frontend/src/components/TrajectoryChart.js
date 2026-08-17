import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, } from "recharts";
import { buildForecastSegment } from "../lib/forecastUtils";
import { Card, CardContent } from "./ui/card";
export function TrajectoryChart({ historicalData, forecastData, selectedStationId, }) {
    const chartData = useMemo(() => {
        if (!historicalData)
            return [];
        // Filter historical data for selected station
        const stationHistory = selectedStationId
            ? historicalData.filter((h) => String(h.Station_ID) === String(selectedStationId))
            : historicalData;
        // Filter forecast data for selected station
        const stationForecast = selectedStationId && forecastData
            ? forecastData.filter((f) => String(f.Station_ID) === String(selectedStationId))
            : [];
        return buildForecastSegment(stationHistory, stationForecast);
    }, [historicalData, forecastData, selectedStationId]);
    // Split into display items for Recharts
    // Recharts needs a flat array where each item can have 'historicalValue' and 'forecastValue'
    // to draw them as different series.
    // Ensure formattedData is only computed after chartData is stable and valid
    const formattedData = useMemo(() => {
        if (!chartData || chartData.length === 0)
            return [];
        return chartData.map((d) => ({
            date: d.date,
            historical: d.type === "historical" ? d.value : null,
            forecast: d.type === "forecast"
                ? d.value
                : d.type === "historical" &&
                    chartData.indexOf(d) === chartData.length - 2
                    ? d.value
                    : null, // connect the forecast segment from last historical
        }));
    }, [chartData]);
    if (!historicalData || historicalData.length === 0) {
        return (_jsx("div", { className: "flex items-center justify-center h-64 bg-gray-800 border border-gray-700 rounded-lg text-gray-400", children: "No data available" }));
    }
    return (_jsx(Card, { className: "bg-gray-800 border-gray-700", children: _jsxs(CardContent, { className: "p-6", children: [_jsx("h3", { className: "text-lg font-bold text-white mb-4", children: "Water Level Trajectory & Forecast" }), _jsx("div", { className: "h-80 w-full", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(ComposedChart, { data: formattedData, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#374151" }), _jsx(XAxis, { dataKey: "date", stroke: "#9ca3af" }), _jsx(YAxis, { stroke: "#9ca3af", label: {
                                        value: "Water Level (m)",
                                        angle: -90,
                                        position: "insideLeft",
                                        fill: "#9ca3af",
                                    } }), _jsx(Tooltip, { contentStyle: {
                                        backgroundColor: "#1f2937",
                                        borderColor: "#374151",
                                        color: "#f3f4f6",
                                    }, labelClassName: "text-gray-400" }), _jsx(Legend, {}), _jsx(Line, { type: "monotone", dataKey: "historical", name: "Historical Level", stroke: "#3b82f6", strokeWidth: 2, dot: false }), _jsx(Line, { type: "linear", dataKey: "forecast", name: "6m Forecast", stroke: "#ef4444", strokeWidth: 2, strokeDasharray: "5 5", dot: { r: 4 } })] }) }) })] }) }));
}
