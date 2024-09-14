import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xiedqspvezifeynobmjr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpZWRxc3B2ZXppZmV5bm9ibWpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYyNDAwNDIsImV4cCI6MjA0MTgxNjA0Mn0.OI5VXI08dsgiT780apqQ3uyYwj3nf7csfyHulbCUTnI";
export const supabase = createClient(supabaseUrl, supabaseKey);
