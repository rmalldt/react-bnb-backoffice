import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.VITE_SUPABASE_URL': JSON.stringify(
      process.env.VITE_SUPABASE_URL
    ),
    'process.env.VITE_SUPABASE_STORAGE_URL': JSON.stringify(
      process.env.VITE_SUPABASE_STORAGE_URL
    ),
    'process.env.VITE_SUPABASE_KEY': JSON.stringify(
      process.env.VITE_SUPABASE_KEY
    ),
  },
});
