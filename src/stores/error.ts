import type { CustomError } from '@/types/Error.ts';

export const useErrorStore = defineStore('error-store', () => {
    const activeError = ref<null | CustomError>(null);

    function setError({
        error,
        customCode,
    }: {
        error: string;
        customCode: number;
    }) {
        activeError.value = Error(error);
        activeError.value.customCode = customCode;
    }

    return { activeError, setError };
});
