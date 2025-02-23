import { createClient } from '@supabase/supabase-js';


// Para depurar, muestra qué variables están disponibles:
console.log("import.meta.env:", import.meta.env);

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Faltan las variables de entorno de Supabase");
}



export const supabase = createClient(supabaseUrl, supabaseKey);
