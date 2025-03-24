<script setup lang="ts">
interface RouteParams {
    slug?: string;
}

const route = useRoute();

const params = route.params as RouteParams;
</script>

<template>
    <h1>{{ params.slug }}</h1>
</template>

<style scoped></style>
