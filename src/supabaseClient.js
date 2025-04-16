import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lsbwfoqwbvijjkkriphw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzYndmb3F3YnZpampra3JpcGh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MzE2MzcsImV4cCI6MjA2MDQwNzYzN30.gzj37K6hZ8COqJSQUyse9fASjBIkTOI7cpvPh9PMOdo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
