<template>
    <RouterView />
</template>

<script setup>
import { supabase } from './lip/supabaseClient.js';

console.log(supabase);
console.log(import.meta.env.VITE_SUPABASE_URL);
</script>
