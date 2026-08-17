import { useQuery } from "@tanstack/react-query";
const API_BASE = "/api";
async function fetchJson(url) {
    const res = await fetch(url);
    if (!res.ok) {
        const error = (await res
            .json()
            .catch(() => ({ message: res.statusText })));
        throw new Error(error.message || `HTTP ${res.status}`);
    }
    return res.json();
}
export function useStations(stationId) {
    return useQuery({
        queryKey: ["stations", stationId],
        queryFn: () => fetchJson(`${API_BASE}/stations${stationId ? `?station_id=${stationId}` : ""}`),
        select: (data) => data.data,
        staleTime: 60000,
        refetchInterval: 60000,
    });
}
export function useHistorical(stationId) {
    return useQuery({
        queryKey: ["historical", stationId],
        queryFn: () => fetchJson(`${API_BASE}/historical${stationId ? `?station_id=${stationId}` : ""}`),
        select: (data) => data.data,
        enabled: !!stationId,
        staleTime: 30000,
        refetchInterval: 30000,
    });
}
export function useForecast(stationId) {
    return useQuery({
        queryKey: ["forecast", stationId],
        queryFn: () => fetchJson(`${API_BASE}/forecast${stationId ? `?station_id=${stationId}` : ""}`),
        select: (data) => data.data,
        enabled: !!stationId,
        staleTime: 30000,
        refetchInterval: 30000,
    });
}
// Combined hook for convenience
export function useAquiferQueries(stationId) {
    const stations = useStations();
    const historical = useHistorical(stationId);
    const forecast = useForecast(stationId);
    const isPending = stations.isPending || historical.isPending || forecast.isPending;
    const isError = stations.isError || historical.isError || forecast.isError;
    const error = stations.error || historical.error || forecast.error;
    const refetch = () => {
        stations.refetch();
        historical.refetch();
        forecast.refetch();
    };
    return {
        stations,
        historical,
        forecast,
        isPending,
        isError,
        error,
        refetch,
    };
}
