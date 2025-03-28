<script setup lang="ts">
import { columns } from '@/utils/TableColumns/ProjectsColumns.ts';
import { type projects, projectsQuery } from '@/utils/supaQueries.ts';

const projects = ref<projects | null>(null);

usePageStore().pageData.title = 'My Projects';
const fetchProjects = async () => {
    const { data, error, status } = await projectsQuery;
    if (error) useErrorStore().setError({ error, customCode: status });

    projects.value = data;
};

await fetchProjects();
</script>

<template>
    <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>
