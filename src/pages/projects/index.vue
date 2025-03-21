<script setup lang="ts">
import { supabase } from '@/lip/supabaseClient.ts';
import type { Tables } from '../../../database/types.ts';
import { h, ref } from 'vue';
import DataTable from '@/components/ui/data-table/DataTable.vue';
import type { ColumnDef } from '@tanstack/vue-table';
import { RouterLink } from 'vue-router';
const projects = ref<Tables<'projects'>[] | null>(null);

(async () => {
    const { data, error } = await supabase
        .from('projects')
        .select(
            'id, name, slug, status, created_at, collaborators, description'
        );
    if (error) console.log(error);

    projects.value = data;
})();

const columns: ColumnDef<Tables<'projects'>>[] = [
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
    <DataTable v-if="projects" :columns="columns" :data="projects">
        <template #cell-name="{ cell }">
            <RouterLink :to="`/projects/${cell.row.original.slug}`">
                {{ cell.getValue() }}
            </RouterLink>
        </template>
    </DataTable>
</template>
