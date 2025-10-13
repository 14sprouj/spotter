
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Config } from './config';
import { Database } from '../types/supabase';

const supabaseUrl = Config.Supabase.URL
const supabaseKey = Config.Supabase.ANON_KEY

const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
	auth: {
		persistSession: true,
		autoRefreshToken: true,
		detectSessionInUrl: false,
		storage: AsyncStorage,
	  }
});

export default supabase;
        