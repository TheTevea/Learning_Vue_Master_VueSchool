import { groupedProfilesQuery } from '@/utils/supaQueries.ts';

export const useCollabs = () => {
    const getProfilesByIds = async (userIds: string[]) => {
        const { data, error } = await groupedProfilesQuery(userIds);

        if (error || !data) return [];

        return data;
    };
    return { getProfilesByIds };
};
