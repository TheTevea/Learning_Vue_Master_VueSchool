<script setup lang="ts">
const sheetOpen = defineModel<boolean>();
</script>
<template>
    <Sheet v-model:open="sheetOpen">
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Create new task</SheetTitle>
                <FormKit
                    type="text"
                    name="taskName"
                    label="Task Name"
                    placeholder="Enter task name"
                />
            </SheetHeader>
        </SheetContent>
    </Sheet>
</template>
