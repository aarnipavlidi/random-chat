import type { Database } from '@/types/supabase';
import { createClient } from '@supabase/supabase-js';

const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseURL || !supabaseKEY) {
  throw new Error('Missing env variables! :(');
}

const supabase = createClient<Database>(supabaseURL, supabaseKEY);

export default supabase;
