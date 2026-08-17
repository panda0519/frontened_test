import { useMemo } from "react";
import {
	CartesianGrid,
	ComposedChart,
	Legend,
	Line,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import type { ForecastRow, HistoricalRow } from "shared";
import { buildForecastSegment } from "../lib/forecastUtils";
import { Card, CardContent } from "./ui/card";

interface TrajectoryChartProps {
	historicalData: HistoricalRow[] | undefined;
	forecastData: ForecastRow[] | undefined;
	selectedStationId?: string | number;
}

export function TrajectoryChart({
	historicalData,
	forecastData,
	selectedStationId,
}: TrajectoryChartProps) {
	const chartData = useMemo(() => {
		if (!historicalData) return [];

		// Filter historical data for selected station
		const stationHistory = selectedStationId
			? historicalData.filter(
					(h) => String(h.Station_ID) === String(selectedStationId),
				)
			: historicalData;

		// Filter forecast data for selected station
		const stationForecast =
			selectedStationId && forecastData
				? forecastData.filter(
						(f) => String(f.Station_ID) === String(selectedStationId),
					)
				: [];

		return buildForecastSegment(stationHistory, stationForecast);
	}, [historicalData, forecastData, selectedStationId]);

	// Split into display items for Recharts
	// Recharts needs a flat array where each item can have 'historicalValue' and 'forecastValue'
	// to draw them as different series.
	// Ensure formattedData is only computed after chartData is stable and valid
	const formattedData = useMemo(() => {
		if (!chartData || chartData.length === 0) return [];
		return chartData.map((d) => ({
			date: d.date,
			historical: d.type === "historical" ? d.value : null,
			forecast:
				d.type === "forecast"
					? d.value
					: d.type === "historical" &&
							chartData.indexOf(d) === chartData.length - 2
						? d.value
						: null, // connect the forecast segment from last historical
		}));
	}, [chartData]);

	if (!historicalData || historicalData.length === 0) {
		return (
			<div className="flex items-center justify-center h-64 bg-gray-800 border border-gray-700 rounded-lg text-gray-400">
				No data available
			</div>
		);
	}

	return (
		<Card className="bg-gray-800 border-gray-700">
			<CardContent className="p-6">
				<h3 className="text-lg font-bold text-white mb-4">
					Water Level Trajectory & Forecast
				</h3>
				<div className="h-80 w-full">
					<ResponsiveContainer width="100%" height="100%">
						<ComposedChart data={formattedData}>
							<CartesianGrid strokeDasharray="3 3" stroke="#374151" />
							<XAxis dataKey="date" stroke="#9ca3af" />
							<YAxis
								stroke="#9ca3af"
								label={{
									value: "Water Level (m)",
									angle: -90,
									position: "insideLeft",
									fill: "#9ca3af",
								}}
							/>
							<Tooltip
								contentStyle={{
									backgroundColor: "#1f2937",
									borderColor: "#374151",
									color: "#f3f4f6",
								}}
								labelClassName="text-gray-400"
							/>
							<Legend />
							<Line
								type="monotone"
								dataKey="historical"
								name="Historical Level"
								stroke="#3b82f6"
								strokeWidth={2}
								dot={false}
							/>
							<Line
								type="linear"
								dataKey="forecast"
								name="6m Forecast"
								stroke="#ef4444"
								strokeWidth={2}
								strokeDasharray="5 5"
								dot={{ r: 4 }}
							/>
						</ComposedChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	);
}
