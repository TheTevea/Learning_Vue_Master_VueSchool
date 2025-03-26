import { RouterLink } from 'vue-router';
import type { ColumnDef } from '@tanstack/vue-table';

export const columns: ColumnDef<projects[0]>[] = [
    {
        accessorKey: 'name',
        header: () => h('div', { class: 'text-left' }, 'Name'),
        cell: ({ row }) => {
            return h(
                RouterLink,
                {
                    to: `/projects/${row.original.slug}`,
                    class: 'text-left capitalize font-medium hover:bg-muted w-full block',
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
