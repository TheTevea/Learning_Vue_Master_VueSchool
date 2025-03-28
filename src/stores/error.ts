export const useErrorStore = defineStore('error-store', () => {
    const activeError = ref(false);

    function setError() {
        activeError.value = true;
    }

    return { activeError, setError };
});
