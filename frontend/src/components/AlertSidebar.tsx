import { useMemo } from "react";
import type { HistoricalRow, Station } from "shared";
import { deriveCurrentAlertState } from "../lib/alertLogic";
import { StatusBadge } from "./StatusBadge";
import { ScrollArea } from "./ui/scroll-area";

interface AlertSidebarProps {
	stations: Station[] | undefined;
	historicalData: HistoricalRow[] | undefined;
	selectedStationId?: string | number;
	onSelectStation?: (stationId: string | number) => void;
	isOpen?: boolean;
}

export function AlertSidebar({
	stations,
	historicalData,
	selectedStationId,
	onSelectStation,
	isOpen = true,
}: AlertSidebarProps) {
	const alertingStations = useMemo(() => {
		if (!stations || !historicalData) return [];

		return stations
			.map((station) => {
				const stationHistory = historicalData.filter(
					(h) => String(h.Station_ID) === String(station.station_id),
				);
				const alertState = deriveCurrentAlertState(stationHistory);
				const currentReading = [...stationHistory].sort(
					(a, b) => new Date(b.Time).getTime() - new Date(a.Time).getTime(),
				)[0];

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

	if (!isOpen) return null;

	return (
		<div className="w-full md:w-80 bg-gray-800 border-r border-gray-700 flex flex-col h-full">
			<div className="p-4 border-b border-gray-700">
				<h2 className="text-lg font-bold">Active Alerts</h2>
				<p className="text-sm text-gray-400">
					{alertingStations.length} station(s)
				</p>
			</div>

			{alertingStations.length === 0 ? (
				<div className="flex-1 flex items-center justify-center text-gray-400 text-sm text-center p-4">
					No active alerts
				</div>
			) : (
				<ScrollArea className="flex-1">
					<div className="space-y-2 p-4">
						{alertingStations.map(({ station, currentReading }) => (
							<button
								type="button"
								key={station.station_id}
								onClick={() => onSelectStation?.(station.station_id)}
								className={`w-full text-left p-3 rounded cursor-pointer transition ${
									String(selectedStationId) === String(station.station_id)
										? "bg-gray-700"
										: "bg-gray-800 hover:bg-gray-700 border border-gray-700"
								}`}
							>
								<div className="flex justify-between items-start mb-2">
									<div>
										<p className="font-semibold text-white">{station.name}</p>
										<p className="text-xs text-gray-400">{station.block}</p>
									</div>
									<StatusBadge status={station.official_category} />
								</div>
								<p className="text-sm text-gray-300">
									Estimated SoE:{" "}
									{(currentReading?.Estimated_SoE_Proxy_Pct || 0).toFixed(1)}%
								</p>
							</button>
						))}
					</div>
				</ScrollArea>
			)}
		</div>
	);
}
