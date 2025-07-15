<script setup lang="ts">
import { columns } from '@/utils/TableColumns/TasksColumns.ts';

const taskLoader = useTasksStore();
const { tasks } = storeToRefs(taskLoader);
const { getTasks } = taskLoader;

usePageStore().pageData.title = 'My Tasks';

await getTasks();

const { getGroupedCollabs, groupedCollabs } = useCollabs();
getGroupedCollabs(tasks.value ?? []);

const columnsWithCollabs = columns(groupedCollabs);
</script>

<template>
    <DataTable v-if="tasks" :columns="columnsWithCollabs" :data="tasks" />
</template>
