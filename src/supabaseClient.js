import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aumpxyqfwukrqvhziwbg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1bXB4eXFmd3VrcnF2aHppd2JnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4NTg5OTksImV4cCI6MjA2MDQzNDk5OX0.zMVO8Q6Z0mITmXZ0d_jW2K9UWO5nbPgl4TPAgCrP2RM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
