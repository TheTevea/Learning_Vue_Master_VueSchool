<script setup lang="ts">
import { useMenu } from '@/composables/menu.ts';

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

const { menuOpen } = useMenu();
</script>
<template>
    <template v-for="link in links" :key="link.title">
        <RouterLink
            v-if="link.to"
            exact-active-class="text-primary bg-muted"
            :to="link.to"
            class="flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary text-muted-foreground"
            :class="menuOpen ? 'justify-normal' : 'justify-center'"
        >
            <iconify-icon :icon="link.icon"></iconify-icon>
            <span class="text-nowrap" :class="menuOpen ? 'block' : 'hidden'">{{
                link.title
            }}</span>
        </RouterLink>
        <div
            v-else
            class="flex items-center gap-3 px-4 py-2 mx-2 cursor-pointer transition-colors rounded-lg hover:text-primary text-muted-foreground"
            :class="menuOpen ? 'justify-normal' : 'justify-center'"
            @click="emitActionClicked(link.title)"
        >
            <iconify-icon :icon="link.icon"></iconify-icon>
            <span class="text-nowrap" :class="menuOpen ? 'block' : 'hidden'">{{
                link.title
            }}</span>
        </div>
    </template>
</template>
