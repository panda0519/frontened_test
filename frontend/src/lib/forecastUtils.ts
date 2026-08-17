import type { ForecastRow, HistoricalRow } from "shared";

export function buildForecastSegment(
	historicalRows: HistoricalRow[],
	forecastRows: ForecastRow[],
): { date: string; value: number; type: "historical" | "forecast" }[] {
	const result: {
		date: string;
		value: number;
		type: "historical" | "forecast";
	}[] = [];

	// Add historical data - filter out any rows with missing required fields
	const sortedHistorical = [...historicalRows]
		.filter((row): row is HistoricalRow & { Time: string; Water_Level: number } => 
			row.Time !== undefined && row.Water_Level !== undefined
		)
		.sort(
			(a, b) => new Date(a.Time).getTime() - new Date(b.Time).getTime(),
		);

	for (const row of sortedHistorical) {
		result.push({
			date: row.Time,
			value: row.Water_Level,
			type: "historical",
		});
	}

	// Add forecast as a single segment from last historical point
	if (sortedHistorical.length > 0 && forecastRows.length > 0) {
		const lastHistorical = sortedHistorical[sortedHistorical.length - 1];
		const forecast = forecastRows[0]; // Use first forecast row

		if (
			lastHistorical.Water_Level !== undefined &&
			forecast.Forecasted_SoE_Proxy_Pct !== undefined
		) {
			// Forecast date is 6 months from last historical date
			const lastDate = new Date(lastHistorical.Time);
			const forecastDate = new Date(lastDate);
			forecastDate.setMonth(
				forecastDate.getMonth() + (forecast.Forecast_Horizon_Months || 6),
			);

			result.push({
				date: forecastDate.toISOString().split("T")[0],
				value:
					lastHistorical.Water_Level +
					(forecast.Forecasted_SoE_Proxy_Pct / 100) * lastHistorical.Water_Level, // Approximate
				type: "forecast",
			});
		}
	}

	return result;
}
