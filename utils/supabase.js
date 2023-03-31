import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vahjckfdxuhncinxaahs.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhaGpja2ZkeHVobmNpbnhhYWhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzkxMDA0MjMsImV4cCI6MTk5NDY3NjQyM30.IdEmleJpB3NGnrnAmqkAxhhAZ77Fywc7gIeM3A7jTnk";
//const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
