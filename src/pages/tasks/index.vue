<script setup lang="ts">
import { columns } from '@/utils/TableColumns/TasksColumns.ts';
import { useMeta } from 'vue-meta';

const taskLoader = useTasksStore();
const { tasks } = storeToRefs(taskLoader);
const { getTasks } = taskLoader;

usePageStore().pageData.title = 'My Tasks';

await getTasks();

const { getGroupedCollabs, groupedCollabs } = useCollabs();
getGroupedCollabs(tasks.value ?? []);

const columnsWithCollabs = columns(groupedCollabs);

useMeta({
    title: 'Project | Pulse',
    description: {
        name: 'description',
        content:
            'Project management tool that helps you organize your work and tasks.',
    },
});
</script>

<template>
    <div>
        <DataTable v-if="tasks" :columns="columnsWithCollabs" :data="tasks" />
    </div>
</template>
