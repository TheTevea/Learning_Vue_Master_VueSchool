import { projectQuery, projectsQuery } from '@/utils/supaQueries.ts';
import { useMemoize } from '@vueuse/core';
import type { Project, projects } from '@/utils/supaQueries.js';

export const useProjectsStore = defineStore('projects-store', () => {
    const projects = ref<projects>([]);
    const project = ref<Project>();
    const loadProjects = useMemoize(async () => await projectsQuery);
    const loadProject = useMemoize(
        async (slug: string) => await projectQuery(slug)
    );

    const validateCache = () => {
        if (projects.value?.length) {
            projectsQuery.then(({ data, error }) => {
                if (JSON.stringify(projects.value) === JSON.stringify(data)) {
                    return;
                } else {
                    loadProjects.delete();
                    if (!error && data) projects.value = data;
                }
            });
        }
    };

    const getProjects = async () => {
        const { data, error, status } = await loadProjects();
        if (error) useErrorStore().setError({ error, customCode: status });

        data && (projects.value = data);

        validateCache();
    };

    const getProject = async (slug: string) => {
        const { data, error, status } = await loadProject(slug);
        if (error) useErrorStore().setError({ error, customCode: status });

        data && (project.value = data);
    };

    return { projects, getProjects, getProject, project };
});
