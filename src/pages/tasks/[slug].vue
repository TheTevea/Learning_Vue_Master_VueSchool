<script setup lang="ts">
import { ref, watch } from 'vue';
import AppInPlaceEditText from '@/components/AppInPlaceEdit/AppInPlaceEditText.vue';
import { useTasksStore } from '@/stores/loaders/tasks.ts';
import type { Collabs } from '@/utils/supaQueries.ts';

const taskLoad = useTasksStore();
const { task } = storeToRefs(taskLoad);
const { getTask, updateTask } = taskLoad;
const { slug } = useRoute('/tasks/[slug]').params;

watch(
    () => task.value?.name,
    () => {
        usePageStore().pageData.title = `Task [ ${task.value?.name || ''} ]`;
    }
);

await getTask(slug);

const { getProfilesByIds } = useCollabs();
const collabs = ref<Collabs>([]);

watch(
    () => task.value?.collaborators,
    async (collaborators) => {
        if (collaborators && collaborators.length) {
            collabs.value = await getProfilesByIds(collaborators);
        } else {
            collabs.value = [];
        }
    },
    { immediate: true }
);
</script>

<template>
    <Table v-if="task">
        <TableRow>
            <TableHead> Name </TableHead>
            <TableCell class="capitalize">
                <AppInPlaceEditText
                    v-model="task.name"
                    @commit="updateTask"
                    element-type="input"
                />
            </TableCell>
        </TableRow>
        <TableRow>
            <TableHead> Description </TableHead>
            <TableCell>
                <AppInPlaceEditText
                    v-model="task.description"
                    @commit="updateTask"
                    element-type="textarea"
            /></TableCell>
        </TableRow>
        <TableRow>
            <TableHead> Due Date </TableHead>
            <TableCell> {{ task.due_date }}</TableCell>
        </TableRow>
        <TableRow>
            <TableHead> Project </TableHead>
            <TableCell class="capitalize">
                {{ task.projects?.name }}
            </TableCell>
        </TableRow>
        <TableRow>
            <TableHead> Status </TableHead>
            <TableCell>
                <AppInPlaceEditStatus
                    v-model="task.status"
                    @commit="updateTask"
                />
            </TableCell>
        </TableRow>
        <TableRow>
            <TableHead> Collaborators </TableHead>
            <TableCell>
                <div class="flex">
                    <Avatar
                        v-for="collab in collabs"
                        class="-mr-4 border border-primary hover:scale-110 transition-transform"
                        :key="collab.id"
                    >
                        <RouterLink
                            class="w-full h-full flex items-center justify-center"
                            :to="{
                                name: '/users/[username]',
                                params: { username: collab.username },
                            }"
                        >
                            <AvatarImage
                                :src="collab.avatar_url || ''"
                                :alt="collab.username + 'profile'"
                            />
                            <AvatarFallback> </AvatarFallback>
                        </RouterLink>
                    </Avatar>
                </div>
            </TableCell>
        </TableRow>
    </Table>
</template>
