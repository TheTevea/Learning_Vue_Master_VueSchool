<script setup lang="ts">
import { columns } from '@/utils/TableColumns/ProjectsColumns.ts';
import { useCollabs } from '@/composables/collabs.ts';

usePageStore().pageData.title = 'My Projects';

const projectLoader = useProjectsStore();
const { projects } = storeToRefs(projectLoader);
const { getProjects } = projectLoader;

await getProjects();

const { getProfilesByIds } = useCollabs();
const test = await getProfilesByIds(projects.value[0].collaborators);

console.log('test', test);
</script>

<template>
    <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>
