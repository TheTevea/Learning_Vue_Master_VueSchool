<script setup lang="ts">
import type { CreateNewTask } from '@/types/CreateNewForm.ts';
import {
    createNewTaskQuery,
    profilesQuery,
    projectsQuery,
} from '@/utils/supaQueries.ts';

const sheetOpen = defineModel<boolean>();

type SelectOption = {
    label: string;
    value: number | string;
};

const selectOptions = ref({
    projects: [] as SelectOption[],
    profiles: [] as SelectOption[],
});

const getProjectsOption = async () => {
    const { data: allProjects } = await projectsQuery;

    if (!allProjects) return;

    allProjects.forEach((project) => {
        selectOptions.value.projects.push({
            label: project.name,
            value: project.id,
        });
    });
};

const getProfilesOption = async () => {
    const { data: allProfiles } = await profilesQuery;

    if (!allProfiles) return;

    allProfiles.forEach((profile) => {
        selectOptions.value.profiles.push({
            label: profile.full_name,
            value: profile.id,
        });
    });
};

const getOptions = async () => {
    await Promise.all([getProjectsOption(), getProfilesOption()]);
};

getOptions();

const { profile } = storeToRefs(useAuthStore());

const createTask = async (formData: CreateNewTask) => {
    const task = {
        ...formData,
        slug: formData.name.toLocaleLowerCase().replace(/ /g, '-'),
        collaborators: [profile.value!.id],
    };

    const { error } = await createNewTaskQuery(task);

    if (error) {
        console.error('Error creating task:', error);
        return;
    }
    sheetOpen.value = false;
};
</script>
<template>
    <Sheet v-model:open="sheetOpen">
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Create a new task</SheetTitle>
            </SheetHeader>
            <FormKit
                type="form"
                @submit="createTask"
                submit-label="Create a new task"
                :config="{
                    validationVisibility: 'submit',
                }"
            >
                <FormKit
                    type="text"
                    name="name"
                    id="name"
                    lable="Name"
                    placeholder="Enter a name"
                    validation="required|length:1,255"
                />
                <FormKit
                    type="select"
                    name="profile_id"
                    id="profile_id"
                    lable="User"
                    placeholder="Select a user"
                    :options="selectOptions.profiles"
                    validation="required"
                />
                <FormKit
                    type="select"
                    name="project_id"
                    id="project_id"
                    lable="Project"
                    placeholder="Select a project"
                    :options="selectOptions.projects"
                    validation="required"
                />
                <FormKit
                    type="textarea"
                    name="description"
                    id="description"
                    label="Description"
                    placeholder="Enter description"
                    validation="required|length:1,500"
                />
            </FormKit>
        </SheetContent>
    </Sheet>
</template>
