<script setup lang="ts">
import { columns } from '@/utils/TableColumns/ProjectsColumns.ts';

usePageStore().pageData.title = 'My Projects';

const projectLoader = useProjectsStore();
const { projects } = storeToRefs(projectLoader);
const { getProjects } = projectLoader;
await getProjects();

const { getGroupedCollabs, groupedCollabs } = useCollabs();
getGroupedCollabs(projects.value);

const columnsWithCollabs = columns(groupedCollabs);
</script>

<template>
    <DataTable v-if="projects" :columns="columnsWithCollabs" :data="projects" />
</template>
