import { type projects, projectsQuery } from '@/utils/supaQueries.ts';

export const useProjectsStore = defineStore('projects-store', () => {
    const projects = ref<projects | null>(null);

    const getProjects = async () => {
        if (projects.value?.length) return;

        const { data, error, status } = await projectsQuery;
        if (error) useErrorStore().setError({ error, customCode: status });

        projects.value = data;
    };

    return { projects, getProjects };
});
