import "dotenv/config";
import { google } from "@ai-sdk/google";

export const model = google("gemini-3.8-flash");