import { PostgrestError } from '@supabase/postgrest-js';
import { acceptHMRUpdate } from 'pinia';
import type { CustomError, ExtendedPostgrestError } from '@/types/Error.ts';

export const useErrorStore = defineStore('error-store', () => {
    const activeError = ref<null | CustomError | ExtendedPostgrestError>(null);
    const isCustomError = ref(false);

    function setError({
        error,
        customCode,
    }: {
        error: string | PostgrestError | Error;
        customCode?: number;
    }) {
        if (typeof error === 'string') isCustomError.value = true;
        if (typeof error === 'string') {
            activeError.value = Error(error);
            activeError.value.customCode = customCode || 500;
            return;
        }

        activeError.value = error;
        activeError.value.statusCode = customCode || 500;
    }

    function resetError() {
        activeError.value = null;
        isCustomError.value = false;
    }

    return { activeError, setError, isCustomError, resetError };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useErrorStore, import.meta.hot));
}
