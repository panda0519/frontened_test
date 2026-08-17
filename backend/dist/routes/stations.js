import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ApiSuccessEnvelopeSchema, StationRowSchema } from "shared";
import { z } from "zod";
import { parseCsvFile } from "../lib/csvParser";
const stations = new Hono();
stations.get("/", zValidator("query", z.object({ station_id: z.string().optional() })), async (c) => {
    const { station_id } = c.req.valid("query");
    const rows = await parseCsvFile("processed_math_data.csv");
    // Derive stations from latest historical row per station
    const latestByStation = new Map();
    for (const row of rows) {
        const sid = String(row.Station_ID);
        const current = latestByStation.get(sid);
        if (!current ||
            new Date(String(row.Time)) > new Date(String(current.Time))) {
            latestByStation.set(sid, row);
        }
    }
    const stationsData = Array.from(latestByStation.values()).map((row) => ({
        station_id: String(row.Station_ID),
        name: String(row.Station_ID),
        block: String(row.Block_ID),
        latitude: row.Latitude,
        longitude: row.Longitude,
        net_availability: row.Net_Availability,
        official_category: row.Official_Category,
    }));
    // Filter by station_id if provided
    const filtered = station_id
        ? stationsData.filter((s) => String(s.station_id) === station_id ||
            String(s.name).toLowerCase() === station_id.toLowerCase())
        : stationsData;
    const response = {
        error: false,
        data: filtered,
    };
    const validated = ApiSuccessEnvelopeSchema(z.array(StationRowSchema)).parse(response);
    return c.json(validated);
});
export default stations;
