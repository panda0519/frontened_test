import { describe, expect, it } from "bun:test";
import app from "./index";
describe("API Contract Tests", () => {
    it("GET /health returns correct envelope shape", async () => {
        const req = new Request("http://localhost:3001/health");
        const res = await app.fetch(req);
        const body = await res.json();
        expect(res.status).toBe(200);
        expect(body).toHaveProperty("error");
        expect(body).toHaveProperty("data");
        expect(body.error).toBe(false);
        expect(body.data.status).toBe("ok");
    });
    it("GET /stations returns array in correct envelope", async () => {
        const req = new Request("http://localhost:3001/stations");
        const res = await app.fetch(req);
        const body = await res.json();
        expect(res.status).toBe(200);
        expect(body.error).toBe(false);
        expect(Array.isArray(body.data)).toBe(true);
        expect(body.data.length).toBeGreaterThan(0);
    });
    it("GET /historical returns array in correct envelope", async () => {
        const req = new Request("http://localhost:3001/historical");
        const res = await app.fetch(req);
        const body = await res.json();
        expect(res.status).toBe(200);
        expect(body.error).toBe(false);
        expect(Array.isArray(body.data)).toBe(true);
        expect(body.data.length).toBeGreaterThan(0);
    });
    it("GET /forecast returns array in correct envelope", async () => {
        const req = new Request("http://localhost:3001/forecast");
        const res = await app.fetch(req);
        const body = await res.json();
        expect(res.status).toBe(200);
        expect(body.error).toBe(false);
        expect(Array.isArray(body.data)).toBe(true);
        expect(body.data.length).toBeGreaterThan(0);
    });
    it("GET /nonexistent returns 404 with correct error envelope", async () => {
        const req = new Request("http://localhost:3001/nonexistent");
        const res = await app.fetch(req);
        const body = await res.json();
        expect(res.status).toBe(404);
        expect(body.error).toBe(true);
        expect(body.message).toBe("Route not found");
        expect(body.code).toBe("NOT_FOUND");
    });
    it("GET /stations?station_id=ST-01-1 filters correctly", async () => {
        const req = new Request("http://localhost:3001/stations?station_id=ST-01-1");
        const res = await app.fetch(req);
        const body = await res.json();
        expect(res.status).toBe(200);
        expect(body.error).toBe(false);
        expect(Array.isArray(body.data)).toBe(true);
        if (body.data.length > 0) {
            expect(body.data[0].station_id).toBe("ST-01-1");
        }
    });
});
