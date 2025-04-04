import { type projects, projectsQuery } from '@/utils/supaQueries.ts';
import { useMemoize } from '@vueuse/core';

export const useProjectsStore = defineStore('projects-store', () => {
    const projects = ref<projects>([]);
    const loadProject = useMemoize(async () => await projectsQuery);

    const validateCache = () => {
        if (projects.value?.length) {
            projectsQuery.then(({ data, error }) => {
                if (JSON.stringify(projects.value) === JSON.stringify(data)) {
                    return;
                } else {
                    loadProject.delete();
                    if (!error && data) projects.value = data;
                }
            });
        }
    };

    const getProjects = async () => {
        const { data, error, status } = await loadProject();
        if (error) useErrorStore().setError({ error, customCode: status });

        data && (projects.value = data);

        validateCache();
    };

    return { projects, getProjects };
});
