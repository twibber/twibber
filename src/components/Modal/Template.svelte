<script>
	import {hideModal} from '$lib/modals.js';
	import {fade, fly} from 'svelte/transition';

	export let title = "",
		subtitle = "",
		confirm = {
			name: "", handler: () => {
			}
		};

	const propIsEmpty = Object.keys($$slots)?.length === 0;
</script>

<form class="fixed top-0 left-0 z-10 flex h-screen w-screen items-center justify-center px-6"
      on:submit|preventDefault={confirm?.handler}>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
            on:click={hideModal}
            transition:fade={{ duration: 100 }}
            class="fixed top-0 left-0 z-20 h-screen w-screen bg-black bg-opacity-50"></div>
    <div
            in:fly={{ y: 400, duration: 100 }}
            out:fly={{ y: 400, duration: 100 }}
            class="z-30 flex w-full max-w-md flex-col rounded-lg bg-gray-900"
    >
        <div
                class="flex flex-col items-start justify-center gap-2 border-gray-800 p-4 {!propIsEmpty
				? 'border-b'
				: ''}"
        >
            <div class="text-3xl font-bold">
                {title}
            </div>
            {#if subtitle}
                <div class="max-w-sm text-center text-sm text-gray-400">
                    {subtitle}
                </div>
            {/if}
        </div>

        {#if !propIsEmpty}
            <div class="p-4 flex flex-col gap-4">
                <slot/>
            </div>
        {/if}

        {#if confirm?.name}
            <div class="flex h-12 flex-row">
                <button
                        type="button"
                        on:click={() => hideModal()}
                        class="h-full w-full rounded-bl-lg border-t border-gray-800 bg-gray-900 bg-opacity-50 transition hover:bg-opacity-100"
                >
                    Cancel
                </button>
                <button
                        type="submit"
                        class="h-full w-full rounded-br-lg border-t border-l border-gray-800 transition hover:bg-gray-900"
                >
                    {confirm?.name}
                </button>
            </div>
        {/if}
    </div>
</form>
