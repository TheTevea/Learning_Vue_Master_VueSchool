import { RouterLink } from 'vue-router';
import type { ColumnDef } from '@tanstack/vue-table';
import type { projects } from '@/utils/supaQueries.ts';
import type { GroupedCollabs } from '@/types/GroupedCollabs.ts';
import type { Ref } from 'vue';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AppInPlaceEditStatus from '@/components/AppInPlaceEdit/AppInPlaceEditStatus.vue';

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
                h(AppInPlaceEditStatus, {
                    modelValue: row.original.status,
                    readonly: true,
                })
            );
        },
    },

    {
        accessorKey: 'collaborators',
        header: () => h('div', { class: 'text-left' }, 'Collaborators'),
        cell: ({ row }) => {
            return h(
                'div',
                { class: 'text-left font-medium h-20 flex items-center' },
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
                                      {
                                          class: 'hover:scale-110 transition-transform',
                                      },
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
