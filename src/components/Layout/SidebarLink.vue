<script setup lang="ts">
interface LinkProps {
    to?: string;
    title: string;
    icon: string;
}

defineProps<{
    links: LinkProps[];
}>();

const emits = defineEmits<{
    actionClicked: [string];
}>();

const emitActionClicked = (LinkTitle: string) => {
    emits('actionClicked', LinkTitle);
};
</script>
<template>
    <template v-for="link in links" :key="link.title">
        <RouterLink
            v-if="link.to"
            exact-active-class="text-primary bg-muted"
            :to="link.to"
            class="flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary justify-center lg:justify-normal text-muted-foreground"
        >
            <iconify-icon :icon="link.icon"></iconify-icon>
            <span class="hidden lg:block text-nowrap">{{ link.title }}</span>
        </RouterLink>
        <div
            v-else
            class="flex items-center gap-3 px-4 py-2 mx-2 cursor-pointer transition-colors rounded-lg hover:text-primary justify-center lg:justify-normal text-muted-foreground"
            @click="emitActionClicked(link.title)"
        >
            <iconify-icon :icon="link.icon"></iconify-icon>
            <span class="hidden lg:block text-nowrap">{{ link.title }}</span>
        </div>
    </template>
</template>
