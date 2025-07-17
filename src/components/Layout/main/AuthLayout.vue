<script setup lang="ts">
import { useMenu } from '@/composables/menu.ts';

const { pageData } = storeToRefs(usePageStore());
const sheetTaskOpen = ref<boolean>(false);

const { menuOpen } = useMenu();
</script>

<template>
    <Sidebar @taskClicked="sheetTaskOpen = true" />
    <AppNewTask v-model="sheetTaskOpen" />
    <div
        class="flex flex-col transition-[margin]"
        :class="menuOpen ? 'ml-52' : ' ml-24'"
    >
        <TopNavbar />
        <main class="flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6">
            <div class="flex items-center">
                <h1 class="text-lg font-semibold md:text-2xl">
                    {{ pageData.title }}
                </h1>
            </div>
            <slot></slot>
        </main>
    </div>
</template>
