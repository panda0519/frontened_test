import { ApiErrorEnvelopeSchema } from "shared";
export function setupErrorHandler(app) {
    app.onError(async (error, c) => {
        const message = error instanceof Error ? error.message : String(error);
        let status = 500;
        let code = "INTERNAL_SERVER_ERROR";
        if (message.includes("CSV file not found")) {
            status = 404;
            code = "CSV_NOT_FOUND";
        }
        else if (message.includes("Failed to parse CSV file")) {
            status = 500;
            code = "CSV_PARSE_ERROR";
        }
        else if (message.includes("Validation failed")) {
            status = 400;
            code = "VALIDATION_ERROR";
        }
        const errorResponse = {
            error: true,
            message,
            code,
        };
        const validated = ApiErrorEnvelopeSchema.parse(errorResponse);
        return c.json(validated, status);
    });
}
