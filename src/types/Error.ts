import { PostgrestError } from '@supabase/postgrest-js';

export interface CustomError extends Error {
    customCode?: number;
    statusCode?: number;
}

export interface ExtendedPostgrestError extends PostgrestError {
    statusCode?: number;
}
