<template>
    <nav
        class="h-16 border-b bg-muted/40 flex justify-between items-center px-8"
    >
        <form class="relative w-full h-fit max-w-96">
            <iconify-icon
                class="absolute top-[50%] translate-y-[-50%] left-2.5 text-muted-foreground"
                icon="lucide:search"
            ></iconify-icon>

            <Input
                class="w-full pl-8 bg-background focus-visible:ring-0"
                type="text"
                placeholder="search..."
            />
        </form>
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage
                        src="https://github.com/unovue.png"
                        alt="@unovue"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </nav>

    <main>
        <router-view></router-view>
    </main>
</template>

<script setup lang="ts">
import { Input } from '@/components/ui/input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
</script>
