<script setup lang="ts">
import { useRoute } from 'vue-router';

interface RouteParams {
    id?: string;
}

const route = useRoute();

const params = route.params as RouteParams;
</script>

<template>
    <h1>{{ params.id }}</h1>
</template>

<style scoped></style>
