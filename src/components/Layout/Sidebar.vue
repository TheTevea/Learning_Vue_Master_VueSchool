<script setup lang="ts">
import { useMenu } from '@/composables/menu.ts';
import { useWindowSize } from '@vueuse/core';

defineEmits(['taskClicked', 'projectClicked']);

const { menuOpen, toggleMenu } = useMenu();

const links = [
    { to: '/', title: 'Dashboard', icon: 'lucide:house' },
    { to: '/projects', title: 'Projects', icon: 'lucide:building-2' },
    { to: '/tasks', title: 'My Tasks', icon: 'lucide:badge-check' },
];

const accountLinks = [
    { to: '/', title: 'Profile', icon: 'lucide:user' },
    { to: '/', title: 'Settings', icon: 'lucide:settings' },
    { title: 'Sign out', icon: 'lucide:log-out' },
];

const router = useRouter();

const executeAction = async (linkTitle: string) => {
    if (linkTitle === 'Sign out') {
        const { logout } = await import('@/utils/supaAuth.ts');
        const isLoggedOut = await logout();
        if (isLoggedOut) await router.push('/login');
    }
};

watchEffect(() => {
    const { width } = useWindowSize();
    menuOpen.value = width.value >= 1024;
});
</script>

<template>
    <aside
        class="flex flex-col h-screen gap-2 border-r fixed bg-muted/40 transition-[width]"
        :class="menuOpen ? 'w-52' : 'w-24'"
    >
        <div
            class="flex h-16 items-center border-b px-2 lg:px-4 shrink-0 gap-1 justify-between"
        >
            <Button
                @click="toggleMenu"
                variant="outline"
                size="icon"
                class="w-8 h-8"
            >
                <iconify-icon icon="lucide:menu"></iconify-icon>
            </Button>

            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button variant="outline" size="icon" class="w-8 h-8">
                        <iconify-icon icon="lucide:plus"></iconify-icon>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem @click="$emit('taskClicked')"
                        >Task</DropdownMenuItem
                    >
                    <DropdownMenuItem @click="$emit('projectClicked')"
                        >Project</DropdownMenuItem
                    >
                </DropdownMenuContent>
            </DropdownMenu>
        </div>

        <nav class="flex flex-col gap-2 justify-between h-full relative">
            <div>
                <SidebarLink :links="links" />
            </div>

            <div class="border-y text-center bg-background py-3">
                <SidebarLink
                    :links="accountLinks"
                    @actionClicked="executeAction"
                />
            </div>
        </nav>
    </aside>
</template>
