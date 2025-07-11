<script setup lang="ts">
const value = defineModel();
</script>

<template>
    <div>
        <iconify-icon
            v-if="value === 'completed'"
            icon="lucide:circle-check"
            class="text-green-500"
            width="22"
            height="22"
        />
        <iconify-icon
            v-else
            icon="lucide:circle-dot"
            class="text-gray-500"
            width="22"
            height="22"
        />
    </div>
</template>

<!--'w-full p-1 bg-transparent focus:outline-none focus:border-none focus:bg-gray-800 focus:rounded-md'-->
