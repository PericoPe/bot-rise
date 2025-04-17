import { supabase } from './supabaseClient';

export async function getCurrentUser() {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.user || null;
}

export async function requireAuth(navigate, from) {
  const user = await getCurrentUser();
  if (!user) {
    navigate('/login', { state: { from } });
    return false;
  }
  return true;
}
