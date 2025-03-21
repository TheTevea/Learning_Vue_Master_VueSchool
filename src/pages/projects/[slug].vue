<script setup lang="ts">
import { useRoute } from 'vue-router';

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
