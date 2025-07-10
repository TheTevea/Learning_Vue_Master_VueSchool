<template>
    <div
        class="relative w-full flex flex-col items-start justify-start gap-2 text-left text-sm text-black font-small"
    >
        <div class="flex flex-row items-center justify-start gap-2">
            <div
                class="w-4 relative rounded-[50%] bg-white border-slate-200 border-solid border-[1px] box-border h-4"
            />
            <div class="relative leading-[14px] font-medium">Default</div>
        </div>
        <div class="flex flex-row items-center justify-start gap-2">
            <div class="relative leading-[14px] font-medium">Comfortable</div>
        </div>
        <div class="flex flex-row items-center justify-start gap-2">
            <div
                class="w-4 relative rounded-[50%] bg-white border-slate-200 border-solid border-[1px] box-border h-4"
            />
            <div class="relative leading-[14px] font-medium">Compact</div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'RadioGroup',
});
</script>
