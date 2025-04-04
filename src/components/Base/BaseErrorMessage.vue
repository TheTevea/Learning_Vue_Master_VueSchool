<script setup lang="ts">
const props = defineProps<{
    message?: string | string[];
}>();

const normalizedErrors = computed(() => {
    if (!props.message) return [];
    return Array.isArray(props.message) ? props.message : [props.message];
});
</script>

<template>
    <ul v-if="normalizedErrors?.length" class="text-sm text-red-500 text-left">
        <li v-for="error in normalizedErrors" :key="error">
            ⚠️ <span>{{ error }}</span>
        </li>
    </ul>
</template>
