import { createClient } from '@supabase/supabase-js';

// Reemplaza estos valores con los que obtuviste en tu cuenta de Supabase.
const supabaseUrl = '';
const supabaseKey = '';

export const supabase = createClient(supabaseUrl, supabaseKey);
