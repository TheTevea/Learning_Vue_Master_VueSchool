<script setup lang="ts">
import { useErrorStore } from '@/stores/error.ts';
const { activeError } = storeToRefs(useErrorStore());
</script>

<template>
    <AuthLayout>
        <AppErrorPage v-if="activeError"></AppErrorPage>
        <router-view v-else v-slot="{ Component, route }">
            <Suspense v-if="Component" :timeout="0">
                <Component :is="Component" :key="route.name"> </Component>
                <template #fallback>
                    <p>Loading...</p>
                </template>
            </Suspense>
        </router-view>
    </AuthLayout>
</template>
