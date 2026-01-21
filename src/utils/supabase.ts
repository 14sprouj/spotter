
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Config } from './config';
import { loggit } from './logger';
import { exec } from 'node:child_process';
import fs from 'node:fs';
import { promisify } from 'node:util';
import { Database } from '../database.types';

const supabaseUrl = Config.Supabase.URL
const supabaseKey = Config.Supabase.ANON_KEY

const execAsync = promisify(exec);

async function generateSupabaseTypes() {
	const command = 'supabase gen types typescript --project-id adusphvihhsrfqdjcira';

	try {
		const { stdout, stderr } = await execAsync(command);

		if (stderr) {
			loggit.error('Supabase CLI stderr: ' + stderr);
		}

		await fs.promises.writeFile('src/database.types.d.ts', stdout, 'utf8');

		loggit.info('Supabase types generated successfully.');
	} catch (error) {
		logger.error('Failed to generate Supabase types: ' + error);
		throw error;
	}
}

// Create a single supabase client for interacting with your database
const supabase = createClient<Database>(Config.Supabase.URL, Config.Supabase.ANON_KEY, {
	auth: {
		persistSession: true,
		autoRefreshToken: true,
		detectSessionInUrl: false,
		storage: AsyncStorage,

	  },
	  db: {
		schema: 'public',

	  },
});

export { generateSupabaseTypes, supabase };
        