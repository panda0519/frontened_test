import type { HistoricalRow } from "shared";

export function computeAlertState(
	previousState: "ON" | "OFF",
	currentPercentage: number,
): "ON" | "OFF" {
	if (currentPercentage > 72) return "ON";
	if (currentPercentage < 68) return "OFF";
	return previousState;
}

export function deriveCurrentAlertState(
	stationHistoryRows: HistoricalRow[],
): "ON" | "OFF" {
	if (stationHistoryRows.length === 0) return "OFF";

	const sorted = [...stationHistoryRows].sort(
		(a, b) => new Date(a.Time).getTime() - new Date(b.Time).getTime(),
	);

	let state: "ON" | "OFF" = "OFF";
	for (const row of sorted) {
		const percentage = row.Estimated_SoE_Proxy_Pct;
		if (typeof percentage === "number") {
			state = computeAlertState(state, percentage);
		}
	}

	return state;
}

export function splitPlottableStations<
	T extends {
		station_id: string;
		name: string;
		latitude: number;
		longitude: number;
	},
>(stations: T[]) {
	const plottable = stations.filter(
		(s) => Number.isFinite(s.latitude) && Number.isFinite(s.longitude),
	);

	const missing = stations.filter((s) => !plottable.includes(s));

	return { plottable, missing };
}
