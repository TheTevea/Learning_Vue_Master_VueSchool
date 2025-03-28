<script setup lang="ts">
import { useErrorStore } from '@/stores/error.ts';

useErrorStore().setError();
</script>

<template>
    <div></div>
</template>
