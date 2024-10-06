import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL = 'https://iwhwerbzmyehrzdrmikr.supabase.co';
export const SUPABASE_STORAGE_URL = `${SUPABASE_URL}/storage/v1/object/public`;

const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3aHdlcmJ6bXllaHJ6ZHJtaWtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc0MjI1MzQsImV4cCI6MjA0Mjk5ODUzNH0.4V15NxInNWEZefdK1_rlD6AecaOtDCvjupEH5HMKMyc';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;
