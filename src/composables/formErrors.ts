import type { AuthError } from '@supabase/supabase-js';
import type { LoginForm } from '@/types/AuthForm.ts';

type FormErrors<T> = {
    [k in keyof T]: string[];
};
export const useFormErrors = () => {
    const serverError = ref('');
    const realtimeError = ref<FormErrors<LoginForm>>();

    const handleServerError = (error: AuthError) => {
        serverError.value =
            error.message === 'Invalid login credentials'
                ? 'Invalid email or password'
                : error.message;
    };

    const handleLoginForm = async (formData: LoginForm) => {
        realtimeError.value = {
            email: [],
            password: [],
        };

        const { validateEmail, validatePassword } = await import(
            '@/utils/formValidations.ts'
        );

        const emailErrors = validateEmail(formData.email);

        if (emailErrors.length) realtimeError.value.email = emailErrors;

        const passwordErrors = validatePassword(formData.password);
        if (passwordErrors.length)
            realtimeError.value.password = passwordErrors;
    };

    return {
        serverError,
        handleServerError,
        realtimeError,
        handleLoginForm,
    };
};
