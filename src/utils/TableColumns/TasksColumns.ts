import { RouterLink } from 'vue-router';
import type { ColumnDef } from '@tanstack/vue-table';
import AppInPlaceEditStatus from '@/components/AppInPlaceEdit/AppInPlaceEditStatus.vue';
import type { Ref } from 'vue';
import type { GroupedCollabs } from '@/types/GroupedCollabs.ts';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { tasksWithProjects } from '@/utils/supaQueries.ts';

export const columns = (
    collabs: Ref<GroupedCollabs>
): ColumnDef<tasksWithProjects[0]>[] => [
    {
        accessorKey: 'name',
        header: () => h('div', { class: 'text-left' }, 'Name'),
        cell: ({ row }) => {
            return h(
                RouterLink,
                {
                    to: `/tasks/${row.original.slug}`,
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
                h(AppInPlaceEditStatus, {
                    modelValue: row.original.status,
                    readonly: true,
                })
            );
        },
    },
    {
        accessorKey: 'due_date',
        header: () => h('div', { class: 'text-left' }, 'Due Date'),
        cell: ({ row }) => {
            return h(
                'div',
                { class: 'text-left font-medium' },
                row.getValue('due_date')
            );
        },
    },
    {
        accessorKey: 'projects',
        header: () => h('div', { class: 'text-left' }, 'Projects'),
        cell: ({ row }) => {
            return row.original.projects
                ? h(
                      RouterLink,
                      {
                          to: `/projects/${row.original.projects.slug}`,
                          class: 'text-left font-medium hover:bg-muted w-full block',
                      },
                      () => row.original.projects?.name
                  )
                : '';
        },
    },
    {
        accessorKey: 'collaborators',
        header: () => h('div', { class: 'text-left' }, 'Collaborators'),
        cell: ({ row }) => {
            return h(
                'div',
                { class: 'text-left font-medium' },
                collabs.value[row.original.id]
                    ? collabs.value[row.original.id].map((collab) => {
                          return h(
                              RouterLink,
                              {
                                  to: `/users/${collab.username}`,
                              },
                              () => {
                                  return h(
                                      Avatar,
                                      { class: 'hover:scale-110' },
                                      () =>
                                          h(AvatarImage, {
                                              src: collab.avatar_url || '',
                                              alt: collab.username,
                                          })
                                  );
                              }
                          );
                      })
                    : row.original.collaborators.map(() => {
                          return h(Avatar, { class: 'animate-pulse' }, () =>
                              h(AvatarFallback, () => '')
                          );
                      })
            );
        },
    },
];
