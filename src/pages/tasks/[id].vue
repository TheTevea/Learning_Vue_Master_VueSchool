<script setup lang="ts">
import { taskQuery } from '@/utils/supaQueries.js';
import { type Task } from '@/utils/supaQueries.js';

const task = ref<Task | null>(null);
const { id } = useRoute('/tasks/[id]').params;

watch(
    () => task.value?.name,
    () => {
        usePageStore().pageData.title = `Task [ ${task.value?.name || ''} ]`;
    }
);
const fetchTask = async () => {
    const { data, error, status } = await taskQuery(Number(id));
    if (error) useErrorStore().setError({ error, customCode: status });

    task.value = data;
};

await fetchTask();
</script>

<template>
    <Table v-if="task">
        <TableRow>
            <TableHead> Name </TableHead>
            <TableCell class="capitalize"> {{ task.name }} </TableCell>
        </TableRow>
        <TableRow>
            <TableHead> Description </TableHead>
            <TableCell> {{ task.description }}</TableCell>
        </TableRow>
        <TableRow>
            <TableHead> Assignee </TableHead>
            <TableCell>Lorem ipsum</TableCell>
        </TableRow>
        <TableRow>
            <TableHead> Project </TableHead>
            <TableCell class="capitalize">
                {{ task.projects?.name }}
            </TableCell>
        </TableRow>
        <TableRow>
            <TableHead> Status </TableHead>
            <TableCell>{{ task.status }}</TableCell>
        </TableRow>
        <TableRow>
            <TableHead> Collaborators </TableHead>
            <TableCell>
                <div class="flex">
                    <Avatar
                        class="-mr-4 border border-primary hover:scale-110 transition-transform"
                        v-for="collaborator in task.collaborators"
                        :key="collaborator"
                    >
                        <RouterLink
                            class="w-full h-full flex items-center justify-center"
                            to=""
                        >
                            <AvatarImage src="" alt="" />
                            <AvatarFallback> </AvatarFallback>
                        </RouterLink>
                    </Avatar>
                </div>
            </TableCell>
        </TableRow>
        <TableRow class="hover:bg-transparent">
            <TableHead class="align-top pt-4"> Comments </TableHead>

            <TableCell>
                Comments cards goes in here..

                <div
                    class="flex flex-col justify-between p-3 bg-muted my-2 rounded-md"
                >
                    <textarea
                        placeholder="Add your comment.."
                        class="w-full max-w-full overflow-y-auto prose-sm prose border rounded dark:prose-invert hover:border-muted bg-background border-muted p-3"
                    >
                    </textarea>
                    <div class="flex justify-between mt-3">
                        <Button> Comment </Button>
                        <div class="flex gap-4">
                            <button variant="ghost" @click.prevent>
                                <iconify-icon
                                    icon="lucide:paperclip"
                                ></iconify-icon>
                                <span class="sr-only">Attach file</span>
                            </button>
                            <button variant="ghost" @click.prevent>
                                <iconify-icon
                                    icon="lucide:image-up"
                                ></iconify-icon>

                                <span class="sr-only">Upload image</span>
                            </button>
                        </div>
                    </div>
                </div>
            </TableCell>
        </TableRow>
    </Table>
</template>
