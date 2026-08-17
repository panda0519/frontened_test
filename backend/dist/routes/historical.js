import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ApiSuccessEnvelopeSchema, HistoricalRowSchema } from "shared";
import { z } from "zod";
import { parseCsvFile } from "../lib/csvParser";
const historical = new Hono();
historical.get("/", zValidator("query", z.object({ station_id: z.string().optional() })), async (c) => {
    const { station_id } = c.req.valid("query");
    const rows = await parseCsvFile("processed_math_data.csv");
    const filtered = station_id
        ? rows.filter((r) => String(r.Station_ID) === station_id)
        : rows;
    const validatedData = filtered.map((row) => {
        // Ensure nulls for optional fields if they are missing or empty strings
        const sanitized = {
            ...row,
            Depth_Decline_Proxy: row.Depth_Decline_Proxy === null ? null : row.Depth_Decline_Proxy,
            Estimated_SoE_Proxy_Pct: row.Estimated_SoE_Proxy_Pct === null
                ? null
                : row.Estimated_SoE_Proxy_Pct,
            Estimated_Category: row.Estimated_Category === null || row.Estimated_Category === ""
                ? null
                : row.Estimated_Category,
            // Ensure booleans are converted from strings if necessary
            Drift_Flag: typeof row.Drift_Flag === "boolean"
                ? row.Drift_Flag
                : String(row.Drift_Flag).toLowerCase() === "true",
            Alert_Active: typeof row.Alert_Active === "boolean"
                ? row.Alert_Active
                : String(row.Alert_Active).toLowerCase() === "true",
        };
        return HistoricalRowSchema.parse(sanitized);
    });
    return c.json(ApiSuccessEnvelopeSchema(z.array(HistoricalRowSchema)).parse({
        error: false,
        data: validatedData,
    }));
});
export default historical;
