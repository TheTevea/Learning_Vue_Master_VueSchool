<script setup lang="ts">
import { useErrorStore } from '@/stores/error.ts';
import { supabase } from '@/lip/supabaseClient.ts';
const errorStore = useErrorStore();

const useAuth = useAuthStore();

onErrorCaptured((error) => {
    errorStore.setError({ error });
});

onMounted(async () => {
    const { data } = await supabase.auth.getSession();

    if (data.session?.user) await useAuth.setAuth(data.session);
});
</script>

<template>
    <AuthLayout>
        <AppErrorPage v-if="errorStore.activeError"></AppErrorPage>
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
