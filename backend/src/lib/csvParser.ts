import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "csv-parse/sync";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, "..", "..", "data");

export async function parseCsvFile(
	fileName: string,
): Promise<Record<string, unknown>[]> {
	const filePath = path.join(DATA_DIR, fileName);
	try {
		const fileContent = await fs.readFile(filePath, "utf-8");
		const records = parse(fileContent, {
			columns: true,
			skip_empty_lines: true,
			trim: true,
			cast: (value, context) => {
				if (context.header) return value;
				if (value === "" || value === null) return null;
				const num = Number(value);
				if (!Number.isNaN(num) && value.trim() !== "") return num;
				return value;
			},
		}) as Record<string, unknown>[];

		return records;
	} catch (error) {
		if (error instanceof Error && "code" in error && error.code === "ENOENT") {
			throw new Error(`CSV file not found: ${filePath}`);
		}
		throw new Error(
			`Failed to parse CSV file ${filePath}: ${error instanceof Error ? error.message : String(error)}`,
		);
	}
}
