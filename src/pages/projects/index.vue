<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table';
import { RouterLink } from 'vue-router';
import { type projects, projectsQuery } from '@/utils/supaQueries.ts';

const projects = ref<projects | null>(null);

usePageStore().pageData.title = 'My Projects';
const fetchProjects = async () => {
    const { data, error } = await projectsQuery;
    if (error) console.log(error);

    projects.value = data;
};

await fetchProjects();

const columns: ColumnDef<projects[0]>[] = [
    {
        accessorKey: 'name',
        header: () => h('div', { class: 'text-left' }, 'Name'),
        cell: ({ row }) => {
            return h(
                RouterLink,
                {
                    to: `/projects/${row.original.slug}`,
                    class: 'text-left font-medium hover:bg-muted w-full block',
                },
                () => row.getValue('name')
            );
        },
    },
    {
        accessorKey: 'status',
        header: () => h('div', { class: 'text-left' }, 'Status'),
        cell: ({ row }) => {
            return h(
                'div',
                { class: 'text-left font-medium' },
                row.getValue('status')
            );
        },
    },

    {
        accessorKey: 'collaborators',
        header: () => h('div', { class: 'text-left' }, 'Collaborators'),
        cell: ({ row }) => {
            return h(
                'div',
                { class: 'text-left font-medium' },
                JSON.stringify(row.getValue('collaborators'))
            );
        },
    },
];
</script>

<template>
    <DataTable v-if="projects" :columns="columns" :data="projects"> </DataTable>
</template>
