import { z } from "zod";
export declare const StationStatusSchema: z.ZodEnum<["Safe", "Semi-Critical", "Critical", "Over-Exploited", "Insufficient history"]>;
export type StationStatus = z.infer<typeof StationStatusSchema>;
export declare const ConfidenceSchema: z.ZodEnum<["LOW", "MEDIUM", "HIGH"]>;
export type Confidence = z.infer<typeof ConfidenceSchema>;
export declare const HistoricalRowSchema: z.ZodObject<{
    Time: z.ZodString;
    Station_ID: z.ZodString;
    Water_Level: z.ZodNumber;
    Latitude: z.ZodNumber;
    Longitude: z.ZodNumber;
    Block_ID: z.ZodString;
    Net_Availability: z.ZodNumber;
    Official_Category: z.ZodEnum<["Safe", "Semi-Critical", "Critical", "Over-Exploited", "Insufficient history"]>;
    Depth_Decline_Proxy: z.ZodNullable<z.ZodNumber>;
    Estimated_SoE_Proxy_Pct: z.ZodNullable<z.ZodNumber>;
    Estimated_Category: z.ZodNullable<z.ZodUnion<[z.ZodEnum<["Safe", "Semi-Critical", "Critical", "Over-Exploited", "Insufficient history"]>, z.ZodLiteral<"Insufficient history">]>>;
    Confidence: z.ZodEnum<["LOW", "MEDIUM", "HIGH"]>;
    Drift_Flag: z.ZodBoolean;
    Alert_Active: z.ZodBoolean;
}, "strict", z.ZodTypeAny, {
    Time: string;
    Station_ID: string;
    Water_Level: number;
    Latitude: number;
    Longitude: number;
    Block_ID: string;
    Net_Availability: number;
    Official_Category: "Safe" | "Semi-Critical" | "Critical" | "Over-Exploited" | "Insufficient history";
    Depth_Decline_Proxy: number | null;
    Estimated_SoE_Proxy_Pct: number | null;
    Estimated_Category: "Safe" | "Semi-Critical" | "Critical" | "Over-Exploited" | "Insufficient history" | null;
    Confidence: "LOW" | "MEDIUM" | "HIGH";
    Drift_Flag: boolean;
    Alert_Active: boolean;
}, {
    Time: string;
    Station_ID: string;
    Water_Level: number;
    Latitude: number;
    Longitude: number;
    Block_ID: string;
    Net_Availability: number;
    Official_Category: "Safe" | "Semi-Critical" | "Critical" | "Over-Exploited" | "Insufficient history";
    Depth_Decline_Proxy: number | null;
    Estimated_SoE_Proxy_Pct: number | null;
    Estimated_Category: "Safe" | "Semi-Critical" | "Critical" | "Over-Exploited" | "Insufficient history" | null;
    Confidence: "LOW" | "MEDIUM" | "HIGH";
    Drift_Flag: boolean;
    Alert_Active: boolean;
}>;
export type HistoricalRow = z.infer<typeof HistoricalRowSchema>;
export declare const ForecastRowSchema: z.ZodObject<{
    Station_ID: z.ZodString;
    Forecasted_SoE_Proxy_Pct: z.ZodNumber;
    Forecast_Horizon_Months: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    Station_ID: string;
    Forecasted_SoE_Proxy_Pct: number;
    Forecast_Horizon_Months: number;
}, {
    Station_ID: string;
    Forecasted_SoE_Proxy_Pct: number;
    Forecast_Horizon_Months: number;
}>;
export type ForecastRow = z.infer<typeof ForecastRowSchema>;
export declare const StationRowSchema: z.ZodObject<{
    station_id: z.ZodString;
    name: z.ZodString;
    block: z.ZodString;
    latitude: z.ZodNumber;
    longitude: z.ZodNumber;
    net_availability: z.ZodNumber;
    official_category: z.ZodEnum<["Safe", "Semi-Critical", "Critical", "Over-Exploited", "Insufficient history"]>;
}, "strict", z.ZodTypeAny, {
    station_id: string;
    name: string;
    block: string;
    latitude: number;
    longitude: number;
    net_availability: number;
    official_category: "Safe" | "Semi-Critical" | "Critical" | "Over-Exploited" | "Insufficient history";
}, {
    station_id: string;
    name: string;
    block: string;
    latitude: number;
    longitude: number;
    net_availability: number;
    official_category: "Safe" | "Semi-Critical" | "Critical" | "Over-Exploited" | "Insufficient history";
}>;
export type Station = z.infer<typeof StationRowSchema>;
export declare const ApiSuccessEnvelopeSchema: <T extends z.ZodTypeAny>(dataSchema: T) => z.ZodObject<{
    error: z.ZodLiteral<false>;
    data: T;
}, "strip", z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
    error: z.ZodLiteral<false>;
    data: T;
}>, any> extends infer T_1 ? { [k in keyof T_1]: T_1[k]; } : never, z.baseObjectInputType<{
    error: z.ZodLiteral<false>;
    data: T;
}> extends infer T_2 ? { [k_1 in keyof T_2]: T_2[k_1]; } : never>;
export type ApiSuccessEnvelope<T = unknown> = {
    error: false;
    data: T;
};
export declare const ApiErrorEnvelopeSchema: z.ZodObject<{
    error: z.ZodLiteral<true>;
    message: z.ZodString;
    code: z.ZodString;
}, "strip", z.ZodTypeAny, {
    code: string;
    message: string;
    error: true;
}, {
    code: string;
    message: string;
    error: true;
}>;
export type ApiErrorEnvelope = {
    error: true;
    message: string;
    code: string;
};
