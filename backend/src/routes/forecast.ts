import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ForecastRowSchema } from "shared";
import { z } from "zod";
import { parseCsvFile } from "../lib/csvParser";

const forecast = new Hono();

forecast.get(
	"/",
	zValidator("query", z.object({ station_id: z.string().optional() })),
	async (c) => {
		const { station_id } = c.req.valid("query");
		const rows = await parseCsvFile("ml_forecast_results.csv");

		const filtered = station_id
			? rows.filter((r) => String(r.Station_ID) === station_id)
			: rows;

		const validatedData = filtered.map((row) => ForecastRowSchema.parse(row));

		return c.json({
			error: false as const,
			data: validatedData,
		});
	},
);

export default forecast;
