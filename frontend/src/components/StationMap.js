import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import * as maplibregl from "maplibre-gl";
import { useEffect, useRef, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import { splitPlottableStations } from "../lib/alertLogic";
export function StationMap({ stations, selectedStationId, onSelectStation, }) {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [loadError, setLoadError] = useState(null);
    const [warningCount, setWarningCount] = useState(0);
    useEffect(() => {
        if (!mapContainer.current || map.current || !stations)
            return;
        try {
            const { plottable, missing } = splitPlottableStations(stations);
            setWarningCount(missing.length);
            map.current = new maplibregl.Map({
                container: mapContainer.current,
                style: {
                    version: 8,
                    sources: {
                        osm: {
                            type: "raster",
                            tiles: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
                            tileSize: 256,
                            attribution: "© OpenStreetMap contributors",
                        },
                    },
                    layers: [
                        {
                            id: "osm",
                            type: "raster",
                            source: "osm",
                            minzoom: 0,
                            maxzoom: 19,
                        },
                    ],
                },
                center: [75.6, 30.6],
                zoom: 7,
            });
            map.current.addControl(new maplibregl.NavigationControl(), "top-right");
            // Add markers for plottable stations
            plottable.forEach((station) => {
                const el = document.createElement("div");
                el.className = "station-marker";
                el.style.width = "24px";
                el.style.height = "24px";
                el.style.borderRadius = "50%";
                el.style.border = "3px solid white";
                el.style.boxShadow = "0 2px 4px rgba(0,0,0,0.3)";
                el.style.cursor = "pointer";
                el.style.transition = "transform 0.2s";
                el.onmouseenter = () => (el.style.transform = "scale(1.3)");
                el.onmouseleave = () => (el.style.transform = "scale(1)");
                const marker = new maplibregl.Marker({ element: el }).setLngLat([
                    station.longitude,
                    station.latitude,
                ]);
                if (map.current) {
                    marker.addTo(map.current);
                }
                const popup = new maplibregl.Popup({ offset: 15 }).setHTML(`<div class="p-2 min-w-[200px]">
            <h3 class="font-bold text-gray-900 dark:text-gray-100">${station.name}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Block: ${station.block}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">Status: ${station.official_category}</p>
          </div>`);
                marker.setPopup(popup);
                el.addEventListener("click", () => {
                    onSelectStation?.(station.station_id);
                });
            });
            // Fit bounds to show all stations
            if (plottable.length > 0) {
                const bounds = new maplibregl.LngLatBounds();
                for (const s of plottable) {
                    bounds.extend([s.longitude, s.latitude]);
                }
                map.current.fitBounds(bounds, { padding: 50 });
            }
        }
        catch (err) {
            setLoadError(err instanceof Error ? err.message : "Failed to initialize map");
        }
        return () => {
            map.current?.remove();
            map.current = null;
        };
    }, [stations, onSelectStation]);
    // Update selected marker style
    useEffect(() => {
        if (!map.current || !stations)
            return;
    }, [stations]);
    if (loadError) {
        return (_jsxs("div", { className: "flex flex-col items-center justify-center h-full w-full bg-gray-800 text-red-400 p-4", children: [_jsxs("p", { children: ["Failed to load map: ", loadError] }), _jsx("button", { type: "button", onClick: () => window.location.reload(), className: "mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700", children: "Reload" })] }));
    }
    return (_jsxs("div", { className: "relative w-full h-full", children: [_jsx("div", { ref: mapContainer, className: "w-full h-full rounded-lg" }), warningCount > 0 && (_jsx("div", { className: "absolute bottom-4 left-4 right-4 md:left-4 md:right-auto md:w-auto z-10", children: _jsx("div", { className: "bg-yellow-900/90 border border-yellow-600 text-yellow-100 px-4 py-3 rounded-lg shadow-lg max-w-md", children: _jsxs("div", { className: "flex items-start gap-2", children: [_jsx("span", { className: "text-lg", children: "\u26A0\uFE0F" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: "Coordinate Warning" }), _jsxs("p", { className: "text-sm text-yellow-300", children: [warningCount, " station(s) missing valid coordinates and cannot be shown on the map."] })] })] }) }) }))] }));
}
