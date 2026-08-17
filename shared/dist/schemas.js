import { z } from "zod";
// ============================================================================
// STATUS ENUM
// ============================================================================
export const StationStatusSchema = z.enum([
    "Safe",
    "Semi-Critical",
    "Critical",
    "Over-Exploited",
    "Insufficient history",
]);
// Confidence tiers
export const ConfidenceSchema = z.enum(["LOW", "MEDIUM", "HIGH"]);
// ============================================================================
// HISTORICAL DATA ROW
// ============================================================================
export const HistoricalRowSchema = z
    .object({
    Time: z.string().min(1), // YYYY-MM-DD format
    Station_ID: z.string().min(1),
    Water_Level: z.number(),
    Latitude: z.number(),
    Longitude: z.number(),
    Block_ID: z.string().min(1),
    Net_Availability: z.number(),
    Official_Category: StationStatusSchema,
    Depth_Decline_Proxy: z.number().nullable(),
    Estimated_SoE_Proxy_Pct: z.number().nullable(),
    Estimated_Category: z
        .union([StationStatusSchema, z.literal("Insufficient history")])
        .nullable(),
    Confidence: ConfidenceSchema,
    Drift_Flag: z.boolean(),
    Alert_Active: z.boolean(),
})
    .strict();
// ============================================================================
// FORECAST DATA ROW
// ============================================================================
export const ForecastRowSchema = z
    .object({
    Station_ID: z.string().min(1),
    Forecasted_SoE_Proxy_Pct: z.number(),
    Forecast_Horizon_Months: z.number(),
})
    .strict();
// ============================================================================
// STATION ROW
// ============================================================================
export const StationRowSchema = z
    .object({
    station_id: z.string().min(1),
    name: z.string().min(1),
    block: z.string().min(1),
    latitude: z.number(),
    longitude: z.number(),
    net_availability: z.number(),
    official_category: StationStatusSchema,
})
    .strict();
// ============================================================================
// API ENVELOPE SCHEMAS
// ============================================================================
export const ApiSuccessEnvelopeSchema = (dataSchema) => z.object({
    error: z.literal(false),
    data: dataSchema,
});
export const ApiErrorEnvelopeSchema = z.object({
    error: z.literal(true),
    message: z.string(),
    code: z.string(),
});
