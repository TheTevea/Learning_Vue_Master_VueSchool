import type { CustomError, ExtendedPostgrestError } from '@/types/Error.ts';
import { PostgrestError } from '@supabase/postgrest-js';
export const useErrorStore = defineStore('error-store', () => {
    const activeError = ref<null | CustomError | ExtendedPostgrestError>(null);

    function setError({
        error,
        customCode,
    }: {
        error: string | PostgrestError;
        customCode: number;
    }) {
        if (typeof error === 'string') {
            activeError.value = Error(error);
            activeError.value.customCode = customCode;
            return;
        }

        activeError.value = error;
        activeError.value.statusCode = customCode;
    }

    return { activeError, setError };
});
