import {
    deleteTaskQuery,
    type Task,
    taskQuery,
    type tasksWithProjects,
    tasksWithProjectsQuery,
    updateTaskQuery,
} from '@/utils/supaQueries.ts';
import { useMemoize } from '@vueuse/core';
import { validateCache } from '@/utils/validateCache.ts';

export const useTasksStore = defineStore('tasks-store', () => {
    const tasks = ref<tasksWithProjects | null>(null);
    const task = ref<Task | null>(null);

    const loadTasks = useMemoize(
        async (_key: string) => await tasksWithProjectsQuery
    );
    const loadTask = useMemoize(async (slug: string) => await taskQuery(slug));

    const getTasks = async () => {
        tasks.value = null;
        const { data, error, status } = await loadTasks('projects');
        if (error) useErrorStore().setError({ error, customCode: status });

        data && (tasks.value = data);

        validateCache({
            ref: tasks,
            query: tasksWithProjectsQuery,
            key: 'tasks',
            loadFn: loadTasks,
        });
    };

    const getTask = async (slug: string) => {
        task.value = null;
        const { data, error, status } = await loadTask(slug);
        if (error) useErrorStore().setError({ error, customCode: status });

        data && (task.value = data);

        validateCache({
            ref: task,
            query: taskQuery,
            key: slug,
            loadFn: loadTask,
        });
    };

    const updateTask = async () => {
        if (!task.value) return;

        const { projects, collaborators, id, ...taskProperties } = task.value;

        await updateTaskQuery(taskProperties, task.value.id);
    };

    const deleteTask = async () => {
        if (!task.value) return;

        await deleteTaskQuery(task.value.id);
    };

    return { tasks, task, getTasks, getTask, updateTask, deleteTask };
});
