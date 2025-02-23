import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Credenciales del administrador
const ADMIN_USERNAME = 'nina';
const ADMIN_PASSWORD = 'BrunoHania2025';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Test the connection and log the result
supabase.from('orders').select('count').single()
  .then(({ error }) => {
    if (error) {
      console.error('Supabase connection error:', error);
    } else {
      console.log('✅ Supabase connection successful');
    }
  });

// Función para verificar si un usuario es administrador
export const isAdmin = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.user?.user_metadata?.username === ADMIN_USERNAME;
};