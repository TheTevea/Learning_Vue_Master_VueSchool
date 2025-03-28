<script setup lang="ts">
import { useErrorStore } from '@/stores/error.ts';

useErrorStore().setError({ error: 'Page not found', customCode: 404 });
</script>

<template>
    <div></div>
</template>
