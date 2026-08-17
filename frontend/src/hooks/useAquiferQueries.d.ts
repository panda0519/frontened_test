export declare function useStations(stationId?: string): import("@tanstack/react-query").UseQueryResult<NoInfer<{
    station_id: string;
    name: string;
    block: string;
    latitude: number;
    longitude: number;
    net_availability: number;
    official_category: "Safe" | "Semi-Critical" | "Critical" | "Over-Exploited" | "Insufficient history";
}[]>, Error>;
export declare function useHistorical(stationId?: string): import("@tanstack/react-query").UseQueryResult<NoInfer<{
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
}[]>, Error>;
export declare function useForecast(stationId?: string): import("@tanstack/react-query").UseQueryResult<NoInfer<{
    Station_ID: string;
    Forecasted_SoE_Proxy_Pct: number;
    Forecast_Horizon_Months: number;
}[]>, Error>;
export declare function useAquiferQueries(stationId?: string): {
    stations: import("@tanstack/react-query").UseQueryResult<NoInfer<{
        station_id: string;
        name: string;
        block: string;
        latitude: number;
        longitude: number;
        net_availability: number;
        official_category: "Safe" | "Semi-Critical" | "Critical" | "Over-Exploited" | "Insufficient history";
    }[]>, Error>;
    historical: import("@tanstack/react-query").UseQueryResult<NoInfer<{
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
    }[]>, Error>;
    forecast: import("@tanstack/react-query").UseQueryResult<NoInfer<{
        Station_ID: string;
        Forecasted_SoE_Proxy_Pct: number;
        Forecast_Horizon_Months: number;
    }[]>, Error>;
    isPending: boolean;
    isError: boolean;
    error: Error | null;
    refetch: () => void;
};
