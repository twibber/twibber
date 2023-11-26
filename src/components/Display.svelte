<script>
	import {env} from "$env/dynamic/public";
	import Icon from "@iconify/svelte";
	import {setModal} from "$lib/modals.js";
	import {page} from "$app/stores";
  import { logout } from "$lib/buttons.js";

	export let title = "";
	export let buttons = []

    $: page.subscribe((value) => {
        console.dir(value, {depth: null});
    });
</script>

<svelte:head>
    <title>{title} • {env.PUBLIC_NAME}</title>
</svelte:head>

<!-- Main Content -->
<main class="text-white max-w-screen-md w-full min-h-screen max-h-screen">
    <div class="h-screen max-h-screen min-h-screen">
        <div class="flex items-center justify-between w-full h-16 px-4 bg-gray-900 border-b border-gray-800">
            <div class="flex flex-row items-center justify-center w-8 h-8 mr-2 bg-gray-800 rounded-full">
                <Icon icon="ic:baseline-last-page" class="w-6 h-6 text-gray-400 font-black"/>
            </div>
            <h1 class="text-lg font-semibold">{title}</h1>
            <div class="flex-grow"></div>
            {#each buttons as button}
                <div class="ml-2">
                    {#if button?.href}
                        <a href={button.href} class="flex items-center justify-center w-8 h-8 bg-gray-800 rounded-full text-gray-400 hover:bg-gray-700 p-1">
                            <Icon icon={button.icon} class="w-5 h-5"/>
                        </a>
                    {:else}
                        <button on:click={button.action} class="flex items-center justify-center w-8 h-8 bg-gray-800 rounded-full text-gray-400 hover:bg-gray-700 p-1">
                            <Icon icon={button.icon} class="w-5 h-5"/>
                        </button>
                    {/if}
                </div>
            {/each}
        </div>

        <div class="relative overflow-y-auto" style="height: calc(100vh - 4rem);"> <!-- h-16 = 4rem -->
            <slot/>
        </div>
    </div>
</main>

<style>
    /* width */
    ::-webkit-scrollbar {
        width: 1px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: #111827;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #fff;
    }
</style>