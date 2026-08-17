import { describe, expect, it } from "bun:test";
import { computeAlertState, deriveCurrentAlertState } from "./alertLogic";
describe("computeAlertState — Hysteresis Logic", () => {
    it("case a: OFF + 70% (inside band) → stays OFF", () => {
        expect(computeAlertState("OFF", 70)).toBe("OFF");
    });
    it("case b: ON + 70% (inside band) → stays ON", () => {
        expect(computeAlertState("ON", 70)).toBe("ON");
    });
    it("case c: OFF + 75% (above threshold) → ON", () => {
        expect(computeAlertState("OFF", 75)).toBe("ON");
    });
    it("case d: ON + 65% (below threshold) → OFF", () => {
        expect(computeAlertState("ON", 65)).toBe("OFF");
    });
    it("case e: OFF + 72% (upper boundary, inclusive) → stays OFF", () => {
        expect(computeAlertState("OFF", 72)).toBe("OFF");
    });
    it("case f: ON + 68% (lower boundary, inclusive) → stays ON", () => {
        expect(computeAlertState("ON", 68)).toBe("ON");
    });
});
describe("deriveCurrentAlertState — Walk History", () => {
    it("empty history returns OFF", () => {
        expect(deriveCurrentAlertState([])).toBe("OFF");
    });
    it("single reading with 75% returns ON", () => {
        const rows = [
            {
                Time: "2024-01-01",
                Station_ID: "1",
                Water_Level: 10,
                Latitude: 30,
                Longitude: 75,
                Block_ID: "B1",
                Net_Availability: 5,
                Official_Category: "Safe",
                Depth_Decline_Proxy: null,
                Estimated_SoE_Proxy_Pct: 75,
                Estimated_Category: null,
                Confidence: "HIGH",
                Drift_Flag: false,
                Alert_Active: false,
            },
        ];
        expect(deriveCurrentAlertState(rows)).toBe("ON");
    });
});
