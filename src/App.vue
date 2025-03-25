<script setup lang="ts"></script>

<template>
    <AuthLayout>
        <router-view v-slot="{ Component, route }">
            <Suspense v-if="Component" :timeout="0">
                <Component :is="Component" :key="route.name"> </Component>
                <template #fallback>
                    <p>Loading...</p>
                </template>
            </Suspense>
        </router-view>
    </AuthLayout>
</template>
