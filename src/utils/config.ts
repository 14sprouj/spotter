import { configDotenv } from "dotenv";

configDotenv();

export const Config = {
	Supabase: {
		URL: process.env.SUPABASE_URL!,
		// PROD establish device before deciding on ANON_KEY or SERVICE_ROLE_KEY
		ANON_KEY: process.env.SUPABASE_ANON_KEY!,
	}
};
