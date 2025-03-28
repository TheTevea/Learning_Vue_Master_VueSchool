<script setup lang="ts">
import { columns } from '@/utils/TableColumns/TasksColumns.ts';
import {
    type tasksWithProjects,
    tasksWithProjectsQuery,
} from '@/utils/supaQueries.ts';

usePageStore().pageData.title = 'My Tasks';

const tasks = ref<tasksWithProjects | null>(null);

const fetchTasks = async () => {
    const { data, error, status } = await tasksWithProjectsQuery;
    if (error) useErrorStore().setError({ error, customCode: status });

    tasks.value = data;
};

await fetchTasks();
</script>

<template>
    <DataTable v-if="tasks" :columns="columns" :data="tasks" />
</template>
