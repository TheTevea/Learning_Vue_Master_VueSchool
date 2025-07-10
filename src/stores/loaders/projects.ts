import { projectQuery, projectsQuery } from '@/utils/supaQueries.ts';
import { useMemoize } from '@vueuse/core';
import type { Project, projects } from '@/utils/supaQueries.js';

export const useProjectsStore = defineStore('projects-store', () => {
    const projects = ref<projects | null>(null);
    const project = ref<Project | null>(null);
    const loadProjects = useMemoize(async (key: string) => await projectsQuery);
    const loadProject = useMemoize(
        async (slug: string) => await projectQuery(slug)
    );

    interface validateCacheParams {
        ref: typeof projects | typeof project;
        query: typeof projectsQuery | typeof projectQuery;
        key: string;
        loadFn: typeof loadProject | typeof loadProjects;
    }

    const validateCache = ({
        ref,
        query,
        key,
        loadFn,
    }: validateCacheParams) => {
        if (ref.value) {
            const finalQuery = query instanceof Function ? query(key) : query;
            finalQuery.then(({ data, error }) => {
                if (JSON.stringify(ref.value) === JSON.stringify(data)) {
                    return;
                } else {
                    loadFn.delete(key);
                    if (!error && data) ref.value = data;
                }
            });
        }
    };

    const getProjects = async () => {
        const { data, error, status } = await loadProjects('projects');
        if (error) useErrorStore().setError({ error, customCode: status });

        data && (projects.value = data);

        validateCache({
            ref: projects,
            query: projectsQuery,
            key: 'projects',
            loadFn: loadProjects,
        });
    };

    const getProject = async (slug: string) => {
        const { data, error, status } = await loadProject(slug);
        if (error) useErrorStore().setError({ error, customCode: status });

        data && (project.value = data);

        validateCache({
            ref: project,
            query: projectQuery,
            key: slug,
            loadFn: loadProject,
        });
    };

    return { projects, getProjects, getProject, project };
});
