import { supabase } from '@/lip/supabaseClient.ts';
import type { RegisterForm, LoginForm } from '@/types/AuthForm.ts';

const useAuth = useAuthStore();

export const register = async (formData: RegisterForm) => {
    const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
    });

    if (error) return console.log(error);

    if (data.user) {
        const { error } = await supabase.from('profiles').insert({
            id: data.user.id,
            username: formData.username,
            full_name: formData.firstName.concat(' ', formData.lastName),
        });

        if (error) return console.log('Profile error', error);
    }

    useAuth.setAuth(data.session);

    return true;
};

export const login = async (formData: LoginForm) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
    });

    if (error) return console.log(error);

    useAuth.setAuth(data.session);

    return true;
};
