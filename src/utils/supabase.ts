import { createClient } from '@supabase/supabase-js';

const supabaseURL = process.env.NODE_ENV === 'development'
  ? process.env.NEXT_PUBLIC_SUPABASE_URL
  : process.env.SUPABASE_URL;

const supabaseKEY = process.env.NODE_ENV === 'development'
  ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  : process.env.SUPABASE_ANON_KEY;

if (!supabaseURL || !supabaseKEY) {
  throw new Error('Missing env variables! :(');
}

const supabase = createClient(supabaseURL, supabaseKEY);

export default supabase;
