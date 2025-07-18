<script setup lang="ts">
import AppInPlaceEditText from '@/components/AppInPlaceEdit/AppInPlaceEditText.vue';

const projectLoad = useProjectsStore();
const { project } = storeToRefs(projectLoad);
const { getProject, updateProject } = projectLoad;
const slug = useRoute('/projects/[slug]').params.slug;

watch(
    () => project.value?.name,
    () => {
        usePageStore().pageData.title = `Project [ ${project.value?.name || ''} ]`;
    }
);

await getProject(slug);

const { getProfilesByIds } = useCollabs();
const collabs = project.value?.collaborators
    ? await getProfilesByIds(project.value?.collaborators)
    : [];
</script>
<template>
    <div>
        <Table v-if="project">
            <TableRow>
                <TableHead> Name </TableHead>
                <TableCell class="capitalize">
                    <AppInPlaceEditText
                        v-model="project.name"
                        @commit="updateProject"
                        element-type="input"
                    />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableHead> Description </TableHead>
                <TableCell>
                    <AppInPlaceEditText
                        element-type="textarea"
                        v-model="project.description"
                        @commit="updateProject"
                    />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableHead> Status </TableHead>
                <TableCell>
                    <AppInPlaceEditStatus
                        v-model="project.status"
                        @commit="updateProject"
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

        <section
            class="mt-10 flex flex-col md:flex-row gap-5 justify-between grow"
        >
            <div class="flex-1">
                <h2>Tasks</h2>
                <div class="table-container">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead> Name </TableHead>
                                <TableHead> Status </TableHead>
                                <TableHead> Due Date </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow
                                v-for="task in project?.tasks"
                                :key="task.id"
                            >
                                <TableCell class="capitalize p-0">
                                    <RouterLink
                                        :to="'/tasks/' + task.id"
                                        class="text-left block hover:bg-muted p-4"
                                        >{{ task.name }}</RouterLink
                                    >
                                </TableCell>
                                <TableCell> {{ task.status }} </TableCell>
                                <TableCell> {{ task.due_date }} </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
            <div class="flex-1">
                <h2>Documents</h2>
                <div class="table-container">
                    <p
                        class="text-muted-foreground text-sm font-semibold px-4 py-3"
                    >
                        This project doesn't have documents yet...
                    </p>
                    <!-- <Table>
              <TableHeader>
                <TableRow>
                  <TableHead> Name </TableHead>
                  <TableHead> Visibility </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell> Lorem ipsum dolor sit amet. </TableCell>
                  <TableCell> Private </TableCell>
                </TableRow>
              </TableBody>
            </Table> -->
                </div>
            </div>
        </section>
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
