// Environment configuration for Supabase
// These values are loaded from .env files at build time

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://nrzycbxdgzuyyyhorbhs.supabase.co';
export const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yenljYnhkZ3p1eXl5aG9yYmhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2NDkyMzMsImV4cCI6MjA5NjIyNTIzM30.lelLb7fV2MC6z5xIu1Y0TU43Hhn0Go3h9yI-uz7_m9E';
export const supabaseFunctionUrl = import.meta.env.VITE_SUPABASE_FUNCTION_URL || 'https://nrzycbxdgzuyyyhorbhs.supabase.co/functions/v1/make-server-c776dae1';

// Deprecated: Use supabaseUrl and supabaseAnonKey instead
export const projectId = supabaseUrl.split('.')[0].split('//')[1] || 'nrzycbxdgzuyyyhorbhs';
export const publicAnonKey = supabaseAnonKey;