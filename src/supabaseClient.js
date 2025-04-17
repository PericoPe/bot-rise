import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xomxdefqybnclzrfbbxd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhvbXhkZWZxeWJuY2x6cmZiYnhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4NDIzOTksImV4cCI6MjA2MDQxODM5OX0.dJlT47hasPqBq4sbQ7D0ZHdLbYvmTD927aPHBaBco5I';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
