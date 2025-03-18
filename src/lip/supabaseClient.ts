import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhsYnNwemhibXN2cXB3ZmN3ZW11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxNzMyODgsImV4cCI6MjA1Nzc0OTI4OH0.ujSoODudwUyOZ-w0xEFqxppNV06gZpRof-fALV_SEpk'
);
