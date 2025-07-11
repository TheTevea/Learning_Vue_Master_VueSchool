<script setup lang="ts">
const value = defineModel();
const props = withDefaults(defineProps<{ elementType: string }>(), {
    inputType: 'input',
});
defineEmits(['commit', 'update:modelValue']);
</script>

<template>
    <component
        :is="props.elementType"
        :value="value"
        @input="(event) => $emit('update:modelValue', event.target.value)"
        :type="props.elementType === 'input' ? 'text' : undefined"
        :class="[
            'w-full p-1 bg-transparent focus:outline-none focus:border-none focus:bg-gray-800 focus:rounded-md',
            props.elementType === 'textarea' ? 'resize-none' : '',
        ]"
        @blur="$emit('commit', value)"
        @keyup.enter="$event.target.blur()"
    />
</template>

<!--'w-full p-1 bg-transparent focus:outline-none focus:border-none focus:bg-gray-800 focus:rounded-md'-->
