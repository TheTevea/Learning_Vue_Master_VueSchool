<script setup lang="ts">
const value = defineModel();

const emit = defineEmits(['commit']);

const { readonly = false } = defineProps<{
    readonly?: boolean;
}>();

const toggleStatus = () => {
    if (readonly) return;
    value.value = value.value === 'completed' ? 'in-progress' : 'completed';
    emit('commit');
};
</script>

<template>
    <div
        :class="['text-2xl', !readonly && 'cursor-pointer']"
        @click="toggleStatus"
    >
        <Transition mode="out-in">
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
        </Transition>
    </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: transform 0.1s;
}

.v-enter-from,
.v-leave-to {
    transform: scale(0.3);
}
</style>
