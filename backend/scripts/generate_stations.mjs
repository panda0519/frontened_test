import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "csv-parse/sync";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "..", "data");
const HIST_PATH = path.join(DATA_DIR, "processed_math_data.csv");
const OUT_PATH = path.join(DATA_DIR, "stations.csv");

if (!fs.existsSync(HIST_PATH)) {
	console.error(`processed_math_data.csv not found at ${HIST_PATH}`);
	process.exit(1);
}

const rows = parse(fs.readFileSync(HIST_PATH, "utf8"), {
	columns: true,
	skip_empty_lines: true,
});

const byStation = new Map();
for (const r of rows) {
	const key = String(r.Station_ID);
	if (!byStation.has(key)) {
		byStation.set(key, {
			station_id: r.Station_ID,
			name: `Well-${r.Station_ID}`,
			block: r.Block_ID,
			latitude: Number(r.Latitude),
			longitude: Number(r.Longitude),
			status: r.Official_Category,
		});
	}
}

const out = Array.from(byStation.values()).sort((a, b) =>
	a.station_id.localeCompare(b.station_id),
);

const header = "station_id,name,block,latitude,longitude,status\n";
const body = out
	.map(
		(o) =>
			`${o.station_id},${o.name},${o.block},${o.latitude},${o.longitude},${o.status}`,
	)
	.join("\n");
fs.writeFileSync(OUT_PATH, `${header + body}\n`);

console.log(`Generated ${OUT_PATH} with ${out.length} stations`);
