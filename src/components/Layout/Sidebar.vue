<script setup lang="ts">
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
</script>

<template>
    <aside
        class="flex flex-col h-screen gap-2 border-r fixed bg-muted/40 lg:w-52 w-16 transition-[width]"
    >
        <div
            class="flex h-16 items-center border-b px-2 lg:px-4 shrink-0 gap-1 justify-between"
        >
            <Button variant="outline" size="icon" class="w-8 h-8">
                <iconify-icon icon="lucide:menu"></iconify-icon>
            </Button>

            <Button variant="outline" size="icon" class="w-8 h-8">
                <iconify-icon icon="lucide:plus"></iconify-icon>
            </Button>
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
