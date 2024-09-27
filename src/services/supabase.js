import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://iwhwerbzmyehrzdrmikr.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3aHdlcmJ6bXllaHJ6ZHJtaWtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc0MjI1MzQsImV4cCI6MjA0Mjk5ODUzNH0.4V15NxInNWEZefdK1_rlD6AecaOtDCvjupEH5HMKMyc';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
