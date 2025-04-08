<script setup lang="ts">
import { columns } from '@/utils/TableColumns/ProjectsColumns.ts';

usePageStore().pageData.title = 'My Projects';

const projectLoader = useProjectsStore();
const { projects } = storeToRefs(projectLoader);
const { getProjects } = projectLoader;

await getProjects();

const { getGroupedCollabs, groupedCollabs } = useCollabs();

await getGroupedCollabs(projects.value);

console.log('groupedCollabs', groupedCollabs.value);
</script>

<template>
    <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>
