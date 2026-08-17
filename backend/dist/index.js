import "dotenv/config";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { setupErrorHandler } from "./middleware/errorHandler";
import forecastRoutes from "./routes/forecast";
import healthRoutes from "./routes/health";
import historicalRoutes from "./routes/historical";
import stationRoutes from "./routes/stations";
const app = new Hono();
// CORS: allow frontend only
app.use("/*", cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    allowMethods: ["GET", "POST"],
    credentials: true,
}));
// Routes (using relative path to route files)
app.route("/health", healthRoutes);
app.route("/stations", stationRoutes);
app.route("/historical", historicalRoutes);
app.route("/forecast", forecastRoutes);
// Error handler (must be after routes)
setupErrorHandler(app);
// Default 404 handler
app.notFound((c) => {
    return c.json({
        error: true,
        message: "Route not found",
        code: "NOT_FOUND",
    }, 404);
});
// Start server
const port = Number(process.env.PORT || 3001);
console.log(`🚀 Backend running on http://localhost:${port}`);
export default app;
