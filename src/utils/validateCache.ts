export interface ValidateCacheParams<T, Q, L, K extends string | number> {
    ref: Ref<T | null>;
    query: Q;
    key: K;
    loadFn: L & { delete: (key: K) => void };
}

export function validateCache<T, Q, L, K extends string>({
    ref,
    query,
    key,
    loadFn,
}: ValidateCacheParams<T, Q, L, K>) {
    if (ref.value) {
        const finalQuery = typeof query === 'function' ? query(key) : query;
        Promise.resolve(finalQuery).then(({ data, error }) => {
            if (JSON.stringify(ref.value) === JSON.stringify(data)) {
                return;
            } else {
                loadFn.delete(key);
                if (!error && data) ref.value = data;
            }
        });
    }
}
