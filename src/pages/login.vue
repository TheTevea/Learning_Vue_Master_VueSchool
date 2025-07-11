<script setup lang="ts">
import { login } from '@/utils/supaAuth.ts';
import { watchDebounced } from '@vueuse/core';

const router = useRouter();
const formData = ref({
    email: '',
    password: '',
});

const { serverError, handleServerError, realtimeError, handleLoginForm } =
    useFormErrors();

watchDebounced(
    formData,
    () => {
        handleLoginForm(formData.value);
    },
    {
        debounce: 1000,
        deep: true,
    }
);

const clearServerError = () => {
    serverError.value !== '' && (serverError.value = '');
};

const signIn = async () => {
    const { error } = await login(formData.value);
    if (!error) return router.push('/');

    handleServerError(error);
};
</script>

<template>
    <div
        class="mx-auto flex w-full justify-center items-center p-10 text-center -mt-20 min-h-[90vh]"
    >
        <Card class="max-w-sm w-full mx-auto">
            <CardHeader>
                <CardTitle class="text-2xl"> Login </CardTitle>
                <CardDescription> Login to your account </CardDescription>
            </CardHeader>
            <CardContent>
                <div
                    class="flex flex-col gap-4 mb-4 justify-center items-center"
                >
                    <Button variant="outline" class="w-full">
                        Register with Google
                    </Button>
                    <Separator label="Or" />
                </div>

                <form class="grid gap-4" @submit.prevent="signIn">
                    <div class="grid gap-2">
                        <Label for="email" class="text-left">Email</Label>
                        <Input
                            type="email"
                            placeholder="johndoe19@example.com"
                            required
                            id="email"
                            autocomplete="off"
                            v-model="formData.email"
                            @update:modelValue="clearServerError"
                            :class="{ 'border-red-500': serverError }"
                        />
                        <BaseErrorMessage :message="realtimeError?.email" />
                    </div>
                    <div class="grid gap-2">
                        <div class="flex items-center">
                            <Label for="password">Password</Label>
                            <a
                                href="#"
                                class="inline-block ml-auto text-xs underline"
                            >
                                Forgot your password?
                            </a>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            required
                            autocomplete="current-password"
                            v-model="formData.password"
                            @update:modelValue="clearServerError"
                            :class="{ 'border-red-500': serverError }"
                        />
                        <BaseErrorMessage :message="realtimeError?.password" />
                    </div>
                    <BaseErrorMessage :message="serverError" />
                    <Button type="submit" class="w-full"> Login </Button>
                </form>
                <div class="mt-4 text-sm text-center">
                    Don't have an account?
                    <RouterLink to="/register" class="underline">
                        Register
                    </RouterLink>
                </div>
            </CardContent>
        </Card>
    </div>
</template>
