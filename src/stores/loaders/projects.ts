import {
    projectQuery,
    projectsQuery,
    updateProjectQuery,
} from '@/utils/supaQueries.ts';
import { useMemoize } from '@vueuse/core';
import type { Project, projects } from '@/utils/supaQueries.js';
import { validateCache } from '@/utils/validateCache.ts';

export const useProjectsStore = defineStore('projects-store', () => {
    const projects = ref<projects | null>(null);
    const project = ref<Project | null>(null);
    const loadProjects = useMemoize(
        async (_key: string) => await projectsQuery
    );
    const loadProject = useMemoize(
        async (slug: string) => await projectQuery(slug)
    );

    const getProjects = async () => {
        projects.value = null;
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
        project.value = null;
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

    const updateProject = async () => {
        if (!project.value) return;

        const { tasks, id, ...projectProperties } = project.value;

        await updateProjectQuery(projectProperties, project.value.id);
    };

    return { projects, getProjects, getProject, project, updateProject };
});
