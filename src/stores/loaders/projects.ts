import { type projects, projectsQuery } from '@/utils/supaQueries.ts';
import { useMemoize } from '@vueuse/core';

export const useProjectsStore = defineStore('projects-store', () => {
    const projects = ref<projects | null>(null);
    const loadProject = useMemoize(async () => await projectsQuery);

    const validateCache = () => {
        if (projects.value?.length) {
            projectsQuery.then(({ data }) => {
                if (JSON.stringify(projects.value) === JSON.stringify(data)) {
                    console.log('cached and fresh data matched');
                } else {
                    console.log('cached and fresh data not matched');
                    loadProject.delete();
                }
            });
        }
    };

    const getProjects = async () => {
        const { data, error, status } = await loadProject();
        if (error) useErrorStore().setError({ error, customCode: status });

        projects.value = data;

        validateCache();
    };

    return { projects, getProjects };
});
