"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var hono_1 = require("hono");
var cors_1 = require("hono/cors");
var errorHandler_1 = require("./middleware/errorHandler");
var forecast_1 = require("./routes/forecast");
var health_1 = require("./routes/health");
var historical_1 = require("./routes/historical");
var stations_1 = require("./routes/stations");
var app = new hono_1.Hono();
// CORS: allow frontend only
app.use("/*", (0, cors_1.cors)({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    allowMethods: ["GET", "POST"],
    credentials: true,
}));
// Routes (using relative path to route files)
app.route("/health", health_1.default);
app.route("/stations", stations_1.default);
app.route("/historical", historical_1.default);
app.route("/forecast", forecast_1.default);
// Error handler (must be after routes)
(0, errorHandler_1.setupErrorHandler)(app);
// Default 404 handler
app.notFound(function (c) {
    return c.json({
        error: true,
        message: "Route not found",
        code: "NOT_FOUND",
    }, 404);
});
// Start server
var port = Number(process.env.PORT || 3001);
console.log("\uD83D\uDE80 Backend running on http://localhost:".concat(port));
exports.default = app;
