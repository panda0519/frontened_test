"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hono_1 = require("hono");
var shared_1 = require("shared");
var zod_1 = require("zod");
var health = new hono_1.Hono();
health.get("/", function (c) {
    var response = {
        error: false,
        data: { status: "ok", timestamp: new Date().toISOString() },
    };
    var validated = (0, shared_1.ApiSuccessEnvelopeSchema)(zod_1.z.object({ status: zod_1.z.string(), timestamp: zod_1.z.string() })).parse(response);
    return c.json(validated);
});
exports.default = health;
