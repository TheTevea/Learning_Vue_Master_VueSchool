<script setup lang="ts">
import { useErrorStore } from '@/stores/error.ts';
import { useMeta } from 'vue-meta';
const errorStore = useErrorStore();

onErrorCaptured((error) => {
    errorStore.setError({ error });
});

onMounted(() => {
    useAuthStore().trackAuthChanges();
});

const { user } = storeToRefs(useAuthStore());

const AuthLayout = defineAsyncComponent(
    () => import('@/components/Layout/main/AuthLayout.vue')
);

const GuestLayout = defineAsyncComponent(
    () => import('@/components/Layout/main/GuestLayout.vue')
);

useMeta({
    title: 'Pulse',
    description: {
        name: 'description',
        content:
            'Pulse is a project management tool that helps you organize your work.',
    },
});
</script>

<template>
    <metainfo />
    <Transition name="fade" mode="out-in">
        <div :key="user?.id">
            <Component :is="user ? AuthLayout : GuestLayout">
                <AppErrorPage v-if="errorStore.activeError"></AppErrorPage>
                <router-view v-else v-slot="{ Component, route }">
                    <Transition name="fade" mode="out-in">
                        <div class="w-full" :key="route.path">
                            <Suspense v-if="Component" :timeout="0">
                                <Component :is="Component" :key="route.name">
                                </Component>
                                <template #fallback>
                                    <div
                                        class="absolute top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2 flex justify-center items-center w-full h-screen bg-background bg-opacity-90 z-50"
                                    >
                                        <iconify-icon
                                            icon="lucide:loader-circle"
                                            class="text-6xl animate-spin"
                                        />
                                    </div>
                                </template>
                            </Suspense>
                        </div>
                    </Transition>
                </router-view>
            </Component>
        </div>
    </Transition>
</template>
