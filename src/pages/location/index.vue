<template>
    <div
        class="min-h-screen flex items-center justify-center bg-gray-900 text-white"
    >
        <div
            class="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md text-center"
        >
            <h2 class="text-2xl font-bold mb-4 text-indigo-400">
                📍 User Location
            </h2>

            <div v-if="latitude && longitude" class="mb-4">
                <p class="text-lg">
                    Latitude: <span class="text-green-400">{{ latitude }}</span>
                </p>
                <p class="text-lg">
                    Longitude:
                    <span class="text-green-400">{{ longitude }}</span>
                </p>
                <p class="mt-2 text-sm text-gray-300">
                    📌 Address:
                    <Loader2
                        v-if="isLoading"
                        class="w-4 h-4 inline-block text-white animate-spin"
                    />
                    <span v-else>{{ address }}</span>
                </p>
            </div>

            <button
                @click="getLocation"
                class="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition duration-200"
            >
                Get My Location
            </button>

            <div v-if="latitude && longitude" class="mt-4">
                <!-- Link to open Google Maps with the coordinates -->
                <a
                    :href="`https://www.google.com/maps?q=${latitude},${longitude}`"
                    target="_blank"
                    class="text-indigo-400 hover:text-indigo-300 text-sm"
                >
                    View on Google Maps
                </a>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Loader2 } from 'lucide-vue-next';

const latitude = ref(null);
const longitude = ref(null);
const address = ref('');
const isLoading = ref(false);

// Replace with your OpenCage API key
const API_KEY = '1a586b00524843d2900585c3af362333';

const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                latitude.value = position.coords.latitude;
                longitude.value = position.coords.longitude;

                // Call reverse geocoding API
                try {
                    isLoading.value = true;
                    const response = await fetch(
                        `https://api.opencagedata.com/geocode/v1/json?q=${latitude.value}+${longitude.value}&key=${API_KEY}`
                    );
                    const data = await response.json();
                    isLoading.value = false;
                    address.value =
                        data.results[0]?.formatted || 'Unknown location';
                } catch (error) {
                    isLoading.value = false;
                    console.error('Error fetching address:', error);
                    address.value = 'Unable to fetch address.';
                }
            },
            (error) => {
                console.error('Error getting location:', error);
                alert('Location access denied or unavailable.');
            }
        );
    } else {
        alert('Geolocation is not supported by your browser.');
    }
};
</script>
