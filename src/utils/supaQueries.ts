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

export const updateProjectQuery = (updatedProject = {}, id: number) => {
    return supabase.from('projects').update(updatedProject).eq('id', id);
};

export const taskQuery = (id: number) =>
    supabase
        .from('tasks')
        .select(
            `*, 
            projects(id, name
            )`
        )
        .eq('id', id)
        .single();

export type Task = QueryData<ReturnType<typeof taskQuery>>;

export const profileQuery = ({
    column,
    value,
}: {
    column: string;
    value: string;
}) => supabase.from('profiles').select('*').eq(column, value).single();

export const groupedProfilesQuery = (userIds: string[]) =>
    supabase
        .from('profiles')
        .select('username,avatar_url, id, full_name')
        .in('id', userIds);

export type Collabs = QueryData<ReturnType<typeof groupedProfilesQuery>>;
