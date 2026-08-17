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
export type StationStatus = z.infer<typeof StationStatusSchema>;

// Confidence tiers
export const ConfidenceSchema = z.enum(["LOW", "MEDIUM", "HIGH"]);
export type Confidence = z.infer<typeof ConfidenceSchema>;

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

export type HistoricalRow = z.infer<typeof HistoricalRowSchema>;

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

export type ForecastRow = z.infer<typeof ForecastRowSchema>;

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

export type Station = z.infer<typeof StationRowSchema>;

// ============================================================================
// API ENVELOPE SCHEMAS
// ============================================================================
export const ApiSuccessEnvelopeSchema = <T extends z.ZodTypeAny>(
	dataSchema: T,
) =>
	z.object({
		error: z.literal(false),
		data: dataSchema,
	});

export type ApiSuccessEnvelope<T = unknown> = {
	error: false;
	data: T;
};

export const ApiErrorEnvelopeSchema = z.object({
	error: z.literal(true),
	message: z.string(),
	code: z.string(),
});

export type ApiErrorEnvelope = {
	error: true;
	message: string;
	code: string;
};
