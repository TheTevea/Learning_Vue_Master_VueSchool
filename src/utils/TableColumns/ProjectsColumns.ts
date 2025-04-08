import { RouterLink } from 'vue-router';
import type { ColumnDef } from '@tanstack/vue-table';
import type { projects } from '@/utils/supaQueries.ts';
import type { GroupedCollabs } from '@/types/GroupedCollabs.ts';
import type { Ref } from 'vue';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

export const columns = (
    collabs: Ref<GroupedCollabs>
): ColumnDef<projects[0]>[] => [
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
                collabs.value[row.original.id].map((collab) => {
                    return h(Avatar, () =>
                        h(AvatarImage, {
                            src: collab.avatar_url || '',
                            alt: collab.username,
                        })
                    );
                })
            );
        },
    },
];
