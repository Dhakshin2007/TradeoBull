import { createClient } from '@supabase/supabase-js';

// --- INSTRUCTIONS TO ENABLE CLOUD SYNC ---
// 1. Create a project at https://supabase.com
// 2. Go to the SQL Editor and run:
//    create table profiles ( id text primary key, data jsonb );
//    ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
//    CREATE POLICY "Public profiles access" ON profiles FOR ALL USING (true) WITH CHECK (true);
// 3. Go to Project Settings -> API. Copy the URL and ANON KEY.
// 4. Paste them below.

// Updated with provided credentials to fix "Offline Mode"
const SUPABASE_URL = "https://boqpztvbzoxejeqynbcq.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvcXB6dHZiem94ZWplcXluYmNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyODY1NDcsImV4cCI6MjA4MDg2MjU0N30.qdeYU3-tw1HEBX4opGJd0YmH6m5SvwBOnrwSu2fUmpo";

export const supabase = (SUPABASE_URL && SUPABASE_ANON_KEY) 
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) 
  : null;