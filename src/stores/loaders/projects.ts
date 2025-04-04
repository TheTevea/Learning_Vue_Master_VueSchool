import { type projects, projectsQuery } from '@/utils/supaQueries.ts';
import { useMemoize } from '@vueuse/core';

export const useProjectsStore = defineStore('projects-store', () => {
    const projects = ref<projects | null>(null);
    const loadProject = useMemoize(async () => await projectsQuery);

    const getProjects = async () => {
        const { data, error, status } = await loadProject();
        if (error) useErrorStore().setError({ error, customCode: status });

        projects.value = data;
    };

    return { projects, getProjects };
});
