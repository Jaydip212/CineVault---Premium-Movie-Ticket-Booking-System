/*=============================================
=            Supabase Configuration           =
=============================================*/
// 👇 YAHAN APNE SUPABASE PROJECT KE KEYS DAALEN 👇
// 1. Supabase me login karein: https://database.new/
// 2. Project settings > API me jayen.
// 3. Wahan se 'Project URL' aur 'anon public' key copy karein.
const SUPABASE_URL = 'https://jpjiryffftvglkyldmnv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpwamlyeWZmZnR2Z2xreWxkbW52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0MjgxMTUsImV4cCI6MjA4OTAwNDExNX0.K5pUKHyLwVB4gsqHZA2NkYY1irqozAJqg6mKG97gQDM';
// 👆 -------------------------------------- 👆

// Import Supabase Client from CDN for simple browser usage
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Create a single supabase client for interacting with your database
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Mock data fallback configuration flag
export const USE_MOCK_DATA = SUPABASE_URL === 'YOUR_SUPABASE_URL';

// Log status
if(USE_MOCK_DATA) {
    console.warn("Supabase Config not set! App will use local mock data for demonstration purposes. To connect to DB, update SUPABASE_URL in js/supabase.js");
}
