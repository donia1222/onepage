import { createClient } from '@supabase/supabase-js';

// Reemplaza estos valores con los que obtuviste en tu cuenta de Supabase.
const supabaseUrl = 'https://pssbqdfdmbiravvsvrad.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzc2JxZGZkbWJpcmF2dnN2cmFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzMTQ5NDUsImV4cCI6MjA1NTg5MDk0NX0.1Dzm2fHs58wfiA8oa__SuAp6Pnqg-TavvW3mYB7hFyw';

export const supabase = createClient(supabaseUrl, supabaseKey);
