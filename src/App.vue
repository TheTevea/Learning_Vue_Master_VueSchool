<template>
    <RouterView />
</template>

<script setup>
import { supabase } from './lip/supabaseClient.js';

console.log(supabase);
</script>
