<template>
    <div>
        <h1>Services</h1>
        <p>Our services are awesome!</p>

        <h2>Projects</h2>
        <ul>
            <li v-for="project in projects" :key="project.id">
                <router-link :to="`/projects/${project.id}`">{{
                    project.name
                }}</router-link>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { supabase } from '../lip/supabaseClient.ts';
import type { Tables } from '../../database.types.ts';
import { ref } from 'vue';
const projects = ref<Tables<'projects'>[] | null>(null);

(async () => {
    const { data, error } = await supabase.from('projects').select('*');
    if (error) console.log(error);

    projects.value = data;
})();
</script>
