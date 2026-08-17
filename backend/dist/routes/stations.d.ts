import { Hono } from "hono";
declare const stations: Hono<import("hono/types").BlankEnv, import("hono/types").BlankSchema, "/">;
export default stations;
