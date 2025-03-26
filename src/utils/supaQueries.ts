import { supabase } from '@/lip/supabaseClient.ts';
import type { QueryData } from '@supabase/supabase-js';

export const tasksWithProjectsQuery = supabase.from('tasks').select(`*,
    projects(
      id,
      name,
      slug
    )
    `);

export type tasksWithProjects = QueryData<typeof tasksWithProjectsQuery>;

export const projectsQuery = supabase.from('projects').select('*');

export type projects = QueryData<typeof projectsQuery>;
