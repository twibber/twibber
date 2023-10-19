<script>
    import {toasts} from '$lib/toaster.js';

    import Error from "./Toast/Error.svelte";
    import Success from "./Toast/Success.svelte";
</script>

<div class="flex flex-col gap-4 bottom-0 right-0 m-4 z-50 max-w-md text-start text-white text-xs {$toasts?.length > 0  ? 'fixed' : 'hidden'}">
    {#each $toasts as toast (toast.id)}
        {#if toast.type === 'error'}
            <Error {...toast}/>
        {:else if toast.type === 'success'}
            <Success {...toast}/>
        {/if}
    {/each}
</div>
