<script setup lang="ts">
const sheetOpen = defineModel<boolean>();
</script>
<template>
    <Sheet v-model:open="sheetOpen">
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Create new task</SheetTitle>
                <SheetDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                </SheetDescription>
            </SheetHeader>
        </SheetContent>
    </Sheet>
</template>
