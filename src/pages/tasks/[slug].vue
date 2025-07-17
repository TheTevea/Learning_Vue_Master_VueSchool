<script setup lang="ts">
import { ref, watch } from 'vue';
import AppInPlaceEditText from '@/components/AppInPlaceEdit/AppInPlaceEditText.vue';
import { useTasksStore } from '@/stores/loaders/tasks.ts';
import { type Collabs } from '@/utils/supaQueries.ts';

const taskLoad = useTasksStore();
const { task } = storeToRefs(taskLoad);
const { getTask, updateTask, deleteTask } = taskLoad;
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

const isLoadingCollabs = ref(true);

watch(
    () => task.value?.collaborators,
    async (collaborators) => {
        isLoadingCollabs.value = true;
        if (collaborators && collaborators.length) {
            collabs.value = await getProfilesByIds(collaborators);
        } else {
            collabs.value = [];
        }
        isLoadingCollabs.value = false;
    },
    { immediate: true }
);

const isDeleteLoad = ref(false);

const router = useRouter();

const triggerDelete = async () => {
    isDeleteLoad.value = true;
    await deleteTask();
    isDeleteLoad.value = false;
    await router.push('/tasks');
};
</script>

<template>
    <div class="flex flex-col justify-center items-center">
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
                <TableCell class="py-0">
                    <div class="flex items-center h-20">
                        <template v-if="isLoadingCollabs">
                            <Avatar
                                v-for="(_, i) in task.collaborators"
                                :key="i"
                                class="-mr-4 w-12 h-12 animate-pulse"
                            >
                                <AvatarFallback />
                            </Avatar>
                        </template>
                        <template v-else>
                            <Avatar
                                v-for="collab in collabs"
                                :key="collab.id"
                                class="-mr-4 border border-primary w-12 h-12 hover:scale-110 transition-transform"
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
                                    <AvatarFallback />
                                </RouterLink>
                            </Avatar>
                        </template>
                    </div>
                </TableCell>
            </TableRow>
        </Table>
        <Button
            @click="triggerDelete"
            class="self-end mt-3 w-full max-w-40"
            variant="destructive"
        >
            <Transition name="scale" mode="out-in">
                <iconify-icon
                    v-if="isDeleteLoad"
                    icon="lucide:loader-circle"
                    class="mr-1 animate-spin"
                    width="22"
                    height="22"
                />
                <iconify-icon
                    v-else
                    icon="lucide:trash-2"
                    class="mr-1"
                    width="22"
                    height="22"
                />
            </Transition>
            Delete Task
        </Button>
    </div>
</template>

<style scoped>
th {
    @apply w-[100px];
}

h2 {
    @apply mb-4 text-lg font-semibold w-fit;
}

.table-container {
    @apply overflow-hidden overflow-y-auto rounded-md bg-slate-900 h-80;
}
</style>
