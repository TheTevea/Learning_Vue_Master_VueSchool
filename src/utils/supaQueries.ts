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

export const projectQuery = (slug: string) =>
    supabase
        .from('projects')
        .select(
            `*, 
            tasks(id, name, status,
                due_date
            )`
        )
        .eq('slug', slug)
        .single();

export type Project = QueryData<ReturnType<typeof projectQuery>>;
