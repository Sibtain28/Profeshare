import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://pomosetdudblqbvolnla.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvbW9zZXRkdWRibHFidm9sbmxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MDczNjEsImV4cCI6MjA2NTQ4MzM2MX0.jK1odW1woORcpADsvGWW8vSHO6xmbWIuDjd4Jul_rQM";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY); 