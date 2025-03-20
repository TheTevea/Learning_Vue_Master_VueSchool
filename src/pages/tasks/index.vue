<template>
    <div>
        <h1>Services</h1>
        <p>Our services are awesome!</p>

        <h2>Projects</h2>
        <ul>
            <li v-for="task in tasks" :key="task.id">
                <router-link :to="`/projects/${task.id}`">{{
                    task.name
                }}</router-link>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { supabase } from '../../lip/supabaseClient.ts';
import type { Tables } from '../../../database/types.ts';
import { ref } from 'vue';
const tasks = ref<Tables<'tasks'>[] | null>(null);

(async () => {
    const { data, error } = await supabase.from('tasks').select('*');
    if (error) console.log(error);

    tasks.value = data;
})();
</script>
