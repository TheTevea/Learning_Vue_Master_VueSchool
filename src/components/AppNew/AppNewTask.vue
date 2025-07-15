<script setup lang="ts">
import type { CreateNewTask } from '@/types/CreateNewForm.ts';
import { profilesQuery, projectsQuery } from '@/utils/supaQueries.ts';

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

const createTask = async (formData: CreateNewTask) => {
    console.log(formData);
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
            >
                <FormKit
                    type="text"
                    name="name"
                    id="name"
                    lable="Name"
                    placeholder="Enter a name"
                />
                <FormKit
                    type="select"
                    name="user"
                    id="user"
                    lable="User"
                    placeholder="Select a user"
                    :options="selectOptions.profiles"
                />
                <FormKit
                    type="select"
                    name="project"
                    id="project"
                    lable="Project"
                    placeholder="Select a project"
                    :options="selectOptions.projects"
                />
                <FormKit
                    type="textarea"
                    name="description"
                    id="description"
                    label="Description"
                    placeholder="Enter description"
                    validation="required"
                />
            </FormKit>
        </SheetContent>
    </Sheet>
</template>
