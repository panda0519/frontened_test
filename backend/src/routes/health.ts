import { Hono } from "hono";
import { ApiSuccessEnvelopeSchema } from "shared";
import { z } from "zod";

const health = new Hono();

health.get("/", (c) => {
	const response = {
		error: false as const,
		data: { status: "ok", timestamp: new Date().toISOString() },
	};
	const validated = ApiSuccessEnvelopeSchema(
		z.object({ status: z.string(), timestamp: z.string() }),
	).parse(response);
	return c.json(validated);
});

export default health;
