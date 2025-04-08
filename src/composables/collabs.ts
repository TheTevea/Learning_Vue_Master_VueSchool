import { groupedProfilesQuery } from '@/utils/supaQueries.ts';
import type { projects, tasksWithProjects } from '@/utils/supaQueries.ts';
import type { GroupedCollabs } from '@/types/GroupedCollabs.ts';

export const useCollabs = () => {
    const groupedCollabs = ref<GroupedCollabs>({});

    const getProfilesByIds = async (userIds: string[]) => {
        const { data, error } = await groupedProfilesQuery(userIds);

        if (error || !data) return [];

        return data;
    };

    const getGroupedCollabs = async (items: projects | tasksWithProjects) => {
        const filteredItems = items.filter((item) => item.collaborators.length);
        const promise = filteredItems.map((item) =>
            getProfilesByIds(item.collaborators)
        );

        const results = await Promise.all(promise);

        filteredItems.forEach((item, index) => {
            groupedCollabs.value[item.id] = results[index];
        });
    };
    return { getProfilesByIds, getGroupedCollabs, groupedCollabs };
};
